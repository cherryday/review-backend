import './env';
// import path from 'path';
import Fastify from 'fastify';
// import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import reviewRoutes from './review/review.routes';

const fastify = Fastify();

// fastify.register(fastifyStatic, {
//   root: path.join(__dirname, 'public'),
//   prefix: '/public/',
// });
fastify.register(fastifyMultipart);
fastify.register(reviewRoutes, { prefix: 'api/review' });
// reviews
// fastify.register(reviewRoutes, { prefix: 'api/reviews' });

async function main() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
