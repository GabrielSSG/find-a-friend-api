import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });

  it("should be able to authenticate", async () => {
    const password = "123456";

    const org = await orgRepository.create(
      makeRandomOrg({ password: await hash(password, 6) })
    );

    const authenticateData = {
      email: org.email,
      password,
    };

    const { org: authenticatedOrg } = await sut.execute(authenticateData);

    expect(authenticatedOrg).toEqual(org);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const authenticateData = {
      email: "sue.doe@example.com",
      password: "123456",
    };

    await orgRepository.create(makeRandomOrg(authenticateData));

    await expect(
      sut.execute({
        email: "john.doe@example.com",
        password: authenticateData.password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password = "123456";

    const org = await orgRepository.create(
      makeRandomOrg({ password: await hash(password, 6) })
    );

    await expect(
      sut.execute({
        email: org.email,
        password: "jadhkhwduheidu",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
