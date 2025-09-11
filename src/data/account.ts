import prisma from "@/lib/prisma";

export const getAccountByUserId = async (user_id: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { user_id },
    });

    return account;
  } catch {
    return null;
  }
};
