import { beforeEach, describe, expect, it } from "vitest";
import { makeRandomOrg } from "../../tests/factories/make-org.factory";
import { makeRandomPet } from "../../tests/factories/make-pet.factory";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets.repository";
import { PetNotFoundError } from "./errors/pet-not-found.error";
import { GetPetUseCase } from "./get-pet.use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;

describe("Get Pet", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);

    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get a pet", async () => {
    const createdOrg = await orgsRepository.create(makeRandomOrg());
    const createdPet = await petsRepository.create(
      makeRandomPet({
        org_id: createdOrg.id,
      })
    );

    const { pet } = await sut.execute({ id: createdPet.id });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to get a pet with a non-existing id", async () => {
    expect(
      async () => await sut.execute({ id: "non-existing-id" })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
