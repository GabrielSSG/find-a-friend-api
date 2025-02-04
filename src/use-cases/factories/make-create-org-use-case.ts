import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { CreateOrgUseCase } from "@/use-cases/create-org.use-case";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();

  return new CreateOrgUseCase(orgsRepository);
}
