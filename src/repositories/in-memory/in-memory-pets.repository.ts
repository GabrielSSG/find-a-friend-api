import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

import { OrgsRepository } from "@/repositories/orgs.repository";
import { FindAllParams, PetsRepository } from "@/repositories/pets.repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  constructor(private readonly orgsRepository: OrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }
    return pet;
  }

  async findAll({
    city,
    state,
    age,
    energy_level,
    independence_level,
    size,
    type,
    environment,
  }: FindAllParams): Promise<Pet[]> {
    const orgsIDs = await this.orgsRepository
      .findManyByCityAndState(city, state)
      .then((response) => response.map((org) => org.id));

    const pets: Array<Pet> = this.pets
      .filter((pet) => orgsIDs.includes(pet.org_id))
      .filter((pet) => !age || pet.age == age)
      .filter((pet) => !energy_level || pet.energy_level == energy_level)
      .filter(
        (pet) =>
          !independence_level || pet.independence_level == independence_level
      )
      .filter((pet) => !size || pet.size == size)
      .filter((pet) => !type || pet.type == type)
      .filter((pet) => !environment || pet.environment == environment);

    return pets;
  }
}
