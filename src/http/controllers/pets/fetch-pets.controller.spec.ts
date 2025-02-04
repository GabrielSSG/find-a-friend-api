import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { makeRandomOrg } from "@tests/factories/make-org.factory";
import { makeRandomPet } from "@tests/factories/make-pet.factory";

describe("Fetch Pets (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pets by city and state", async () => {
    const org = makeRandomOrg();
    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makeRandomPet());

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(makeRandomPet());

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ state: org.state, city: org.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it("should be able to fetch pets by age", async () => {
    const org = makeRandomOrg();
    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    const pet = makeRandomPet();

    await request(app.server)
      .post("/orgs/pets")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(pet);

    const response = await request(app.server)
      .get("/orgs/pets")
      .query({ state: org.state, city: org.city, age: pet.age });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });
});
