export function handlePrismaError(error: unknown, context: string): never {
  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`, { cause: error });
  }
  throw new Error(`${context}: Unknown error`);
}
