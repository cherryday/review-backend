import { Pool } from 'pg';
import dbConfig from './configs/db.config';

const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.table(res.rows);
});

// export default {
//   query ()
// }
