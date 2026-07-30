import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Node (< 22) has no native WebSocket, which supabase-js's realtime client
// requires even when realtime subscriptions aren't used. This only matters
// when this module is evaluated inside Node (the web dev-server's SSR
// render pass, or `expo export`) — real browsers always have WebSocket, so
// the `ws` fallback is never invoked there.
const transport = typeof WebSocket === 'undefined' ? (ws as never) : undefined;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: transport ? { transport } : undefined,
});
