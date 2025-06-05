
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet';
import UniversalSearchBar from '@/components/search/UniversalSearchBar';
import SearchResults from '@/components/search/SearchResults';
import PostRequestWidget from '@/components/search/PostRequestWidget';
import { useTranslation } from '@/hooks/useTranslation';

const Search = () => {
  const { isVietnamese } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>
          {isVietnamese ? "Tìm Kiếm | EmviApp" : "Search | EmviApp"}
        </title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Tìm kiếm salon, việc làm, nghệ sĩ, dịch vụ và ưu đại trong ngành làm đẹp"
            : "Search for salons, jobs, artists, services and deals in the beauty industry"
          }
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Universal Search Bar */}
          <div className="mb-8">
            <UniversalSearchBar />
          </div>

          {/* Search Results */}
          <div className="mb-8">
            <SearchResults />
          </div>

          {/* Post Request Widget */}
          <div className="mb-8">
            <PostRequestWidget />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
