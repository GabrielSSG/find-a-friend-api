import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PetNotFoundError } from "@/use-cases/errors/pet-not-found.error";
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";

const querySchema = z.object({
  id: z.string(),
});

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetUseCase = makeGetPetUseCase();
  const { id } = querySchema.parse(request.params);

  try {
    const pet = await getPetUseCase.execute({ id });
    return reply.status(200).send({ pet });
  } catch (error) {
    console.error(error);

    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
