import { faker } from "@faker-js/faker";
import { Pet } from "@prisma/client";
import crypto from "node:crypto";

interface Overwrite {
  org_id?: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

export function makeRandomPet(overwrite?: Overwrite): Pet {
  return {
    id: crypto.randomUUID(),
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(["small", "medium", "large"]),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(["low", "medium", "high"]),
    environment: faker.helpers.arrayElement(["indoor", "outdoor"]),
    photo_url: faker.internet.url(),
    type: faker.helpers.arrayElement(["DOG", "CAT"]),
    independence_level: faker.number.int().toString(),
  };
}
