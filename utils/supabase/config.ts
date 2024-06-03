export function getSupabaseConfig() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and Key must be set');
    }

    return { supabaseUrl, supabaseKey };
}
