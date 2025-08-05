import React from 'react';
import { Link } from 'react-router-dom';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import beautyArtistsImage from '@/assets/beauty-artists-hands-at-work.jpg';

const TheInvisibleArtistsWhoMakeUsBeautiful: React.FC = () => {
  const article = {
    title: 'The Invisible Artists Who Make Us Beautiful: A Love Letter to Beauty Workers Everywhere',
    description: 'Behind every confident stride, every special moment, every "you look amazing" compliment, there are hands that made it possible. This is their story—the beauty artists, nail techs, and salon workers who lift us daily but rarely get the recognition they deserve.',
    author: 'By The EmviApp Team—for Every Artist, Everywhere',
    publishedAt: '2025-01-05',
    readTime: '8 min read',
    category: 'Community Stories',
    categorySlug: 'community-stories',
    tags: ['beauty artist appreciation', 'nail tech stories', 'salon worker recognition', 'beauty industry workers', 'support local salons', 'freelance beauty professionals', 'beauty community'],
    image: beautyArtistsImage,
    slug: 'invisible-artists-who-make-us-beautiful'
  };

  const articleUrl = '/blog/community-stories/invisible-artists-who-make-us-beautiful';

  return (
    <BlogArticleLayout
      article={article}
      articleSlug={article.slug}
      articleUrl={articleUrl}
    >
      <div className="space-y-8">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every morning, millions of people wake up and get ready to face the world. But before they step out their door with confidence, before they feel beautiful enough for that job interview, wedding, or first date—someone made it possible.
          </p>

          <p>
            Someone spent hours perfecting their nails. Someone carefully styled their hair. Someone applied makeup that made their eyes sparkle. Someone gave them the gift of feeling beautiful.
          </p>

          <p>
            These are the invisible artists who shape our most important moments, yet their stories are rarely told.
          </p>
        </div>

        <section className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">The Hands That Hold Us Up</h2>
          <div className="prose max-w-none">
            <p>
              "I've done nails for mothers before job interviews, staying late to make sure they felt confident walking into that room. I've fixed hair for brides at 6am because their original stylist cancelled. I've worked through my own pain because I knew someone was counting on me for their special day."
            </p>
            <p className="text-sm italic text-muted-foreground">— Anonymous beauty professional</p>
          </div>
        </section>

        <div className="prose max-w-none">
          <h2>The Daily Reality</h2>
          <p>
            Beauty professionals work in a world that demands perfection while offering little security. They stand for hours, breathe in chemicals, and push through physical discomfort—all while maintaining the smile and positive energy that their clients need.
          </p>

          <p>
            They juggle unpredictable schedules, irregular income, and the constant pressure to stay current with trends. Many work multiple jobs, rent chairs in different salons, or hustle as freelancers without benefits or guaranteed hours.
          </p>

          <p>
            Yet every single day, they show up. They listen to stories. They offer comfort. They create small miracles with their hands.
          </p>
        </div>

        <section className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">More Than Just a Service</h2>
          <div className="prose max-w-none">
            <p>
              "People don't just come to me for their nails. They come to talk, to feel heard, to have someone care about them for an hour. I've been there for breakups, celebrations, life changes. We're therapists, artists, and friends all rolled into one."
            </p>
            <p className="text-sm italic text-muted-foreground">— Nail technician, 8 years experience</p>
          </div>
        </section>

        <div className="prose max-w-none">
          <h2>Why We Built This Platform</h2>
          <p>
            While the tech world obsesses over AI replacing humans, we believe in AI that celebrates and elevates them. EmviApp exists for one reason: to give beauty artists and salon workers the visibility, respect, and appreciation they have always deserved.
          </p>

          <p>
            This isn't about disrupting an industry—it's about honoring the people who make it beautiful. It's about creating a space where their artistry is showcased, their skills are valued, and their hard work is rewarded.
          </p>

          <p>
            Every feature we build, every line of code we write, every decision we make starts with one question: "How does this help beauty professionals thrive?"
          </p>
        </div>

        <section className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Technology That Serves, Not Replaces</h2>
          <div className="prose max-w-none">
            <p>
              Our AI doesn't replace the human touch—it amplifies it. It helps artists get discovered, salons fill their chairs, and clients find the perfect match for their needs. It handles the scheduling, the searching, and the logistics so artists can focus on what they do best: making people feel beautiful.
            </p>
          </div>
        </section>

        <div className="prose max-w-none">
          <h2>A Simple Request</h2>
          <p>
            The next time someone makes you feel beautiful, thank them. Really thank them. Share their story. Recommend them to friends. Support their business.
          </p>

          <p>
            When you see a nail technician who's been standing for hours, remember they're an artist. When you see a hairstylist perfecting every strand, remember they're solving problems and boosting confidence. When you see any beauty professional at work, remember they're performing small acts of love, one client at a time.
          </p>

          <p>
            Join us in building a world where artists and workers are seen, valued, and cherished. Because beauty isn't just about how we look—it's about how we lift each other up.
          </p>
        </div>

        <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Câu chuyện của những nghệ sĩ vô hình</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p>
              Đằng sau mỗi bước chân tự tin, mỗi khoảnh khắc đặc biệt, mỗi lời khen "bạn trông thật tuyệt", đều có những đôi bàn tay đã làm nên điều đó. Đây là câu chuyện của họ—những nghệ sĩ làm đẹp, thợ làm nail, và những người thợ trong salon, những người nâng đỡ chúng ta mỗi ngày nhưng hiếm khi được ghi nhận xứng đáng.
            </p>
            <p>
              EmviApp được tạo ra để tôn vinh những con người này, để công nghệ phục vụ và nâng cao giá trị của họ, chứ không thay thế. Chúng ta tin rằng vẻ đẹp không chỉ là về cách chúng ta trông như thế nào, mà là về cách chúng ta nâng đỡ lẫn nhau.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How can beauty artists join EmviApp?</h3>
              <p className="text-muted-foreground">
                Artists can sign up for free at <Link to="/artists/signup" className="text-primary hover:underline">emvi.app/artists</Link>. Create your profile, showcase your work, and start connecting with clients who appreciate your artistry. Our platform is designed to be simple and artist-friendly.
              </p>
            </div>
            <div className="bg-background border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How does EmviApp help beauty professionals?</h3>
              <p className="text-muted-foreground">
                We provide visibility, booking management, client discovery, and income opportunities. Our AI matches artists with the right clients, handles scheduling, and helps showcase their work to a broader audience—all while keeping the human connection at the center.
              </p>
            </div>
            <div className="bg-background border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How can I recommend my favorite artist?</h3>
              <p className="text-muted-foreground">
                Help your favorite artist get discovered by leaving honest reviews, sharing their work on social media, and encouraging them to join EmviApp. You can also refer clients directly through our platform and help grow their business.
              </p>
            </div>
            <div className="bg-background border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How can salons participate in EmviApp?</h3>
              <p className="text-muted-foreground">
                Salon owners can <Link to="/salons/signup" className="text-primary hover:underline">register their salon</Link> to increase visibility, fill empty chairs, and connect with freelance professionals. Our platform helps you manage bookings and grow your client base.
              </p>
            </div>
            <div className="bg-background border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What if I'm a client who wants to show support?</h3>
              <p className="text-muted-foreground">
                Use EmviApp to discover and book with local beauty professionals, leave thoughtful reviews, tip generously, and share your positive experiences. Small acts of appreciation make a huge difference in an artist's career.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Why This Matters</h2>
          <div className="prose max-w-none">
            <p>
              The beauty industry employs millions of hardworking professionals who deserve recognition, fair compensation, and respect for their artistry. By supporting beauty workers and the platforms that serve them, we create a more equitable economy where skill and dedication are rewarded.
            </p>
            <p>
              Share this story with someone who's made you feel beautiful. Let's change how we see and value the artists who make our world more beautiful, one person at a time.
            </p>
          </div>
        </section>
      </div>
    </BlogArticleLayout>
  );
};

export default TheInvisibleArtistsWhoMakeUsBeautiful;