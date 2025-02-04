import { Pet, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { FindAllParams, PetsRepository } from "@/repositories/pets.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data });
  }
  async findById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({ where: { id } });
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        type: params.type,
        age: params.age,
        energy_level: params.energy_level,
        size: params.size,
        independence_level: params.independence_level,
        environment: params.environment,
        org: {
          state: params.state,
          city: params.city,
        },
      },
    });
  }
}
