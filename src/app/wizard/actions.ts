'use server'

import { createClient } from '@/utils/supabase/server'

export async function saveProgress(step: number, data: any) {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    // If not authenticated, we just silently return in this prototype
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('wizard_progress')
    .upsert({ 
      id: userData.user.id, 
      step, 
      data,
      updated_at: new Date().toISOString()
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function loadProgress() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return { step: 1, data: {} }
  }

  const { data, error } = await supabase
    .from('wizard_progress')
    .select('step, data')
    .eq('id', userData.user.id)
    .single()

  if (error || !data) {
    return { step: 1, data: {} }
  }

  return { step: data.step, data: data.data }
}
