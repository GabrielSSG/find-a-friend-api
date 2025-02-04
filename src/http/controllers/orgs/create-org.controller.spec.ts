import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { makeRandomOrg } from "@tests/factories/make-org.factory";

describe("Create Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  }, 20000);

  afterAll(async () => {
    await app.close();
  }, 20000);

  it("should create a new org", async () => {
    const response = await request(app.server)
      .post("/orgs")
      .send(makeRandomOrg());

    expect(response.status).toBe(201);
  });
});
