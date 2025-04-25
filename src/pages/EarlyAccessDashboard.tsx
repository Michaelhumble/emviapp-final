
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';
import { Gift, Star, Award, TrendingUp, Shield } from 'lucide-react';
import { GradientBackground } from '@/components/ui/gradient-background';

// Mock data - would be replaced with real data from API
const mockUserData = {
  name: 'Emvi Pioneer',
  referrals: 7,
  credits: 200,
  progressPercentage: 70, // 70% towards VIP status
};

const EarlyAccessDashboard = () => {
  const { t } = useTranslation();

  const perks = [
    {
      icon: Star,
      name: {
        english: 'Priority Profile Boost',
        vietnamese: 'Tăng cường hồ sơ ưu tiên'
      },
      description: {
        english: 'Your profile will be featured at the top of search results',
        vietnamese: 'Hồ sơ của bạn sẽ được hiển thị ở đầu kết quả tìm kiếm'
      }
    },
    {
      icon: Award,
      name: {
        english: 'Early Booking Tools',
        vietnamese: 'Công cụ đặt chỗ sớm'
      },
      description: {
        english: 'Access to advanced scheduling features before anyone else',
        vietnamese: 'Truy cập vào các tính năng lập lịch nâng cao trước tất cả mọi người'
      }
    },
    {
      icon: Shield,
      name: {
        english: 'Premium Customizations',
        vietnamese: 'Tùy chỉnh cao cấp'
      },
      description: {
        english: 'Unlock exclusive profile themes and personalization options',
        vietnamese: 'Mở khóa chủ đề hồ sơ độc quyền và tùy chọn cá nhân hóa'
      }
    },
    {
      icon: TrendingUp,
      name: {
        english: 'Analytics Preview',
        vietnamese: 'Xem trước phân tích'
      },
      description: {
        english: 'Get early access to business performance metrics',
        vietnamese: 'Nhận quyền truy cập sớm vào số liệu hiệu suất kinh doanh'
      }
    }
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-4">
            🎉 {t({
              english: 'Welcome, EmviApp Pioneer!',
              vietnamese: 'Chào mừng, Người tiên phong EmviApp!'
            })}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t({
              english: 'You\'re among the first to experience the future of beauty industry networking.',
              vietnamese: 'Bạn là một trong những người đầu tiên trải nghiệm tương lai của ngành công nghiệp làm đẹp.'
            })}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {t({
                english: 'Your Referrals',
                vietnamese: 'Giới thiệu của bạn'
              })}
            </h3>
            <p className="text-3xl font-bold text-emvi-accent">
              {mockUserData.referrals} <span className="text-base font-normal text-gray-500">
                {t({
                  english: 'friends invited',
                  vietnamese: 'bạn bè đã mời'
                })}
              </span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {t({
                english: 'EmviCredits Balance',
                vietnamese: 'Số dư EmviCredits'
              })}
            </h3>
            <p className="text-3xl font-bold text-emvi-accent">
              💎 {mockUserData.credits} <span className="text-base font-normal text-gray-500">
                {t({
                  english: 'credits',
                  vietnamese: 'tín dụng'
                })}
              </span>
            </p>
          </motion.div>
        </div>

        {/* Progress Towards VIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <GradientBackground variant="artist" className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {t({
                english: 'Progress Towards VIP Status',
                vietnamese: 'Tiến độ hướng tới trạng thái VIP'
              })}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t({
                english: 'Invite more friends to unlock additional rewards',
                vietnamese: 'Mời thêm bạn bè để mở khóa phần thưởng bổ sung'
              })}
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{mockUserData.progressPercentage}%</span>
                <span className="text-gray-600">
                  {t({
                    english: `${mockUserData.referrals}/10 Referrals`,
                    vietnamese: `${mockUserData.referrals}/10 Giới thiệu`
                  })}
                </span>
              </div>
              <Progress 
                value={mockUserData.progressPercentage} 
                className="h-2 bg-gray-200" 
                indicatorClassName="bg-emvi-accent"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </GradientBackground>
        </motion.div>

        {/* Perks Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-6 text-center">
            {t({
              english: 'Exclusive Pioneer Perks',
              vietnamese: 'Đặc quyền độc quyền cho người tiên phong'
            })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 flex"
              >
                <div className="mr-4 bg-emvi-accent/10 p-3 rounded-lg h-fit">
                  <perk.icon className="h-6 w-6 text-emvi-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t(perk.name)}</h3>
                  <p className="text-sm text-gray-600">{t(perk.description)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xl text-gray-700 font-playfair italic max-w-3xl mx-auto">
            {t({
              english: 'The future of the beauty industry is almost here. Keep inviting friends to unlock exclusive perks!',
              vietnamese: 'Tương lai của ngành công nghiệp làm đẹp sắp đến rồi. Tiếp tục mời bạn bè để mở khóa các đặc quyền độc quyền!'
            })}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 text-white font-medium py-6 px-8 rounded-lg shadow-lg hover:shadow-xl flex items-center gap-2"
            onClick={() => window.location.href = "/invite-friends"}
          >
            <Gift className="w-5 h-5" />
            {t({
              english: 'Invite More Friends & Earn Rewards',
              vietnamese: 'Mời thêm bạn bè & Nhận phần thưởng'
            })}
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default EarlyAccessDashboard;
