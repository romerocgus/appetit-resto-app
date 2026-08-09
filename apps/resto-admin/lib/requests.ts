import { prisma } from '@repo/database';

export async function getDefaultBarId(userId: string): Promise<string | null> {
  try {
    const membership = await prisma.barMember.findFirst({
      where: { userId },
      select: { barId: true },
      orderBy: { createdAt: 'asc' },
    });

    return membership?.barId || null;
  } catch (error) {
    console.error('Error obtaining default bar:', error);
    return null;
  }
}
