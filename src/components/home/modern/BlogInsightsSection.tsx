import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Sparkles } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/blogArticles";

interface BlogInsightsSectionProps {
  isVietnamese?: boolean;
}

const BlogInsightsSection = ({ isVietnamese = false }: BlogInsightsSectionProps) => {
  // Get the top 3 featured articles
  const featuredArticles = BLOG_ARTICLES
    .filter(article => article.featured)
    .slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(88, 28, 135, 0.9) 50%, rgba(124, 58, 237, 0.95) 100%)"
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <TrendingUp className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-medium text-white">
              {isVietnamese ? "Xu Hướng Ngành" : "Industry Trends"}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isVietnamese ? "Thông Tin Mới Nhất" : "Latest Insights"}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {isVietnamese 
              ? "Khám phá xu hướng mới nhất, công nghệ AI và bí quyết thành công trong ngành làm đẹp"
              : "Discover the latest trends, AI technology, and success secrets in the beauty industry"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={article.url}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group-hover:scale-105 h-full">
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image}
                      alt={`${article.title} - Beauty industry insights and trends`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </div>
                    
                    {/* Trending Badge */}
                    {article.trending && (
                      <div className="absolute top-4 right-4 bg-yellow-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {isVietnamese ? "Thịnh Hành" : "Trending"}
                      </div>
                    )}
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/blog">
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-6"
            >
              {isVietnamese ? "Xem Tất Cả Bài Viết" : "View All Articles"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogInsightsSection;