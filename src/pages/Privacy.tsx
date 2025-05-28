
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | EmviApp</title>
        <meta name="description" content="EmviApp Privacy Policy and Data Protection Information" />
      </Helmet>
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Privacy Policy</h1>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg mb-4">
                Our Privacy Policy page is currently under development. Please check back later.
              </p>
              <p className="text-lg mb-4 italic">
                Trang Chính sách Bảo mật hiện đang được phát triển. Vui lòng quay lại sau.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
