import { Pet, Prisma } from "@prisma/client";

export interface FindAllParams {
  age?: string;
  city: string;
  state: string;
  energy_level?: string;
  independence_level?: string;
  size?: string;
  type?: "DOG" | "CAT";
  environment?: string;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findAll(params: FindAllParams): Promise<Pet[]>;
}
