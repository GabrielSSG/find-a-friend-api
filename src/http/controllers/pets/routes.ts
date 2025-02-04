import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyPluginCallback } from "fastify";
import { createPetController } from "./create-pet.controller";
import { fetchPetsController } from "./fetch-pets.controller";
import { getPetController } from "./get-pet.controller";

export const petsRoutes: FastifyPluginCallback = (app, _options, done) => {
  app.get("/", fetchPetsController);
  app.get("/:id", getPetController);

  app.post("/", { onRequest: [verifyJwt] }, createPetController);
  done();
};
