const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
    process.exit(1);
}

const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
};

async function main() {
    const selectRes = await fetch(SUPABASE_URL + '/rest/v1/subscribers?status=eq.unsubscribed&select=id,email,unsubscribed_at', {
        headers,
    });

    if (!selectRes.ok) {
        const err = await selectRes.text();
        console.error('Failed to fetch unsubscribed users:', selectRes.status, err);
        process.exit(1);
    }

    const unsubscribed = await selectRes.json();
    console.log(`Found ${unsubscribed.length} unsubscribed user(s):`);
    unsubscribed.forEach(u => {
        console.log(`  - ${u.email} (unsubscribed at ${u.unsubscribed_at})`);
    });

    if (unsubscribed.length === 0) {
        console.log('Nothing to clean up.');
        return;
    }

    const ids = unsubscribed.map(u => u.id);
    const deleteRes = await fetch(SUPABASE_URL + '/rest/v1/subscribers?id=in.(' + ids.join(',') + ')', {
        method: 'DELETE',
        headers,
    });

    if (!deleteRes.ok) {
        const err = await deleteRes.text();
        console.error('Failed to delete unsubscribed users:', deleteRes.status, err);
        process.exit(1);
    }

    console.log(`Successfully deleted ${unsubscribed.length} unsubscribed user(s).`);
}

main().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
