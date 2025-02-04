import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  responsible: z.string(),
  cep: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  whatsapp: z.string(),
});

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = bodySchema.parse(request.body);

  const createOrgUseCase = makeCreateOrgUseCase();

  try {
    const { org } = await createOrgUseCase.execute(data);

    return reply.status(201).send({ org });
  } catch (error) {
    console.error(error);

    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
