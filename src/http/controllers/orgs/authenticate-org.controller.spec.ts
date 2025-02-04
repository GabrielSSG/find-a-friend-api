import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { makeRandomOrg } from "@tests/factories/make-org.factory";

describe("Authenticate Org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    const org = makeRandomOrg();
    await request(app.server).post("/orgs").send(org);

    const response = await request(app.server).post("/orgs/authenticate").send({
      email: org.email,
      password: org.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
