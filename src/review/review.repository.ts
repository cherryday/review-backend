import { pool } from '../db';
import { ReviewBody, ReviewsQuery } from './review.schema';

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
  let sql = 'SELECT * FROM reviews';
  let values: number[] = [];

  if (query.limit && query.offset) {
    sql = `${sql} LIMIT $1 OFFSET $2`;
    values = [query.limit, query.offset];
  }

  const response = await pool.query<ReviewEntity>(sql, values);
  return response.rows;
}

async function createOne(body: ReviewBody): Promise<ReviewEntity> {
  const sql =
    'INSERT INTO reviews (title, description) VALUES ($1, $2) RETURNING *';
  const values = [body.title, body.description];

  const response = await pool.query<ReviewEntity>(sql, values);
  return response.rows[0];
}

async function updateOne(id: number, body: ReviewBody): Promise<ReviewEntity> {
  const sql =
    'UPDATE reviews SET title = $1, description = $2 WHERE id = $3 RETURNING *';
  const values = [body.title, body.description, id];

  const response = await pool.query<ReviewEntity>(sql, values);
  return response.rows[0];
}

async function deleteOne(id: number): Promise<void> {
  await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
}

export default { getOne, getAll, createOne, updateOne, deleteOne };
