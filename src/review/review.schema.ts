import { FastifySchema } from 'fastify';
import { JSONSchemaType } from 'ajv';

export interface ReviewsQuery {
  limit?: number;
  offset?: number;
}

const sc: JSONSchemaType<ReviewsQuery> = {
  type: 'object',
  properties: {
    limit: {
      type: 'number',
      nullable: true,
    },
    offset: {
      type: 'number',
      nullable: true,
    },
  },
};

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

export interface ReviewBody {
  title: string;
  description: string;
}

export const createReviewSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    },
    required: ['title', 'description'],
  },
};
