
import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function ArtistPortfolioManagerPlaceholder() {
  return (
    <Layout>
      <Helmet>
        <title>Portfolio Manager | EmviApp</title>
      </Helmet>
      <div className="flex min-h-[70vh] items-center justify-center flex-col px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-xl w-full px-6 py-12 bg-gradient-to-br from-[#f1f0fb] via-[#e5deff] to-white rounded-2xl shadow-xl border-0 text-center"
        >
          <div className="mb-4">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#e5deff] to-[#bda9f9] w-16 h-16 mb-2 shadow">
              <svg width="32" height="32" viewBox="0 0 24 24" className="mx-auto text-emvi-accent" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M20 21V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12" />
                <circle cx="16" cy="10" r="2" />
                <path d="M4 17.935 7.022 14.87a2 2 0 0 1 2.965-.099l2.05 2.048" />
              </svg>
            </span>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-emvi-dark mb-2">
              Your Portfolio Manager
            </h1>
            <p className="text-gray-600 text-base mb-3">
              Your Portfolio Manager is coming soon — you’ll be able to showcase, edit, and organize your best work here.
            </p>
            <p className="text-xs text-emvi-accent/70 mt-2">Returning soon to supercharge your artist profile.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
