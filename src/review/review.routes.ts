import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  reviewsSchema,
  ReviewsQuery,
  reviewSchema,
  ReviewParams,
  createReviewSchema,
  ReviewBody,
} from './review.schema';
import reviewRepository from './review.repository';

async function reviewRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: ReviewParams }>(
    '/:id',
    { schema: reviewSchema },
    async (request, reply) => {
      const review = await reviewRepository.getOne(request.params.id);
      reply.send(review);
    },
  );

  fastify.get<{ Querystring: ReviewsQuery }>(
    '/',
    { schema: reviewsSchema },
    async (request, reply) => {
      const reviews = await reviewRepository.getAll(request.query);
      reply.send(reviews);
    },
  );

  fastify.post<{ Body: ReviewBody }>(
    '/',
    { schema: createReviewSchema },
    async (request, reply) => {
      const review = await reviewRepository.createOne(request.body);
      reply.code(201).send(review);
    },
  );

  fastify.patch<{ Body: ReviewBody; Params: ReviewParams }>(
    '/:id',
    { schema: createReviewSchema },
    async (request, reply) => {
      const review = await reviewRepository.updateOne(
        request.params.id,
        request.body,
      );
      reply.send(review);
    },
  );

  fastify.delete<{ Params: ReviewParams }>(
    '/:id',
    {},
    async (request, reply) => {
      await reviewRepository.deleteOne(request.params.id);
      reply.send();
    },
  );
}

export default reviewRoutes;
