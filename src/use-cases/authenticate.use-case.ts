import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

import { OrgsRepository } from "@/repositories/orgs.repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private readonly orgRepository: OrgsRepository) {}

  async execute(
    data: AuthenticateUseCaseRequest
  ): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = data;

    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
