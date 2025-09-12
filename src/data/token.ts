import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/error";
import { TokenType } from "@prisma/client/edge";

export const getTokenByToken = async (token: string, type: TokenType) => {
  try {
    return await prisma.token.findUnique({
      where: { token, type },
    });
  } catch (error: unknown) {
    handlePrismaError(error, `${type}: getTokenByToken`);
  }
};

export const getTokenByUserId = async (user_id: string, type: TokenType) => {
  try {
    return await prisma.token.findFirst({
      where: {
        type,
        user_id,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, `${type}: getTokenByUserId`);
  }
};
