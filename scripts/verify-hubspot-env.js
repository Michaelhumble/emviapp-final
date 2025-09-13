const has =
  process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ||
  process.env.VITE_HUBSPOT_PORTAL_ID ||
  process.env.HUBSPOT_PORTAL_ID;

if (!has) {
  console.error(
    '\n[HubSpot] Missing Portal ID. Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID or VITE_HUBSPOT_PORTAL_ID (or HUBSPOT_PORTAL_ID) before build.\n'
  );
  process.exit(1);
} else {
  console.log('[HubSpot] Portal ID present. ✔');
}