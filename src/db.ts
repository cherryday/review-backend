import { Pool } from 'pg';
import dbConfig from './configs/db.config';

export const pool = new Pool(dbConfig);
