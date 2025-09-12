import {
  AdapterSession,
  AdapterUser,
  AdapterAccount,
  AdapterAuthenticator,
} from "@auth/core/adapters";

// Helper function to map Prisma User to AdapterUser
export const mapUserToAdapter = (user: any): AdapterUser => ({
  id: user.id,
  email: user.email,
  emailVerified: user.email_verified,
  name: user.full_name,
  image: user.image,
});

// Helper function to map AdapterUser to Prisma User data
export const mapAdapterToUser = (user: any) => ({
  id: user.id,
  email: user.email,
  email_verified: user.emailVerified,
  full_name: user.name,
  image: user.image,
});

// Helper function to map Prisma Session to AdapterSession
export const mapSessionToAdapter = (session: any): AdapterSession => ({
  sessionToken: session.token,
  userId: session.user_id,
  expires: session.expires,
});

// Helper function to map AdapterSession to Prisma Session data
export const mapAdapterToSession = (session: any) => ({
  token: session.sessionToken,
  user_id: session.userId,
  expires: session.expires,
});

// Helper function to map Prisma Account to AdapterAccount
export const mapAccountToAdapter = (account: any): AdapterAccount => ({
  type: account.type,
  provider: account.provider,
  providerAccountId: account.provider_account_id,
  refresh_token: account.refresh_token,
  access_token: account.access_token,
  expires_at: account.expires_at,
  token_type: account.token_type,
  scope: account.scope,
  id_token: account.id_token,
  session_state: account.session_state,
  userId: "",
});

// Helper function to map AdapterAccount to Prisma Account data
export const mapAdapterToAccount = (account: any) => ({
  type: account.type,
  provider: account.provider,
  provider_account_id: account.providerAccountId,
  refresh_token: account.refresh_token,
  access_token: account.access_token,
  expires_at: account.expires_at,
  token_type: account.token_type,
  scope: account.scope,
  id_token: account.id_token,
  session_state: account.session_state,
});

// Helper function to map Prisma Authenticator to AdapterAuthenticator
export const mapAuthenticatorToAdapter = (
  authenticator: any,
): AdapterAuthenticator => ({
  credentialID: authenticator.credential_id,
  userId: authenticator.user_id,
  providerAccountId: authenticator.provider_account_id,
  credentialPublicKey: authenticator.credential_public_key,
  counter: authenticator.counter,
  credentialDeviceType: authenticator.credential_device_type,
  credentialBackedUp: authenticator.credential_backed_up,
  transports: authenticator.transports
    ? JSON.parse(authenticator.transports)
    : null,
});

// Helper function to map AdapterAuthenticator to Prisma Authenticator data
export const mapAdapterToAuthenticator = (authenticator: any) => ({
  credential_id: authenticator.credentialID,
  user_id: authenticator.userId,
  provider_account_id: authenticator.providerAccountId,
  credential_public_key: authenticator.credentialPublicKey,
  counter: authenticator.counter,
  credential_device_type: authenticator.credentialDeviceType,
  credential_backed_up: authenticator.credentialBackedUp,
  transports: authenticator.transports
    ? JSON.stringify(authenticator.transports)
    : null,
});
