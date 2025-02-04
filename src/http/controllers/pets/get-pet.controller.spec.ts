import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { makeRandomPet } from "@tests/factories/make-pet.factory";

describe("Get Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet", async () => {
    const org = makeRandomOrg();
    await request(app.server).post("/orgs").send(org);

    const token = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password })
      .then((response) => response.body.token);

    const createdPet = await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(makeRandomPet())
      .then((response) => response.body.pet);

    const response = await request(app.server)
      .get(`/orgs/pets/${createdPet.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
