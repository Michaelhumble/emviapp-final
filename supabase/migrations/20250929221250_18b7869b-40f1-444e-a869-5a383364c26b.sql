-- Create table to track cities for SEO
CREATE TABLE IF NOT EXISTS public.seo_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name TEXT NOT NULL,
  state TEXT NOT NULL,
  state_code TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  population INTEGER,
  metro_area TEXT,
  last_indexed_at TIMESTAMP WITH TIME ZONE,
  indexing_status TEXT DEFAULT 'pending',
  priority DECIMAL DEFAULT 0.8,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_seo_cities_slug ON public.seo_cities(slug);
CREATE INDEX IF NOT EXISTS idx_seo_cities_state ON public.seo_cities(state_code);
CREATE INDEX IF NOT EXISTS idx_seo_cities_last_indexed ON public.seo_cities(last_indexed_at);
CREATE INDEX IF NOT EXISTS idx_seo_cities_active ON public.seo_cities(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.seo_cities ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active cities
CREATE POLICY "Anyone can view active SEO cities"
  ON public.seo_cities
  FOR SELECT
  USING (is_active = true);

-- Policy: Only admins can manage cities
CREATE POLICY "Admins can manage SEO cities"
  ON public.seo_cities
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Table to track daily SEO runs
CREATE TABLE IF NOT EXISTS public.seo_indexing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cities_processed INTEGER DEFAULT 0,
  cities_succeeded INTEGER DEFAULT 0,
  cities_failed INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'running'
);

-- Enable RLS
ALTER TABLE public.seo_indexing_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view logs
CREATE POLICY "Admins can view indexing logs"
  ON public.seo_indexing_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to get next 40 cities to index
CREATE OR REPLACE FUNCTION public.get_cities_for_daily_indexing(batch_size INTEGER DEFAULT 40)
RETURNS TABLE(
  id UUID,
  city_name TEXT,
  state TEXT,
  state_code TEXT,
  slug TEXT,
  priority DECIMAL
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'pg_catalog', 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    sc.id,
    sc.city_name,
    sc.state,
    sc.state_code,
    sc.slug,
    sc.priority
  FROM public.seo_cities sc
  WHERE sc.is_active = true
  ORDER BY 
    -- Priority: cities never indexed first, then oldest indexed
    CASE WHEN sc.last_indexed_at IS NULL THEN 0 ELSE 1 END,
    sc.last_indexed_at ASC NULLS FIRST,
    sc.priority DESC
  LIMIT batch_size;
END;
$function$;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_seo_cities_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER update_seo_cities_updated_at
  BEFORE UPDATE ON public.seo_cities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_cities_updated_at();

-- Insert top 100 US cities for beauty services
INSERT INTO public.seo_cities (city_name, state, state_code, slug, population, priority) VALUES
('Los Angeles', 'California', 'CA', 'los-angeles-ca', 3979576, 1.0),
('New York', 'New York', 'NY', 'new-york-ny', 8336817, 1.0),
('Chicago', 'Illinois', 'IL', 'chicago-il', 2693976, 0.9),
('Houston', 'Texas', 'TX', 'houston-tx', 2320268, 0.9),
('Phoenix', 'Arizona', 'AZ', 'phoenix-az', 1680992, 0.9),
('Philadelphia', 'Pennsylvania', 'PA', 'philadelphia-pa', 1584064, 0.9),
('San Antonio', 'Texas', 'TX', 'san-antonio-tx', 1547253, 0.8),
('San Diego', 'California', 'CA', 'san-diego-ca', 1423851, 0.9),
('Dallas', 'Texas', 'TX', 'dallas-tx', 1343573, 0.9),
('San Jose', 'California', 'CA', 'san-jose-ca', 1021795, 0.9),
('Austin', 'Texas', 'TX', 'austin-tx', 978908, 0.9),
('Jacksonville', 'Florida', 'FL', 'jacksonville-fl', 949611, 0.8),
('Fort Worth', 'Texas', 'TX', 'fort-worth-tx', 918915, 0.8),
('Columbus', 'Ohio', 'OH', 'columbus-oh', 905748, 0.8),
('Charlotte', 'North Carolina', 'NC', 'charlotte-nc', 885708, 0.8),
('San Francisco', 'California', 'CA', 'san-francisco-ca', 873965, 1.0),
('Indianapolis', 'Indiana', 'IN', 'indianapolis-in', 876384, 0.8),
('Seattle', 'Washington', 'WA', 'seattle-wa', 753675, 0.9),
('Denver', 'Colorado', 'CO', 'denver-co', 727211, 0.9),
('Washington', 'District of Columbia', 'DC', 'washington-dc', 705749, 0.9),
('Boston', 'Massachusetts', 'MA', 'boston-ma', 692600, 0.9),
('El Paso', 'Texas', 'TX', 'el-paso-tx', 681728, 0.7),
('Nashville', 'Tennessee', 'TN', 'nashville-tn', 689447, 0.8),
('Detroit', 'Michigan', 'MI', 'detroit-mi', 639111, 0.8),
('Oklahoma City', 'Oklahoma', 'OK', 'oklahoma-city-ok', 649021, 0.7),
('Portland', 'Oregon', 'OR', 'portland-or', 652503, 0.8),
('Las Vegas', 'Nevada', 'NV', 'las-vegas-nv', 641903, 0.9),
('Memphis', 'Tennessee', 'TN', 'memphis-tn', 633104, 0.7),
('Louisville', 'Kentucky', 'KY', 'louisville-ky', 617638, 0.7),
('Baltimore', 'Maryland', 'MD', 'baltimore-md', 585708, 0.8),
('Milwaukee', 'Wisconsin', 'WI', 'milwaukee-wi', 577222, 0.7),
('Albuquerque', 'New Mexico', 'NM', 'albuquerque-nm', 564559, 0.7),
('Tucson', 'Arizona', 'AZ', 'tucson-az', 548073, 0.7),
('Fresno', 'California', 'CA', 'fresno-ca', 542107, 0.7),
('Sacramento', 'California', 'CA', 'sacramento-ca', 524943, 0.8),
('Mesa', 'Arizona', 'AZ', 'mesa-az', 518012, 0.7),
('Kansas City', 'Missouri', 'MO', 'kansas-city-mo', 508090, 0.7),
('Atlanta', 'Georgia', 'GA', 'atlanta-ga', 498715, 0.9),
('Long Beach', 'California', 'CA', 'long-beach-ca', 466742, 0.8),
('Colorado Springs', 'Colorado', 'CO', 'colorado-springs-co', 478961, 0.7),
('Raleigh', 'North Carolina', 'NC', 'raleigh-nc', 474069, 0.8),
('Miami', 'Florida', 'FL', 'miami-fl', 442241, 1.0),
('Virginia Beach', 'Virginia', 'VA', 'virginia-beach-va', 459470, 0.7),
('Omaha', 'Nebraska', 'NE', 'omaha-ne', 486051, 0.7),
('Oakland', 'California', 'CA', 'oakland-ca', 433031, 0.8),
('Minneapolis', 'Minnesota', 'MN', 'minneapolis-mn', 429954, 0.8),
('Tulsa', 'Oklahoma', 'OK', 'tulsa-ok', 401190, 0.7),
('Arlington', 'Texas', 'TX', 'arlington-tx', 398121, 0.7),
('Tampa', 'Florida', 'FL', 'tampa-fl', 399700, 0.8),
('New Orleans', 'Louisiana', 'LA', 'new-orleans-la', 390144, 0.8)
ON CONFLICT (slug) DO NOTHING;