
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { comparisonFeatures } from './pricingData';
import { Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const PricingComparison = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-24"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-playfair font-bold text-gray-800">
          {t({
            english: "Compare Plans",
            vietnamese: "So Sánh Các Gói"
          })}
        </h2>
        <p className="text-gray-600 mt-3">
          {t({
            english: "See which features are included with each plan",
            vietnamese: "Xem tính năng nào được bao gồm trong từng gói"
          })}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80 border-b border-gray-200">
                <TableHead className="font-medium text-gray-600 py-6 pl-6 w-[40%]">
                  {t({english: "Features", vietnamese: "Tính năng"})}
                </TableHead>
                <TableHead className="text-center font-medium text-gray-600 py-6">
                  {t({english: "Starter", vietnamese: "Khởi đầu"})}
                </TableHead>
                <TableHead className="text-center font-medium text-emvi-accent py-6">
                  {t({english: "Pro", vietnamese: "Chuyên nghiệp"})}
                </TableHead>
                <TableHead className="text-center font-medium text-gray-600 py-6 pr-6">
                  {t({english: "Ultimate", vietnamese: "Tối thượng"})}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((feature) => (
                <TableRow 
                  key={feature.id}
                  className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors
                    ${feature.highlight ? 'bg-purple-50/30' : ''}`}
                >
                  <TableCell className="font-medium pl-6 py-4">
                    {t({english: feature.feature, vietnamese: feature.vietnameseFeature})}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.starter ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <span className="block h-5 w-5 mx-auto">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.pro ? (
                      <Check className="mx-auto h-5 w-5 text-emvi-accent" />
                    ) : (
                      <span className="block h-5 w-5 mx-auto">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    {feature.ultimate ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <span className="block h-5 w-5 mx-auto">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingComparison;
