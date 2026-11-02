import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and portal key are required' }, { status: 400 });
    }

    await connectToDatabase();

    const admin = await AdminUser.findOne({ email, isActive: true }).lean();
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: admin._id, merchantId: admin.merchantId, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '12h' }
    );

    // 1. Create the successful response FIRST
    const response = NextResponse.json(
      { success: true, message: 'Authentication successful' }, 
      { status: 200 }
    );

    // 2. Attach the cookie directly to the response object (This guarantees the browser saves it)
    response.cookies.set({
      name: 'nova_auth',
      value: token,
      httpOnly: true,
      secure: true, // Vercel always uses HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 12,
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('🔴 Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
