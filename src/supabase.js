import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://uahzqlxdzaurdaebtvfk.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable__ZqVc33zQ3LxQEXgS8r04g_cy16RrgS'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
