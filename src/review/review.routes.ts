import { FastifyInstance } from 'fastify';
import reviewController from './review.controller';

async function reviewRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', reviewController.getReview);
  fastify.get('/', reviewController.getReviews);
}

export default reviewRoutes;
