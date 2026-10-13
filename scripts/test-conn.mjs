import pg from 'pg';
const { Client } = pg;

// Password URL encoding: 85zWZDE/4p9@W4P -> 85zWZDE%2F4p9%40W4P
const connectionString = 'postgresql://postgres:85zWZDE%2F4p9%40W4P@db.mwezxfdslpsgvnbhhksb.supabase.co:5432/postgres';

async function testConn() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('Connecting to Supabase PostgreSQL direct port 5432...');
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT current_database(), current_user;');
    console.log('Result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error on port 5432:', err.message);
    console.log('Trying pooler port 6543...');
    const poolerClient = new Client({
      connectionString: 'postgresql://postgres.mwezxfdslpsgvnbhhksb:85zWZDE%2F4p9%40W4P@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
      ssl: { rejectUnauthorized: false },
    });
    try {
      await poolerClient.connect();
      console.log('Connected via pooler successfully!');
      const res = await poolerClient.query('SELECT current_database(), current_user;');
      console.log('Result:', res.rows[0]);
      await poolerClient.end();
    } catch (e2) {
      console.error('Pooler error:', e2.message);
    }
  }
}

testConn();
