import type { FastifyRequest } from 'fastify';

async function authenticate(request: FastifyRequest) {
  await request.jwtVerify();
}

export { authenticate };
