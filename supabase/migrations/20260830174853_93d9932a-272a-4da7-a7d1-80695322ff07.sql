-- 1. Secure role model -------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','salon_owner','artist','freelancer','customer','manager','supplier','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = pg_catalog, public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Backfill existing roles (non-destructive, admin never auto-granted)
INSERT INTO public.user_roles (user_id, role)
SELECT p.id,
  CASE p.role
    WHEN 'salon' THEN 'salon_owner'
    WHEN 'owner' THEN 'salon_owner'
    WHEN 'salon_owner' THEN 'salon_owner'
    WHEN 'artist' THEN 'artist'
    WHEN 'nail technician/artist' THEN 'artist'
    WHEN 'freelancer' THEN 'freelancer'
    WHEN 'customer' THEN 'customer'
    WHEN 'manager' THEN 'manager'
    WHEN 'supplier' THEN 'supplier'
    WHEN 'beauty supplier' THEN 'supplier'
    WHEN 'vendor' THEN 'supplier'
    ELSE 'other'
  END::public.app_role
FROM public.profiles p
WHERE p.role IS NOT NULL AND p.role <> 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. Block client-side privilege escalation via profiles.role ----------
CREATE OR REPLACE FUNCTION public.prevent_privileged_role_self_assignment()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role
     AND NEW.role IN ('admin','moderator','manager')
     AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not allowed to assign privileged role %', NEW.role;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_privileged_role ON public.profiles;
CREATE TRIGGER trg_prevent_privileged_role
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_privileged_role_self_assignment();

CREATE OR REPLACE FUNCTION public.prevent_privileged_role_on_insert()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.role IN ('admin','moderator','manager') AND NOT public.is_admin() THEN
    NEW.role := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_privileged_role_insert ON public.profiles;
CREATE TRIGGER trg_prevent_privileged_role_insert
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_privileged_role_on_insert();

-- 3. Lock down profiles SELECT for anonymous users ---------------------
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles: Everyone Can Select" ON public.profiles;
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "All inserts for now" ON public.profiles;

CREATE POLICY "profiles_select_own"
ON public.profiles FOR SELECT TO authenticated
USING (id = auth.uid());

CREATE POLICY "profiles_select_authenticated"
ON public.profiles FOR SELECT TO authenticated
USING (true);

REVOKE SELECT ON public.profiles FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- 4. Public-safe profile view for marketplace pages --------------------
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT
  id, full_name, professional_name, salon_name, company_name, avatar_url,
  role, custom_role, specialty, bio, location, instagram, website, contact_link,
  booking_url, portfolio_urls, gallery, services, preferences, years_experience,
  accepts_bookings, available_for_hire, looking_for_work, just_moved,
  moved_to_city, moved_to_state, boosted_until, badges, creator_status,
  community_points, total_posts, total_likes_received, total_shares,
  current_streak, profile_views, created_at
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;