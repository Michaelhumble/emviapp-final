-- ========== WEEK-2 SECURITY HARDENING (SAFE, ADDITIVE) - FINAL FIX ==========

BEGIN;

-- 1) AUDIT LOG: who changed what, when, and from which IP
create table if not exists public.security_audit_log (
  id bigserial primary key,
  table_name text not null,
  operation text not null,
  user_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamptz default now()
);

create or replace function public.audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.security_audit_log(
    table_name, operation, user_id, old_data, new_data, ip_address
  ) values (
    tg_table_name,
    tg_op,
    auth.uid(),
    to_jsonb(old),
    to_jsonb(new),
    current_setting('request.header.x-forwarded-for', true)
  );
  return coalesce(new, old);
end;
$$;

-- Attach audit to sensitive tables (extend as needed)
drop trigger if exists audit_profiles on public.profiles;
create trigger audit_profiles
after insert or update or delete on public.profiles
for each row execute function public.audit_trigger();

drop trigger if exists audit_artist_for_hire on public.artist_for_hire_profiles;
create trigger audit_artist_for_hire
after insert or update or delete on public.artist_for_hire_profiles
for each row execute function public.audit_trigger();

-- 2) STORAGE POLICIES for bucket `nails`
-- Goal: public READ ok; only owner can write/update/delete their own files,
-- where file path convention is: nails/<user_id>/<filename>
alter table storage.objects enable row level security;

-- Drop existing policies if they exist
drop policy if exists "nails_public_read" on storage.objects;
drop policy if exists "nails_insert_own_folder" on storage.objects;
drop policy if exists "nails_update_own" on storage.objects;
drop policy if exists "nails_delete_own" on storage.objects;

-- Public read of nails images
create policy "nails_public_read"
on storage.objects
for select
using (bucket_id = 'nails');

-- Only authenticated users can INSERT into their own folder
create policy "nails_insert_own_folder"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'nails'
  and name like auth.uid()::text || '/%'
);

-- Only owner can UPDATE their own files
create policy "nails_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'nails'
  and name like auth.uid()::text || '/%'
)
with check (
  bucket_id = 'nails'
  and name like auth.uid()::text || '/%'
);

-- Only owner can DELETE their own files
create policy "nails_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'nails'
  and name like auth.uid()::text || '/%'
);

-- 3) PROTECT artist_for_hire_profiles.is_featured (admin/service role only)
create or replace function public.block_is_featured_client_update()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if new.is_featured is distinct from old.is_featured then
    -- allow only service role to toggle is_featured
    if coalesce(current_setting('request.jwt.claims', true), '') not like '%"role":"service_role"%' then
      raise exception 'Only service role may change is_featured';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_is_featured on public.artist_for_hire_profiles;
create trigger protect_is_featured
before update on public.artist_for_hire_profiles
for each row
when (new.is_featured is distinct from old.is_featured)
execute function public.block_is_featured_client_update();

-- 4) FINAL SWEEP: ensure our public SECURITY DEFINER functions keep a safe search_path
do $$
declare r record;
begin
  for r in
    select n.nspname as schema,
           p.proname as function,
           pg_get_function_identity_arguments(p.oid) as args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where p.prosecdef
      and n.nspname = 'public'  -- Only update public schema functions
  loop
    execute format(
      'alter function %I.%I(%s) set search_path to pg_catalog, public;',
      r.schema, r.function, r.args
    );
  end loop;
end $$;

COMMIT;