const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const TABLE_NAME = "subscribers";

async function main() {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=id&limit=1`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Keep-alive ping fallito: ${response.status} ${response.statusText}`
    );
  }

  console.log(`Keep-alive OK - progetto Supabase attivo (${new Date().toISOString()})`);
}

main().catch((error) => {
  console.error("Errore durante il keep-alive:", error);
  process.exit(1);
});
