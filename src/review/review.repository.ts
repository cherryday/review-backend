import { pool } from '../db';
import { ReviewsQuery } from './review.schema';

interface ReviewEntity {
  id: number;
  title: string;
  description: string;
}

async function getOne(id: number): Promise<ReviewEntity> {
  const response = await pool.query<ReviewEntity>(
    'SELECT * FROM reviews WHERE id = $1',
    [id],
  );
  return response.rows[0];
}

async function getAll(query: ReviewsQuery): Promise<ReviewEntity[]> {
  let limit: string | number = 'ALL';
  let offset = 0;

  if (query.limit && query.offset) {
    limit = query.limit;
    offset = query.offset;
  }

  const sql = 'SELECT * FROM reviews LIMIT $1 OFFSET $2';
  const values = [limit, offset];

  const response = await pool.query<ReviewEntity>(sql, values);
  return response.rows;
}

async function deleteOne(id: number): Promise<void> {
  await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
}

export default { getOne, getAll, deleteOne };
