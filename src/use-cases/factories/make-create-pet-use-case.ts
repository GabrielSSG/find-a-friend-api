import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs.repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { CreatePetUseCase } from "@/use-cases/create-pet.use-case";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();

  return new CreatePetUseCase(petsRepository, orgsRepository);
}
