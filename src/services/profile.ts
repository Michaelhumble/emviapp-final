import { supabase } from "@/integrations/supabase/client";

export async function updateUserRole(role: 'artist'|'salon'|'salon_owner'|'freelancer'|'customer') {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No session');
  const { error } = await supabase.from('profiles').update({ role }).eq('id', user.id);
  if (error) throw error;
  return { error: null as null };
}

export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();
  if (error && (error as any).code === 'PGRST116') {
    await supabase.from('profiles').insert({ id: user.id, role: null } as any).single();
    return { id: user.id, role: null as any };
  }
  if (error) throw error;
  return data as { id: string; role: 'artist'|'salon'|'salon_owner'|'freelancer'|'customer'|null } | null;
}
