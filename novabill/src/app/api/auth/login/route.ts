import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

    // 1. Find the user
    const admin = await AdminUser.findOne({ email, isActive: true }).lean();
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Verify the password hash
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Sign the JWT payload
    const token = jwt.sign(
      { sub: admin._id, merchantId: admin.merchantId, role: admin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '12h' }
    );

    // 4. Set the HTTP-Only Cookie (Next.js 15 requires awaiting cookies)
    const cookieStore = await cookies();
    cookieStore.set('nova_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 12, // 12 hours
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Authentication successful' }, { status: 200 });

  } catch (error) {
    console.error('🔴 Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
