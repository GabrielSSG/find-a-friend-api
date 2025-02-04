import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { makeRandomPet } from "@tests/factories/make-pet.factory";

describe("Create Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new pet", async () => {
    const org = makeRandomOrg();
    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    const response = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makeRandomPet());

    expect(response.status).toBe(201);
  });
});
