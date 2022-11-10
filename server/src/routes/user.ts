import type { FastifyInstance } from 'fastify';

import { prisma } from '../lib/prisma';

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();

    return { count };
  });
}

export { userRoutes };
