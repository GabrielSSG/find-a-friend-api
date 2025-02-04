import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate.use-case";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();

  return new AuthenticateUseCase(orgsRepository);
}
