import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = bodySchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { org } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    console.error(error);

    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
