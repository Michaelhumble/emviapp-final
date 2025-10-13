// Lightweight IndexNow client. Safe to import in browser or edge.
// Will no-op if no key is configured.

export async function indexNow(urls: string[]) {
  try {
    const key = (globalThis as any)?.process?.env?.INDEXNOW_KEY || (globalThis as any)?.Deno?.env?.get?.('INDEXNOW_KEY');
    const keyLocation = (globalThis as any)?.process?.env?.INDEXNOW_KEY_LOCATION || (globalThis as any)?.Deno?.env?.get?.('INDEXNOW_KEY_LOCATION') || 'https://www.emvi.app/indexnow.txt';
    if (!key || !Array.isArray(urls) || urls.length === 0) return;

    const body = {
      host: 'www.emvi.app',
      key,
      keyLocation,
      urlList: urls
    };

    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).catch(() => {});
  } catch (_) {
    // swallow
  }
}
