// import fs from 'fs';
// import path from 'path';
// import util from 'util';
// import { pipeline } from 'stream';
import { FastifyInstance, FastifyRequest } from 'fastify';
// import { pool } from '../db';
import {
  reviewsSchema,
  ReviewsQuery,
  reviewSchema,
  ReviewParams,
} from './review.schema';
import reviewRepository from './review.repository';

// const pump = util.promisify(pipeline);

const createReviewSchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        format: 'email',
        description: 'User account email address',
      },
      description: {
        type: 'string',
      },
    },
    required: ['title', 'description'],
  },
};

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

  fastify.delete<{ Params: ReviewParams }>(
    '/:id',
    {},
    async (request, reply) => {
      await reviewRepository.deleteOne(request.params.id);
      reply.send();
    },
  );

  fastify.post(
    '/',
    { schema: createReviewSchema },
    async (
      request: FastifyRequest<{
        Body: { title: string; description: string };
      }>,
      reply,
    ) => {
      // const data = await request.file();

      // await pump(
      //   data!.file,
      //   fs.createWriteStream(path.resolve('photo.png')),
      //   // fs.createWriteStream(path.resolve('files', 'photo.png')),
      // );
      // console.log(request.body, data);
      // reply.send('test');
      const { title, description } = request.body;
      console.log(title, description);
      // const response = await pool.query(
      //   'INSERT INTO reviews (title, description) VALUES ($1, $2) RETURNING *',
      //   [title, description],
      // );
      // reply.code(201).send(response.rows[0]);
      // },
      reply.send('test');
    },
  );
}

export default reviewRoutes;
