import { Pet } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs.repository";
import { PetsRepository } from "@/repositories/pets.repository";
import { OrgNotFoundError } from "./errors/org-not-found.error";

interface CreatePetUseCaseRequest {
  name: string;
  age: string;
  org_id: string;
  photo_url: string;
  energy_level: string;
  independence_level: string;
  size: string;
  type: "DOG" | "CAT";
  environment: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly orgsRepository: OrgsRepository
  ) {}

  async execute(
    data: CreatePetUseCaseRequest
  ): Promise<CreatePetUseCaseResponse> {
    const { org_id, ...petData } = data;

    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      ...petData,
      org_id: org.id,
    });

    return { pet };
  }
}
