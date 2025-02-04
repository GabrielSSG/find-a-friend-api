import { Pet } from "@prisma/client";

import { FindAllParams, PetsRepository } from "@/repositories/pets.repository";

type FetchPetsUseCaseRequest = FindAllParams;

type FetchPetsUseCaseResponse = Pet[];

export class FetchPetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(
    params: FetchPetsUseCaseRequest
  ): Promise<FetchPetsUseCaseResponse> {
    return await this.petsRepository.findAll(params);
  }
}
