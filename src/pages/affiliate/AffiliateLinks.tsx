import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, ExternalLink, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AffiliateLink {
  id: string;
  slug: string;
  destination_url: string;
  title: string | null;
  clicks_count: number;
  conversions_count: number;
  created_at: string;
}

const AffiliateLinks = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    destination_url: 'https://emvi.app/',
    slug: ''
  });

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      
      // First get affiliate ID
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!affiliate) {
        toast.error('Affiliate account not found');
        return;
      }

      // Fetch affiliate links
      const { data, error } = await supabase
        .from('affiliate_links')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to load affiliate links');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 30) + '-' + Math.random().toString(36).substring(2, 8);
  };

  const createHMAC = async (slug: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(slug);
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode('default-secret'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getConversionRate = (clicks: number, conversions: number) => {
    if (clicks === 0) return '0%';
    return `${((conversions / clicks) * 100).toFixed(1)}%`;
  };

  const createLink = async () => {
    if (!newLink.title || !newLink.destination_url) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setCreating(true);

      // Get affiliate ID
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!affiliate) {
        toast.error('Affiliate account not found');
        return;
      }

      // Generate slug if not provided
      let slug = newLink.slug || generateSlug(newLink.title);
      
      // Ensure slug is unique
      const { data: existing } = await supabase
        .from('affiliate_links')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existing) {
        slug = generateSlug(newLink.title);
      }

      // Generate HMAC signature
      const hmacSignature = await createHMAC(slug);

      // Create the link
      const { error } = await supabase
        .from('affiliate_links')
        .insert({
          affiliate_id: affiliate.id,
          title: newLink.title,
          destination_url: newLink.destination_url,
          slug: slug,
          hmac_signature: hmacSignature
        });

      if (error) throw error;

      toast.success('Affiliate link created successfully!');
      setShowCreateDialog(false);
      setNewLink({ title: '', destination_url: 'https://emvi.app/', slug: '' });
      fetchLinks();

    } catch (error) {
      console.error('Error creating link:', error);
      toast.error('Failed to create affiliate link');
    } finally {
      setCreating(false);
    }
  };

  const copyLink = (slug: string) => {
    const fullLink = `https://emvi.app/l/${slug}`;
    navigator.clipboard.writeText(fullLink);
    toast.success('Link copied to clipboard!');
  };

  const deleteLink = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      const { error } = await supabase
        .from('affiliate_links')
        .delete()
        .eq('id', linkId);

      if (error) throw error;

      toast.success('Link deleted successfully');
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Failed to delete link');
    }
  };


  return (
    <>
      <Helmet>
        <title>Manage Affiliate Links - EmviApp</title>
        <meta name="description" content="Create and manage your affiliate links for tracking and analytics." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Affiliate Links</h1>
              <p className="text-muted-foreground">Create and manage your affiliate tracking links</p>
            </div>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Affiliate Link</DialogTitle>
                  <DialogDescription>
                    Generate a trackable short link for promoting EmviApp
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Link Title *</Label>
                    <Input
                      id="title"
                      value={newLink.title}
                      onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                      placeholder="e.g., Homepage Promotion, Job Listing Campaign"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="destination">Destination URL *</Label>
                    <Input
                      id="destination"
                      value={newLink.destination_url}
                      onChange={(e) => setNewLink({ ...newLink, destination_url: e.target.value })}
                      placeholder="https://emvi.app/..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Where should this link redirect? Use specific EmviApp pages for better tracking.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Custom Slug (optional)</Label>
                    <Input
                      id="slug"
                      value={newLink.slug}
                      onChange={(e) => setNewLink({ ...newLink, slug: e.target.value.replace(/[^a-z0-9-]/g, '') })}
                      placeholder="my-campaign-name"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to auto-generate. Only lowercase letters, numbers, and hyphens allowed.
                    </p>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={createLink} disabled={creating} className="flex-1">
                      {creating ? 'Creating...' : 'Create Link'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{links.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {links.reduce((sum, link) => sum + link.clicks_count, 0)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {links.reduce((sum, link) => sum + link.conversions_count, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Links Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Affiliate Links</CardTitle>
              <CardDescription>
                All your tracking links with performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : links.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No affiliate links yet</p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Link
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Short Link</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead className="text-center">Clicks</TableHead>
                        <TableHead className="text-center">Conversions</TableHead>
                        <TableHead className="text-center">Rate</TableHead>
                        <TableHead className="text-center">Created</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links.map((link) => (
                        <TableRow key={link.id}>
                          <TableCell className="font-medium">
                            {link.title || 'Untitled Link'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="text-sm bg-muted px-2 py-1 rounded">
                                emvi.app/l/{link.slug}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyLink(link.slug)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            <a 
                              href={link.destination_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              {link.destination_url}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </TableCell>
                          <TableCell className="text-center">{link.clicks_count}</TableCell>
                          <TableCell className="text-center">{link.conversions_count}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={link.clicks_count > 0 ? "default" : "secondary"}>
                              {getConversionRate(link.clicks_count, link.conversions_count)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center text-sm text-muted-foreground">
                            {formatDate(link.created_at)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteLink(link.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Link Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🎯 Use Specific Destinations</h4>
                  <p className="text-muted-foreground">
                    Link to specific pages like /jobs or /for-artists instead of just the homepage for better conversion rates.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">📊 Track Different Campaigns</h4>
                  <p className="text-muted-foreground">
                    Create separate links for different marketing channels (social media, email, blog) to track performance.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">🏷️ Use Descriptive Titles</h4>
                  <p className="text-muted-foreground">
                    Give your links clear titles like "Instagram Story Campaign" or "Email Newsletter Link" for easy identification.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">🔄 Regular Optimization</h4>
                  <p className="text-muted-foreground">
                    Review your link performance regularly and focus your efforts on the highest-converting channels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateLinks;