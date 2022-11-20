import { FastifySchema } from 'fastify';

export interface ReviewsQuery {
  limit?: number;
  offset?: number;
}

export const reviewsSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
      },
      offset: {
        type: 'number',
      },
    },
  },
};

export interface ReviewParams {
  id: number;
}

export const reviewSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
  },
};
