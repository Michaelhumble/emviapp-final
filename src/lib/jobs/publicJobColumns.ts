/**
 * Columns that are safe to expose in public (including signed-out) job queries.
 *
 * `contact_info` is intentionally excluded: it holds the poster's email/phone
 * and is no longer readable by anonymous API clients. Job owners and internal
 * dashboards query the table directly with `*` while authenticated.
 */
export const PUBLIC_JOB_COLUMNS = [
  'id',
  'title',
  'category',
  'location',
  'description',
  'user_id',
  'status',
  'created_at',
  'updated_at',
  'expires_at',
  'pricing_tier',
  'compensation_type',
  'compensation_details',
  'requirements',
  'payment_status',
  'image_url',
  'vietnamese_title',
  'vietnamese_description',
  'metadata',
  'image_urls',
  'photos',
  'seed_tag',
].join(', ');
