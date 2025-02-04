import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

import { OrgsRepository } from "@/repositories/orgs.repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface CreateOrgUseCaseRequest {
  responsible: string;
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute(
    data: CreateOrgUseCaseRequest
  ): Promise<CreateOrgUseCaseResponse> {
    const { password, email, ...orgData } = data;

    const org = await this.orgsRepository.findByEmail(email);

    if (org) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const orgCreated = await this.orgsRepository.create({
      email,
      password: passwordHash,
      ...orgData,
    });

    return { org: orgCreated };
  }
}
