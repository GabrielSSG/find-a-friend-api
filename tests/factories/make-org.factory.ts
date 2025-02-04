import { faker } from "@faker-js/faker";
import crypto from "node:crypto";

interface Overwrite {
  password?: string;
  email?: string;
}

export function makeRandomOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    responsible: faker.person.fullName(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: overwrite?.email ?? faker.internet.email(),
    name: faker.company.name(),
    neighborhood: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
  };
}
