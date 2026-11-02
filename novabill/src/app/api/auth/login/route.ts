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

    // FIX: Relaxed cookie settings for Codespaces compatibility
    const cookieStore = await cookies();
    cookieStore.set('nova_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from strict to lax
      maxAge: 60 * 60 * 12,
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Authentication successful' }, { status: 200 });

  } catch (error: any) {
    console.error('🔴 Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
