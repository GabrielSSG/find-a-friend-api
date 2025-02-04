import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

import { OrgsRepository } from "@/repositories/orgs.repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = [];

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      ...data,
    };

    this.orgs.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findManyByCityAndState(city: string, state: string): Promise<Org[]> {
    return this.orgs.filter((org) => org.city === city && org.state === state);
  }
}
