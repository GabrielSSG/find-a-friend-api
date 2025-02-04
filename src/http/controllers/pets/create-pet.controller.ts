import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { OrgNotFoundError } from "@/use-cases/errors/org-not-found.error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";

const bodySchema = z.object({
  name: z.string(),
  age: z.string(),
  photo_url: z.string(),
  energy_level: z.string(),
  independence_level: z.string(),
  size: z.string(),
  type: z.enum(["DOG", "CAT"]),
  environment: z.string(),
});

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetUseCase = makeCreatePetUseCase();

  const data = bodySchema.parse(request.body);
  const org_id = request.user.sub;

  try {
    const { pet } = await createPetUseCase.execute({ ...data, org_id });
    return reply.status(201).send({ pet });
  } catch (error) {
    console.error(error);

    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
