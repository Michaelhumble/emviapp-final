import { UserRole } from '@/context/auth/types';

export interface ProfileThemeConfig {
  // Background gradients
  backgroundGradient: string;
  backgroundOverlay1: string;
  backgroundOverlay2: string;
  backgroundOverlay3: string;
  
  // Floating orbs
  floatingOrb1: string;
  floatingOrb2: string;
  floatingOrb3: string;
  
  // Navigation
  tabsBackground: string;
  tabsBorder: string;
  tabTriggerActive: string;
  tabTriggerHover: string;
  tabActiveGlow: string;
  
  // Text colors
  primaryText: string;
  secondaryText: string;
  accentText: string;
  
  // Component backgrounds
  cardBackground: string;
  cardBorder: string;
  cardHover: string;
  
  // Buttons
  primaryButton: string;
  secondaryButton: string;
  buttonHover: string;
  
  // Role-specific accent
  roleAccent: string;
  roleAccentLight: string;
  
  // Display properties
  roleDisplayName: string;
  welcomeMessage: string;
}

/**
 * Centralized theme configuration for profile dashboards
 * Supports dynamic theming based on user role
 */
export const getProfileTheme = (userRole?: UserRole | null): ProfileThemeConfig => {
  switch (userRole) {
    case 'artist':
    case 'nail technician/artist':
      return {
        // Purple/Pink Artist Theme
        backgroundGradient: 'bg-gradient-to-br from-slate-50 via-white to-purple-50/30',
        backgroundOverlay1: 'bg-[radial-gradient(circle_at_20%_20%,hsl(var(--luxury-gold)/0.1),transparent_50%)]',
        backgroundOverlay2: 'bg-[radial-gradient(circle_at_80%_80%,hsl(var(--premium-purple)/0.08),transparent_50%)]',
        backgroundOverlay3: 'bg-[radial-gradient(circle_at_40%_60%,hsl(var(--diamond-blue)/0.05),transparent_50%)]',
        
        floatingOrb1: 'bg-gradient-to-r from-purple-400/20 to-pink-400/20',
        floatingOrb2: 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20',
        floatingOrb3: 'bg-gradient-to-r from-yellow-400/15 to-orange-400/15',
        
        tabsBackground: 'bg-white/90',
        tabsBorder: 'border border-purple-100/50',
        tabTriggerActive: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg',
        tabTriggerHover: 'hover:bg-purple-50',
        tabActiveGlow: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
        
        primaryText: 'text-purple-900',
        secondaryText: 'text-purple-700',
        accentText: 'text-pink-600',
        
        cardBackground: 'bg-white/95',
        cardBorder: 'border-purple-100/50',
        cardHover: 'hover:bg-purple-50/30',
        
        primaryButton: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        secondaryButton: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
        buttonHover: 'hover:scale-105',
        
        roleAccent: 'purple-500',
        roleAccentLight: 'purple-100',
        
        roleDisplayName: 'Nail Artist',
        welcomeMessage: 'Showcase your artistry and grow your client base'
      };
      
    case 'freelancer':
      return {
        // Orange/Amber Freelancer Theme
        backgroundGradient: 'bg-gradient-to-br from-orange-50 via-white to-amber-50/30',
        backgroundOverlay1: 'bg-[radial-gradient(circle_at_20%_20%,hsl(45_100%_50%/0.1),transparent_50%)]',
        backgroundOverlay2: 'bg-[radial-gradient(circle_at_80%_80%,hsl(35_100%_50%/0.08),transparent_50%)]',
        backgroundOverlay3: 'bg-[radial-gradient(circle_at_40%_60%,hsl(25_100%_50%/0.05),transparent_50%)]',
        
        floatingOrb1: 'bg-gradient-to-r from-orange-400/20 to-amber-400/20',
        floatingOrb2: 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20',
        floatingOrb3: 'bg-gradient-to-r from-amber-400/15 to-yellow-400/15',
        
        tabsBackground: 'bg-white/90',
        tabsBorder: 'border border-orange-100/50',
        tabTriggerActive: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg',
        tabTriggerHover: 'hover:bg-orange-50',
        tabActiveGlow: 'bg-gradient-to-r from-orange-500/20 to-amber-500/20',
        
        primaryText: 'text-orange-900',
        secondaryText: 'text-orange-700',
        accentText: 'text-amber-600',
        
        cardBackground: 'bg-white/95',
        cardBorder: 'border-orange-100/50',
        cardHover: 'hover:bg-orange-50/30',
        
        primaryButton: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
        secondaryButton: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
        buttonHover: 'hover:scale-105',
        
        roleAccent: 'orange-500',
        roleAccentLight: 'orange-100',
        
        roleDisplayName: 'Freelancer',
        welcomeMessage: 'Manage your independent business and connect with clients'
      };
      
    default:
      // Default theme for other roles
      return {
        backgroundGradient: 'bg-gradient-to-br from-slate-50 via-white to-gray-50/30',
        backgroundOverlay1: 'bg-[radial-gradient(circle_at_20%_20%,hsl(220_14%_96%/0.1),transparent_50%)]',
        backgroundOverlay2: 'bg-[radial-gradient(circle_at_80%_80%,hsl(220_14%_93%/0.08),transparent_50%)]',
        backgroundOverlay3: 'bg-[radial-gradient(circle_at_40%_60%,hsl(220_14%_89%/0.05),transparent_50%)]',
        
        floatingOrb1: 'bg-gradient-to-r from-gray-400/20 to-slate-400/20',
        floatingOrb2: 'bg-gradient-to-r from-blue-400/20 to-slate-400/20',
        floatingOrb3: 'bg-gradient-to-r from-slate-400/15 to-gray-400/15',
        
        tabsBackground: 'bg-white/90',
        tabsBorder: 'border border-gray-100/50',
        tabTriggerActive: 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-lg',
        tabTriggerHover: 'hover:bg-gray-50',
        tabActiveGlow: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20',
        
        primaryText: 'text-gray-900',
        secondaryText: 'text-gray-700',
        accentText: 'text-slate-600',
        
        cardBackground: 'bg-white/95',
        cardBorder: 'border-gray-100/50',
        cardHover: 'hover:bg-gray-50/30',
        
        primaryButton: 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700',
        secondaryButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        buttonHover: 'hover:scale-105',
        
        roleAccent: 'gray-500',
        roleAccentLight: 'gray-100',
        
        roleDisplayName: 'Professional',
        welcomeMessage: 'Manage your professional profile and connections'
      };
  }
};