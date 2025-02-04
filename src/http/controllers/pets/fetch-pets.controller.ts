import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchPetsUseCase } from "@/use-cases/factories/make-fetch-pets-use-case";

const querySchema = z.object({
  state: z.string(),
  city: z.string(),
  age: z.string().optional(),
  energy_level: z.string().optional(),
  independence_level: z.string().optional(),
  size: z.string().optional(),
  type: z.enum(["DOG", "CAT"]).optional(),
  environment: z.string().optional(),
});

export async function fetchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = querySchema.parse(request.query);
  const fetchPetsUseCase = makeFetchPetsUseCase();

  try {
    const pets = await fetchPetsUseCase.execute(data);
    return reply.status(200).send({ pets });
  } catch (error) {
    console.error(error);

    throw error;
  }
}
