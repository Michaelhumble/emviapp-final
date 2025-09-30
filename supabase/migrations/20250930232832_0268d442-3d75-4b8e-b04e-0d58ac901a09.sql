-- Security Fix Phase 1C: Fix final batch of functions with mutable search_path
-- Move search_path from function body to header

-- 1. validate_credits (trigger function)
CREATE OR REPLACE FUNCTION public.validate_credits()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NEW.credits < 0 THEN
    NEW.credits := 0;
  END IF;
  RETURN NEW;
END;
$function$;

-- 2. audit_trigger
CREATE OR REPLACE FUNCTION public.audit_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
begin
  insert into security_audit_log(
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
$function$;

-- 3. block_is_featured_client_update
CREATE OR REPLACE FUNCTION public.block_is_featured_client_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
begin
  if new.is_featured is distinct from old.is_featured then
    if coalesce(current_setting('request.jwt.claims', true), '') not like '%"role":"service_role"%' then
      raise exception 'Only service role may change is_featured';
    end if;
  end if;
  return new;
end;
$function$;

-- 4. auto_tag_job_industry (trigger function)
CREATE OR REPLACE FUNCTION public.auto_tag_job_industry()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NEW.category IS NULL OR NEW.category = '' OR NEW.category = 'Other' OR NEW.category = 'General' THEN
    IF NEW.title ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) OR 
       NEW.description ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) THEN
      NEW.category = 'nails';
    ELSIF NEW.title ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) THEN
      NEW.category = 'hair';
    ELSIF NEW.title ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) OR 
          NEW.description ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) THEN
      NEW.category = 'barber';
    ELSIF NEW.title ILIKE ANY(ARRAY['%massage%', '%therapist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%massage%', '%therapist%']) THEN
      NEW.category = 'massage';
    ELSIF NEW.title ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) OR 
          NEW.description ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) THEN
      NEW.category = 'skincare';
    ELSIF NEW.title ILIKE ANY(ARRAY['%makeup%', '%mua%']) OR 
          NEW.description ILIKE ANY(ARRAY['%makeup%', '%mua%']) THEN
      NEW.category = 'makeup';
    ELSIF NEW.title ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) OR 
          NEW.description ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) THEN
      NEW.category = 'brows-lashes';
    ELSIF NEW.title ILIKE ANY(ARRAY['%tattoo%', '%ink%']) OR 
          NEW.description ILIKE ANY(ARRAY['%tattoo%', '%ink%']) THEN
      NEW.category = 'tattoo';
    ELSE
      NEW.category = 'Other Beauty';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 5. activate_free_jobs (trigger function)
CREATE OR REPLACE FUNCTION public.activate_free_jobs()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  IF NEW.status = 'draft' AND NEW.pricing_tier IN ('free', 'basic') THEN
    NEW.status := 'active';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 6. update_updated_at_column (trigger function)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- 7. generate_unique_referral_code (trigger function)
CREATE OR REPLACE FUNCTION public.generate_unique_referral_code()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN;
BEGIN
    IF NEW.referral_code IS NULL THEN
        LOOP
            new_code := 'EMVI' || substring(md5(NEW.id::text || random()::text) from 1 for 6);
            SELECT EXISTS(SELECT 1 FROM users WHERE referral_code = new_code) INTO code_exists;
            IF NOT code_exists THEN
                NEW.referral_code := new_code;
                EXIT;
            END IF;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$function$;