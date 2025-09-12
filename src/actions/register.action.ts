"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { registerFormSchema } from "@/lib/validation-schemas";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { handlePrismaError } from "@/utils/error";

export const register = async (values: z.infer<typeof registerFormSchema>) => {
  try {
    const validatedFields = registerFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const newUser = await prisma.user.create({
      data: {
        full_name: name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(newUser.id);
    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  } catch (error) {
    handlePrismaError(error, "register action");
  }
};
