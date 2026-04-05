import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()
  const { type, source, referrer, user_agent, session_id, scroll_depth } = body

  const { error } = await supabase.from('events').insert({
    type,
    source: source || null,
    referrer: referrer || null,
    user_agent: user_agent || null,
    session_id: session_id || null,
    scroll_depth: scroll_depth || null,
  })

  if (error) console.error('events insert error:', error)

  return NextResponse.json({ success: true })
}
