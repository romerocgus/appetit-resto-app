import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('userEmail');

  if (!userEmail) {
    return NextResponse.json({ error: 'Email not found' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        memberships: { include: { bar: true } },
      },
    });

    const firstBarId = user?.memberships[0]?.barId || null;
    return NextResponse.json({ firstBarId });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
