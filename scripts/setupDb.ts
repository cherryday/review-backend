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
    const res = await client.query(sql);
    console.log(res);
    await client.end();
  } catch (err) {
    console.error(err);
  }
}

setupDb();
