import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets.repository";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { makeRandomPet } from "@tests/factories/make-pet.factory";
import { FetchPetsUseCase } from "./fetch-pets.use-case";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsUseCase;

describe("Fetch Pets", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchPetsUseCase(petsRepository);
  });

  it("should be able to fetch pets by city and state", async () => {
    const firstOrg = await orgsRepository.create(makeRandomOrg());
    await petsRepository.create(makeRandomPet({ org_id: firstOrg.id }));
    await petsRepository.create(makeRandomPet({ org_id: firstOrg.id }));

    expect(
      await sut.execute({ city: firstOrg.city, state: firstOrg.state })
    ).toHaveLength(2);

    const secondOrg = await orgsRepository.create(makeRandomOrg());
    await petsRepository.create(makeRandomPet({ org_id: secondOrg.id }));

    expect(
      await sut.execute({ city: secondOrg.city, state: secondOrg.state })
    ).toHaveLength(1);
  });

  it("should be able to fetch pets by city, state and type", async () => {
    const org = await orgsRepository.create(makeRandomOrg());
    const pet = await petsRepository.create(makeRandomPet({ org_id: org.id }));

    expect(
      await sut.execute({ city: org.city, state: org.state, type: pet.type })
    ).toHaveLength(1);
  });

  it("should be able to fetch pets by city, state and age", async () => {
    const org = await orgsRepository.create(makeRandomOrg());
    const pet = await petsRepository.create(makeRandomPet({ org_id: org.id }));

    expect(
      await sut.execute({ city: org.city, state: org.state, age: pet.age })
    ).toHaveLength(1);
  });

  it("should be able to fetch pets by city, state and energy level", async () => {
    const org = await orgsRepository.create(makeRandomOrg());
    const pet = await petsRepository.create(makeRandomPet({ org_id: org.id }));

    expect(
      await sut.execute({
        city: org.city,
        state: org.state,
        energy_level: pet.energy_level,
      })
    ).toHaveLength(1);
  });

  it("should be able to fetch pets by city, state and size", async () => {
    const org = await orgsRepository.create(makeRandomOrg());
    const pet = await petsRepository.create(makeRandomPet({ org_id: org.id }));

    expect(
      await sut.execute({
        city: org.city,
        state: org.state,
        size: pet.size,
      })
    ).toHaveLength(1);
  });

  it("should be able to fetch pets by city, state and environment", async () => {
    const org = await orgsRepository.create(makeRandomOrg());
    const pet = await petsRepository.create(makeRandomPet({ org_id: org.id }));

    expect(
      await sut.execute({
        city: org.city,
        state: org.state,
        environment: pet.environment,
      })
    ).toHaveLength(1);
  });
});
