import './env';
import fastify from 'fastify';
import './db';
import reviewRoutes from './review/review.routes';

const server = fastify();

server.register(reviewRoutes, { prefix: 'api/review' });

async function main() {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
