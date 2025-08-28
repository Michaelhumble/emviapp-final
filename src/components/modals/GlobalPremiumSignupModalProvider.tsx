import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useLocation } from 'react-router-dom';
import PremiumSignupModal from './PremiumSignupModal';
import { FLAGS } from '@/config/flags';

/**
 * Global Modal Provider that shows premium signup modal to unauthenticated users
 * Modal shows based on feature flag and various conditions
 */
const GlobalPremiumSignupModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // REMOVED: All popup modal functionality disabled permanently
  // Modals have been removed to eliminate blocking overlays
  // Users can sign up directly via hero CTAs and /auth/premium-signup page
  
  return <>{children}</>;
};

export default GlobalPremiumSignupModalProvider;