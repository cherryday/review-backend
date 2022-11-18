import '../src/env';
import fs from 'fs/promises';
import path from 'path';
import { Client } from 'pg';
import dbConfig from '../src/configs/db.config';

function getSqlFromFile() {
  const pathToSql = path.resolve('scripts/setup.sql');
  return fs.readFile(pathToSql, 'utf-8');
}

async function setupDb() {
  try {
    const client = new Client(dbConfig);
    await client.connect();
    const sql = await getSqlFromFile();
    await client.query(sql);
    await client.end();
    console.log('Database setup success');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

setupDb();
