#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

/**
 * Generate RSS feed for EmviApp blog
 */
function generateRSS() {
  const baseUrl = 'https://emvi.app';
  const currentDate = new Date().toISOString();
  
  // Latest blog posts (30 most recent)
  const blogPosts = [
    {
      title: 'Los Angeles Nail Salon Guide 2025: Prices, Hygiene & How to Choose',
      description: 'A practical LA nail guide—prices by service, hygiene standards, red flags, and how to pick the right nail salon in Los Angeles.',
      url: '/blog/salon-guide/los-angeles-nail-salon-guide',
      pubDate: '2025-09-14T00:00:00Z',
      author: 'EmviApp Editorial'
    },
    {
      title: 'How to Become a Lash Artist in 2025: Skills, Certificate, Kit & Income',
      description: 'Complete guide to starting your lash artist career - training, certification, starter kit essentials, and realistic income expectations for 2025.',
      url: '/blog/career-guide/become-lash-artist-2025',
      pubDate: '2025-09-14T00:00:00Z',
      author: 'EmviApp Editorial'
    },
    {
      title: 'Salon Marketing on Facebook & Instagram: A 90-Day Playbook (+100 Post Ideas)',
      description: 'Complete social media marketing strategy for salons. 90-day content calendar, proven post ideas, and booking-focused campaigns that convert followers to clients.',
      url: '/blog/marketing/salon-marketing-facebook-instagram',
      pubDate: '2025-09-14T00:00:00Z',
      author: 'EmviApp Editorial'
    },
    {
      title: 'Beauty Jobs USA 2025: Salaries, Demand & Where to Apply',
      description: 'Complete guide to beauty industry careers in America. Salary ranges, top hiring markets, application strategies, and insider tips for landing your dream beauty job.',
      url: '/blog/career-guide/beauty-jobs-usa-2025',
      pubDate: '2025-09-14T00:00:00Z',
      author: 'EmviApp Editorial'
    },
    {
      title: 'Wedding Hair & Makeup Checklist 2025: Timeline, Lookbook & Budget Guide',
      description: 'Complete wedding beauty planning guide. 6-month timeline, trial tips, budget breakdown, and coordination strategies for your perfect wedding day look.',
      url: '/blog/wedding-guide/wedding-hair-makeup-checklist',
      pubDate: '2025-09-14T00:00:00Z',
      author: 'EmviApp Editorial'
    },
    {
      title: 'Tìm Việc Nail Ở California: Bí Quyết Cho Người Việt',
      description: 'Hướng dẫn chi tiết cách tìm việc nail ở California cho người Việt. Bí quyết từ cộng đồng với mức lương $1000-2000/tuần.',
      url: '/blog/tim-viec-nail-california-bi-quyet-nguoi-viet',
      pubDate: '2025-01-23T00:00:00Z',
      author: 'Chị Kim Nguyễn'
    }
  ];

  // Generate RSS XML
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EmviApp Blog - Beauty Industry Jobs & Career Guides</title>
    <description>The latest beauty industry news, career guides, and job opportunities for nail technicians, hair stylists, makeup artists, and salon professionals.</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/emviapp-logo.png</url>
      <title>EmviApp Blog</title>
      <link>${baseUrl}/blog</link>
    </image>`;

  // Add blog posts to RSS
  blogPosts.forEach(post => {
    rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}${post.url}</link>
      <guid isPermaLink="true">${baseUrl}${post.url}</guid>
      <pubDate>${post.pubDate}</pubDate>
      <author>noreply@emvi.app (${post.author})</author>
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  // Write RSS feed
  const rssPath = path.join(publicDir, 'rss.xml');
  fs.writeFileSync(rssPath, rss);
  console.log('✅ Generated rss.xml');
}

// Run the generator
try {
  generateRSS();
} catch (error) {
  console.error('❌ Error generating RSS:', error);
  process.exit(1);
}