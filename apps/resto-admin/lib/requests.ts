import { Prisma, prisma } from '@repo/database';

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

export type UserWithMemberships = Prisma.UserGetPayload<{
  include: {
    memberships: {
      include: { bar: true };
    };
  };
}>;

export async function getUserById(
  userId: string,
): Promise<UserWithMemberships | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: { include: { bar: true } },
      },
    });

    return user || null;
  } catch (error) {
    console.error('Error obtaining User:', error);
    return null;
  }
}

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    tags: true;
    category: true;
  };
}>;

export async function getProductsByBarId(
  barId: string,
): Promise<ProductWithRelations[] | null> {
  try {
    const products = await prisma.product.findMany({
      where: { barId: barId },
      include: {
        tags: true,
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return products || null;
  } catch (error) {
    console.error('Error obtaining Products:', error);
    return null;
  }
}

export async function getBarHeaderData(barId: string) {
  try {
    const barHeader = await prisma.bar.findUnique({
      where: {
        id: barId,
      },
      select: {
        name: true,
        logoUrl: true,
      },
    });

    return barHeader;
  } catch (error) {
    console.error('Error obtaining Bar data:', error);
    return null;
  }
}
