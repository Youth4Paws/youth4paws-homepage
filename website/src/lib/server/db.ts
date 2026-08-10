import { drizzle } from 'drizzle-orm/node-postgres';
import { POSTGRES_URL } from "$env/static/private";

export const db = drizzle({ 
  connection: { 
    connectionString: POSTGRES_URL,
  }
});