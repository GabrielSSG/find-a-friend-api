import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "@/env";
import { orgsRoutes } from "@/http/controllers/orgs/routes";
import { petsRoutes } from "@/http/controllers/pets/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d",
  },
});

app.register(fastifyCookie);

app.register(orgsRoutes, {
  prefix: "/orgs",
});

app.register(petsRoutes, {
  prefix: "/orgs/pets",
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
