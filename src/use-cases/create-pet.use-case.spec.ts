import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { makeRandomPet } from "@tests/factories/make-pet.factory";
import { CreatePetUseCase } from "./create-pet.use-case";
import { OrgNotFoundError } from "./errors/org-not-found.error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe("Create Pet", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(petsRepository, orgsRepository);
  });

  it("should be able to create a new pet", async () => {
    const createdOrg = await orgsRepository.create(makeRandomOrg());

    const { pet } = await sut.execute(makeRandomPet({ org_id: createdOrg.id }));

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to create a new pet with a non-existing org", async () => {
    await expect(
      async () => await sut.execute(makeRandomPet())
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});
