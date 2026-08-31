import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';

type Status = 'draft' | 'approved' | 'scheduled' | 'published' | 'failed' | 'rejected';

interface QueueItem {
  id: string;
  content_type: string;
  source_type: string;
  source_id: string | null;
  source_url: string | null;
  platform: string;
  language: string;
  headline: string | null;
  caption: string;
  hashtags: string[] | null;
  cta: string | null;
  creative_brief: string | null;
  target_url: string | null;
  status: Status;
  fact_check_status: string;
  fact_check_notes: string | null;
  created_at: string;
}

interface Connection {
  id: string;
  platform: string;
  status: string;
  provider: string | null;
  notes: string | null;
}

const STATUSES: Status[] = ['draft', 'approved', 'scheduled', 'published', 'failed', 'rejected'];

const statusVariant = (s: string) =>
  s === 'approved' || s === 'published' || s === 'connected'
    ? 'default'
    : s === 'failed' || s === 'rejected' || s === 'needs_attention'
      ? 'destructive'
      : 'secondary';

const SocialGrowth = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<QueueItem[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState<Record<string, string>>({});

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .rpc('has_role', { _user_id: user.id, _role: 'admin' })
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [user, authLoading]);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: queue }, { data: conns }] = await Promise.all([
      supabase
        .from('social_content_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase.from('social_connections').select('*').order('platform'),
    ]);
    setItems((queue as unknown as QueueItem[]) || []);
    setConnections((conns as unknown as Connection[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    STATUSES.forEach((s) => (c[s] = items.filter((i) => i.status === s).length));
    return c;
  }, [items]);

  const generate = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('social-generate', { body: {} });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const res = data as any;
      toast({
        title: `Created ${res.created_count} draft(s)`,
        description:
          res.note ||
          `${res.eligible_real_jobs} eligible real job(s) found.`,
      });
      await load();
    } catch (e: any) {
      toast({ title: 'Generation failed', description: e.message, variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  const setStatus = async (item: QueueItem, status: Status) => {
    const { error } = await supabase
      .from('social_content_queue')
      .update({ status, reviewed_by: user?.id ?? null, reviewed_at: new Date().toISOString() })
      .eq('id', item.id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: `Moved to ${status}` });
    load();
  };

  const saveCaption = async (item: QueueItem) => {
    const caption = editing[item.id];
    if (caption === undefined) return;
    const { error } = await supabase
      .from('social_content_queue')
      .update({ caption })
      .eq('id', item.id);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    setEditing((e) => {
      const next = { ...e };
      delete next[item.id];
      return next;
    });
    toast({ title: 'Caption saved' });
    load();
  };

  if (authLoading || isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Admins only
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This internal tool is restricted to EmviApp administrators.
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderItem = (item: QueueItem) => (
    <Card key={item.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{item.platform}</Badge>
          <Badge variant="outline">{item.language.toUpperCase()}</Badge>
          <Badge variant="secondary">{item.content_type}</Badge>
          <Badge variant={statusVariant(item.status) as any}>{item.status}</Badge>
          {item.fact_check_status !== 'passed' && (
            <Badge variant="destructive">fact check: {item.fact_check_status}</Badge>
          )}
        </div>
        {item.headline && <CardTitle className="text-base pt-2">{item.headline}</CardTitle>}
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={editing[item.id] ?? item.caption}
          onChange={(e) => setEditing((s) => ({ ...s, [item.id]: e.target.value }))}
          rows={5}
        />
        {item.hashtags?.length ? (
          <p className="text-sm text-muted-foreground">{item.hashtags.join(' ')}</p>
        ) : null}
        {item.creative_brief && (
          <p className="text-sm">
            <span className="font-medium">Creative idea: </span>
            {item.creative_brief}
          </p>
        )}
        {item.fact_check_notes && (
          <p className="text-sm text-destructive">Fact check: {item.fact_check_notes}</p>
        )}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>CTA: {item.cta}</p>
          <p>
            Source: {item.source_type}
            {item.source_url ? ` · ${item.source_url}` : ''}
          </p>
          {item.target_url && (
            <a
              href={item.target_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline break-all"
            >
              {item.target_url} <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {editing[item.id] !== undefined && (
            <Button size="sm" variant="secondary" onClick={() => saveCaption(item)}>
              Save edit
            </Button>
          )}
          {item.status === 'draft' && (
            <>
              <Button size="sm" onClick={() => setStatus(item, 'approved')}>
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setStatus(item, 'rejected')}>
                Reject
              </Button>
            </>
          )}
          {item.status === 'approved' && (
            <Button size="sm" variant="outline" disabled title="No publishing provider connected yet">
              Publish now (Phase 2)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Helmet>
        <title>Social Growth Engine — Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Social Growth Engine</h1>
          <p className="text-sm text-muted-foreground">
            Internal tool. AI drafts → human approval. Nothing publishes automatically.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Button size="sm" onClick={generate} disabled={generating}>
            {generating ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-1" />
            )}
            Generate drafts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {STATUSES.map((s) => (
          <Card key={s}>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-semibold">{counts[s] ?? 0}</div>
              <div className="text-xs uppercase text-muted-foreground">{s}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Social connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {connections.map((c) => (
            <div key={c.id} className="flex items-center justify-between text-sm">
              <span className="capitalize">{c.platform}</span>
              <Badge variant={statusVariant(c.status) as any}>{c.status.replace('_', ' ')}</Badge>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2">
            No access tokens are stored in the browser. A publishing provider will be connected
            server-side in Phase 2.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="draft">
        <TabsList className="flex flex-wrap h-auto">
          {STATUSES.map((s) => (
            <TabsTrigger key={s} value={s} className="capitalize">
              {s} ({counts[s] ?? 0})
            </TabsTrigger>
          ))}
        </TabsList>
        {STATUSES.map((s) => (
          <TabsContent key={s} value={s} className="mt-4">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : items.filter((i) => i.status === s).length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing here yet.</p>
            ) : (
              items.filter((i) => i.status === s).map(renderItem)
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SocialGrowth;
