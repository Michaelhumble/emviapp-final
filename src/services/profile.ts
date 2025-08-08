import { supabase } from "@/integrations/supabase/client";

export async function updateUserRole(role: 'artist'|'salon'|'freelancer'|'customer') {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No session');
  return supabase.from('profiles').update({ role }).eq('id', user.id);
}

export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();
  return data as { id: string; role: 'artist'|'salon'|'freelancer'|'customer'|null } | null;
}
