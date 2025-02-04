import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs.repository";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { CreateOrgUseCase } from "./create-org.use-case";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgRepository);
  });

  it("should be able to create an org", async () => {
    const { org } = await sut.execute(makeRandomOrg());

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password upon creation", async () => {
    const orgData = makeRandomOrg();

    const { org } = await sut.execute(orgData);

    const isPasswordCorrectlyHashed = await compare(
      orgData.password,
      org.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("shouldn't be able to create an org with same email", async () => {
    const orgData = makeRandomOrg();

    await sut.execute(orgData);

    await expect(async () => {
      await sut.execute({
        ...orgData,
        responsible: "Sue Doe",
      });
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
