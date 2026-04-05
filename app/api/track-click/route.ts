import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()
  const { source, referrer, user_agent } = body

  const { error } = await supabase.from('whatsapp_clicks').insert({
    source: source || 'unknown',
    referrer: referrer || null,
    user_agent: user_agent || null,
  })

  if (error) {
    console.error('whatsapp_clicks insert error:', error)
  }

  return NextResponse.json({ success: true })
}
