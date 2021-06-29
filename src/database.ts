import { Pool, Client } from 'pg'

export async function connection() {
  const client = new Client({
    "host": "localhost",
    "port": 5432,
    "user": "Nikolas",
    "password": "nikolas89",
    "database": "post-api"
  })

  await client.connect()

  return client
}