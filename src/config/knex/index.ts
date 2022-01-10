import { Knex, knex } from 'knex';
import { join } from 'path';

interface KnexEnvConfig {
  local: Knex.Config;
  staging: Knex.Config;
}

const local: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: join(__dirname, '../../../local-db/linktree.db')
  },
  useNullAsDefault: true
};

const staging: Knex.Config = {
  client: 'postgresql',
  connection: {
    database: 'artist_staging',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 1,
    max: 4
  }
};

const knexConfig: KnexEnvConfig = {
  local,
  staging
};
const env = process.env.NODE_ENV || 'local';
const buildKnexInstance = () => {
  if (env === 'staging') return knex(knexConfig.staging);
  return knex(knexConfig.local);
};
const knexInstance = buildKnexInstance();
console.info(`*** Knex Instance intialised with env [${env}] ***`);
export default knexInstance;
