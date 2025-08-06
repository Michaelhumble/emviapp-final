export interface CTAButton {
  label: string;
  route: string;
  intent: string;
}

export const detectUserIntent = (userMessage: string, isAuthenticated: boolean = false): CTAButton[] => {
  const message = userMessage.toLowerCase();
  const buttons: CTAButton[] = [];

  // Sign up / Sign in intent
  if (message.includes('sign up') || message.includes('register') || message.includes('join') || 
      message.includes('create account') || message.includes('đăng ký')) {
    if (isAuthenticated) {
      // User is already logged in, maybe they meant something else
      buttons.push({
        label: 'Browse Jobs',
        route: '/jobs',
        intent: 'browse-jobs'
      });
    } else {
      buttons.push({
        label: 'Sign Up',
        route: '/auth/signup?redirect=%2F',
        intent: 'signup'
      });
    }
  }

  // Sign in intent
  if (message.includes('sign in') || message.includes('login') || message.includes('log in') ||
      message.includes('đăng nhập')) {
    buttons.push({
      label: 'Sign In',
      route: '/auth/signin?redirect=%2F',
      intent: 'signin'
    });
  }

  // Post job intent
  if (message.includes('post job') || message.includes('post a job') || message.includes('create job') ||
      message.includes('hire') || message.includes('đăng tin') || message.includes('tuyển') ||
      message.includes('tìm thợ') || message.includes('cần thợ')) {
    buttons.push({
      label: 'Post a Job',
      route: '/post-job',
      intent: 'post-job'
    });
  }

  // Sell salon intent
  if (message.includes('sell salon') || message.includes('sell my salon') || message.includes('list salon') ||
      message.includes('bán salon') || message.includes('sang tiệm') || message.includes('nhượng tiệm')) {
    buttons.push({
      label: 'Sell Your Salon',
      route: '/sell-salon',
      intent: 'sell-salon'
    });
  }

  // Browse jobs intent
  if (message.includes('browse jobs') || message.includes('find job') || message.includes('look for job') ||
      message.includes('search job') || message.includes('tìm việc') || message.includes('xem việc')) {
    buttons.push({
      label: 'Browse Jobs',
      route: '/jobs',
      intent: 'browse-jobs'
    });
  }

  // Browse salons intent
  if (message.includes('browse salon') || message.includes('find salon') || message.includes('look for salon') ||
      message.includes('search salon') || message.includes('tìm salon') || message.includes('xem salon')) {
    buttons.push({
      label: 'Browse Salons',
      route: '/salons',
      intent: 'browse-salons'
    });
  }

  // Contact intent
  if (message.includes('contact') || message.includes('support') || message.includes('help') ||
      message.includes('liên hệ') || message.includes('hỗ trợ')) {
    buttons.push({
      label: 'Contact Support',
      route: '/contact',
      intent: 'contact'
    });
  }

  // About intent
  if (message.includes('about') || message.includes('story') || message.includes('emviapp') ||
      message.includes('về emvi') || message.includes('giới thiệu')) {
    buttons.push({
      label: 'About EmviApp',
      route: '/about',
      intent: 'about'
    });
  }

  // Return only the first 2 buttons to avoid clutter
  return buttons.slice(0, 2);
};

export const shouldShowCTAButtons = (userMessage: string): boolean => {
  const message = userMessage.toLowerCase();
  
  // Keywords that indicate user wants to take action
  const actionKeywords = [
    'how do i', 'how can i', 'where do i', 'where can i', 'how to',
    'làm sao', 'ở đâu', 'thế nào', 'how', 'where'
  ];

  return actionKeywords.some(keyword => message.includes(keyword));
};