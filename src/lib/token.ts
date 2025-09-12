import prisma from "./prisma";
import { v4 as uuidv4 } from "uuid";
import { getTokenByUserId } from "@/data/token";
import { TokenType } from "@prisma/client/edge";
import { handlePrismaError } from "@/utils/error";

const TOKEN_EXPIRATION = 5 * 60 * 1000; // 5 minutes
const TOKEN_EXPIRATION_LONG = 3600 * 1000; // 1 hour

export const generateTwoFactorToken = async (user_id: string) => {
  try {
    const expires = new Date(new Date().getTime() + TOKEN_EXPIRATION);

    const existingToken = await getTokenByUserId(user_id, TokenType.TwoFactor);

    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    return await prisma.token.create({
      data: {
        type: TokenType.TwoFactor,
        user_id,
        token: uuidv4(),
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "TwoFactor: generateTwoFactorToken");
  }
};

export const generatePasswordResetToken = async (user_id: string) => {
  try {
    const expires = new Date(Date.now() + TOKEN_EXPIRATION_LONG);

    const existingToken = await getTokenByUserId(
      user_id,
      TokenType.PasswordReset,
    );

    if (existingToken) {
      await prisma.token.delete({
        where: { id: existingToken.id },
      });
    }

    return await prisma.token.create({
      data: {
        type: TokenType.PasswordReset,
        user_id,
        token: uuidv4(),
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "PasswordReset: generatePasswordResetToken");
  }
};

export const generateVerificationToken = async (user_id: string) => {
  try {
    const expires = new Date(new Date().getTime() + TOKEN_EXPIRATION_LONG);

    const existingToken = await getTokenByUserId(
      user_id,
      TokenType.Verification,
    );

    if (existingToken) {
      await prisma.token.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    return await prisma.token.create({
      data: {
        type: TokenType.Verification,
        user_id,
        token: uuidv4(),
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "Verification: generateVerificationToken");
  }
};
