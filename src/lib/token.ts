import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import prisma from "./prisma";
import { getTokenByUserId } from "@/data/token";
import { TokenType } from "@prisma/client/edge";
import { handlePrismaError } from "@/utils/error";

export const generateTwoFactorToken = async (user_id: string) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

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
        token,
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "TwoFactor: generateTwoFactorToken");
  }
};

export const generatePasswordResetToken = async (user_id: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

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
        token,
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "PasswordReset: generatePasswordResetToken");
  }
};

export const generateVerificationToken = async (user_id: string) => {
  try {
    const verificationToken = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTokenByUserId(user_id, TokenType.Verification);

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
        user_id: user_id,
        token: verificationToken,
        expires,
      },
    });
  } catch (error: unknown) {
    handlePrismaError(error, "Verification: generateVerificationToken");
  }
};
