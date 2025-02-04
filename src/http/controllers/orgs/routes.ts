import { FastifyPluginCallback } from "fastify";

import { authenticateOrgController } from "./authenticate-org.controller";
import { createOrgController } from "./create-org.controller";

export const orgsRoutes: FastifyPluginCallback = (app, _options, done) => {
  app.post("/", createOrgController);
  app.post("/authenticate", authenticateOrgController);

  done();
};
