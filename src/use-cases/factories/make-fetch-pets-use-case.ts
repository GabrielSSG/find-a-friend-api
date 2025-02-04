import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets.repository";
import { FetchPetsUseCase } from "@/use-cases/fetch-pets.use-case";

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();

  return new FetchPetsUseCase(petsRepository);
}
