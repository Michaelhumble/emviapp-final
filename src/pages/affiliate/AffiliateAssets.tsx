import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, Image, FileText, Palette } from 'lucide-react';
import { AssetItem } from '@/types/affiliate';
import { toast } from 'sonner';

const AffiliateAssets = () => {
  const [assets] = useState<AssetItem[]>([
    {
      id: '1',
      title: 'EmviApp Logo - Primary',
      description: 'Main EmviApp logo in PNG format with transparent background',
      file_path: '/images/emviapp-logo-primary.png',
      file_size: 45600,
      dimensions: '512x128',
      download_count: 156
    },
    {
      id: '2', 
      title: 'EmviApp Banner - Wide',
      description: 'Wide banner perfect for website headers and blog posts',
      file_path: '/images/emviapp-banner-wide.png',
      file_size: 89200,
      dimensions: '1200x400',
      download_count: 89
    },
    {
      id: '3',
      title: 'Beauty Industry Statistics',
      description: 'Infographic showing key beauty industry statistics and trends',
      file_path: '/images/beauty-industry-stats.png',
      file_size: 234800,
      dimensions: '800x1200',
      download_count: 67
    },
    {
      id: '4',
      title: 'Social Media Templates',
      description: 'Instagram and Facebook post templates in various sizes',
      file_path: '/assets/social-media-templates.zip',
      file_size: 1204800,
      dimensions: 'Multiple',
      download_count: 234
    },
    {
      id: '5',
      title: 'Product Screenshots',
      description: 'High-quality screenshots of the EmviApp platform',
      file_path: '/images/emviapp-screenshots.zip',
      file_size: 567300,
      dimensions: '1920x1080',
      download_count: 123
    },
    {
      id: '6',
      title: 'Brand Guidelines PDF',
      description: 'Complete brand guidelines including colors, fonts, and usage rules',
      file_path: '/assets/emviapp-brand-guidelines.pdf',
      file_size: 890400,
      dimensions: 'PDF',
      download_count: 98
    }
  ]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'zip':
        return <Palette className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const downloadAsset = (asset: AssetItem) => {
    // In a real implementation, this would download the file
    // For now, we'll just show a success message
    toast.success(`Downloaded: ${asset.title}`);
    
    // Create a temporary link to simulate download
    const link = document.createElement('a');
    link.href = asset.file_path;
    link.download = asset.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyShareLink = (asset: AssetItem) => {
    const shareUrl = `${window.location.origin}${asset.file_path}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  };

  const getAssetTypeColor = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'bg-blue-100 text-blue-800';
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'zip':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Marketing Assets - Affiliate Portal - EmviApp</title>
        <meta name="description" content="Download logos, banners, and other marketing materials for promoting EmviApp." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Marketing Assets</h1>
            <p className="text-muted-foreground">
              Download logos, banners, and promotional materials to help you promote EmviApp effectively
            </p>
          </div>

          {/* Usage Guidelines */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Asset Usage Guidelines</CardTitle>
              <CardDescription>
                Please follow these guidelines when using EmviApp marketing materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-green-700">✅ Do</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Use official logos and colors</li>
                    <li>• Maintain proper spacing around logos</li>
                    <li>• Include required FTC disclosures</li>
                    <li>• Use high-quality, unaltered images</li>
                    <li>• Credit EmviApp when appropriate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-red-700">❌ Don't</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Modify logos or change colors</li>
                    <li>• Use outdated or unofficial graphics</li>
                    <li>• Make false or misleading claims</li>
                    <li>• Use copyrighted images without permission</li>
                    <li>• Imply official partnership status</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  {getFileIcon(asset.file_path)}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium leading-tight">{asset.title}</h3>
                    <Badge className={`ml-2 text-xs ${getAssetTypeColor(asset.file_path)}`}>
                      {asset.file_path.split('.').pop()?.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {asset.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{formatFileSize(asset.file_size)}</span>
                    <span>{asset.dimensions}</span>
                    <span>{asset.download_count} downloads</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => downloadAsset(asset)}
                      className="flex-1"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyShareLink(asset)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Palette className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium mb-1">Brand Colors</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Primary: #6366F1<br />
                    Secondary: #F59E0B
                  </p>
                  <Button size="sm" variant="outline">View Palette</Button>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium mb-1">Typography</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Primary: Inter<br />
                    Fallback: System fonts
                  </p>
                  <Button size="sm" variant="outline">Font Guide</Button>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Image className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium mb-1">Photography</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Professional beauty<br />
                    industry photos
                  </p>
                  <Button size="sm" variant="outline">Browse Stock</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Custom Assets?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our team can create custom marketing materials 
                for high-performing affiliates. Reach out to discuss your specific needs.
              </p>
              <Button variant="outline">
                Contact Marketing Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateAssets;