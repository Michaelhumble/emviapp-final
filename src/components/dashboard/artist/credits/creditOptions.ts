
import React from 'react';
import { RocketIcon, TrendingUpIcon, ZapIcon } from 'lucide-react';
import { CreditOption } from './types';

export const creditOptions: CreditOption[] = [
  {
    id: 'profile-boost',
    title: 'Profile Boost (7 Days)',
    description: 'Increase your profile visibility for a full week. Get seen by more salon owners and clients.',
    creditCost: 10,
    icon: React.createElement(RocketIcon),
    actionText: 'Boost My Profile'
  },
  {
    id: 'featured-listing',
    title: 'Featured Portfolio',
    description: 'Highlight your portfolio in search results for 3 days. Perfect for showcasing new work.',
    creditCost: 8,
    icon: React.createElement(TrendingUpIcon),
    isDisabled: true,
    comingSoon: true,
    actionText: 'Coming Soon'
  },
  {
    id: 'instant-notification',
    title: 'Priority Alerts',
    description: 'Get instant notifications for new job postings that match your skills for 14 days.',
    creditCost: 5,
    icon: React.createElement(ZapIcon),
    isDisabled: true,
    comingSoon: true,
    actionText: 'Coming Soon'
  }
];
