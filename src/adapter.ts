import type { Adapter } from "@auth/core/adapters";
import prisma from "./lib/prisma";
import {
  mapUserToAdapter,
  mapAccountToAdapter,
  mapAdapterToAccount,
  mapAdapterToAuthenticator,
  mapAdapterToSession,
  mapAdapterToUser,
  mapAuthenticatorToAdapter,
  mapSessionToAdapter,
} from "./utils/adapter.maps";

export function PrismaAdapter(): Adapter {
  const p = prisma;
  return {
    createUser: async ({ id, ...data }) => {
      const userData = mapAdapterToUser({ id, ...data });
      const user = await p.user.create({ data: stripUndefined(userData) });
      return mapUserToAdapter(user);
    },

    getUser: async (id) => {
      const user = await p.user.findUnique({ where: { id } });
      return user ? mapUserToAdapter(user) : null;
    },

    getUserByEmail: async (email) => {
      const user = await p.user.findUnique({ where: { email } });
      return user ? mapUserToAdapter(user) : null;
    },

    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider: provider_providerAccountId.provider,
            provider_account_id: provider_providerAccountId.providerAccountId,
          },
        },
        include: { user: true },
      });
      return account?.user ? mapUserToAdapter(account.user) : null;
    },

    updateUser: async ({ id, ...data }) => {
      const userData = mapAdapterToUser(data);
      const user = await p.user.update({
        where: { id },
        data: stripUndefined(userData),
      });
      return mapUserToAdapter(user);
    },

    deleteUser: async (id) => {
      const user = await p.user.delete({ where: { id } });
      return mapUserToAdapter(user);
    },

    linkAccount: async (data) => {
      const accountData = mapAdapterToAccount(data);
      const account = await p.account.create({
        data: {
          ...accountData,
          user_id: data.userId,
        },
      });
      return mapAccountToAdapter(account);
    },

    unlinkAccount: async (provider_providerAccountId) => {
      const account = await p.account.delete({
        where: {
          provider_provider_account_id: {
            provider: provider_providerAccountId.provider,
            provider_account_id: provider_providerAccountId.providerAccountId,
          },
        },
      });
      return mapAccountToAdapter(account);
    },

    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { token: sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return {
        user: mapUserToAdapter(user),
        session: mapSessionToAdapter(session),
      };
    },

    createSession: async (data) => {
      const sessionData = mapAdapterToSession(data);
      const session = await p.session.create({
        data: {
          ...sessionData,
          user_id: data.userId,
        },
      });
      return mapSessionToAdapter(session);
    },

    updateSession: async (data) => {
      const sessionData = mapAdapterToSession(data);
      const session = await p.session.update({
        where: { token: data.sessionToken },
        data: stripUndefined(sessionData),
      });
      return mapSessionToAdapter(session);
    },

    deleteSession: async (sessionToken) => {
      await p.session.delete({ where: { token: sessionToken } });
    },

    async createVerificationToken(data) {
      // Look up the user by the identifier (email) to get the user_id
      const user = await p.user.findUnique({
        where: { email: data.identifier },
      });

      if (!user) {
        throw new Error(`User not found for identifier: ${data.identifier}`);
      }

      const token = await p.token.create({
        data: {
          type: "Verification",
          user_id: user.id,
          token: data.token,
          expires: data.expires,
        },
      });
      return {
        identifier: data.identifier,
        token: token.token,
        expires: token.expires,
      };
    },

    async useVerificationToken(identifier_token) {
      try {
        const token = await p.token.delete({
          where: {
            token: identifier_token.token,
          },
        });
        return {
          identifier: identifier_token.identifier,
          token: token.token,
          expires: token.expires,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2025"
        )
          return null;
        throw error;
      }
    },

    async getAccount(providerAccountId, provider) {
      const account = await p.account.findFirst({
        where: {
          provider_account_id: providerAccountId,
          provider: provider,
        },
      });
      return account ? mapAccountToAdapter(account) : null;
    },

    async createAuthenticator(data) {
      const authenticatorData = mapAdapterToAuthenticator(data);
      const authenticator = await p.authenticator.create({
        data: {
          ...authenticatorData,
          user_id: data.userId,
        },
      });
      return mapAuthenticatorToAdapter(authenticator);
    },

    async getAuthenticator(credentialID) {
      const authenticator = await p.authenticator.findUnique({
        where: { credential_id: credentialID },
      });
      return authenticator ? mapAuthenticatorToAdapter(authenticator) : null;
    },

    async listAuthenticatorsByUserId(userId) {
      const authenticators = await p.authenticator.findMany({
        where: { user_id: userId },
      });
      return authenticators.map(mapAuthenticatorToAdapter);
    },

    async updateAuthenticatorCounter(credentialID, counter) {
      const authenticator = await p.authenticator.update({
        where: { credential_id: credentialID },
        data: { counter },
      });
      return mapAuthenticatorToAdapter(authenticator);
    },
  };
}

/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */
function stripUndefined<T>(obj: T) {
  const data = {} as T;
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key];
  return data;
}
