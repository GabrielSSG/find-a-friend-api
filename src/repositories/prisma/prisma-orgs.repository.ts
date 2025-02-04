import { Org, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "@/repositories/orgs.repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    return await prisma.org.create({ data });
  }
  async findByEmail(email: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { email } });
  }
  async findById(id: string): Promise<Org | null> {
    return await prisma.org.findUnique({ where: { id } });
  }
  async findManyByCityAndState(city: string, state: string): Promise<Org[]> {
    return await prisma.org.findMany({
      where: {
        city,
        state,
      },
    });
  }
}
