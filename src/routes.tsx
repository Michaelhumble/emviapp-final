import { lazy } from 'react';

const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    exact: true,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/About')),
  },
  {
    path: '/contact',
    component: lazy(() => import('./pages/Contact')),
  },
  {
    path: '/services',
    component: lazy(() => import('./pages/Services')),
  },
  {
    path: '/blog',
    component: lazy(() => import('./pages/Blog')),
  },
  {
    path: '/blog/:id',
    component: lazy(() => import('./pages/BlogPost')),
  },
  {
    path: '/terms',
    component: lazy(() => import('./pages/Terms')),
  },
  {
    path: '/privacy',
    component: lazy(() => import('./pages/Privacy')),
  },
  {
    path: '/faq',
    component: lazy(() => import('./pages/FAQ')),
  },
  {
    path: '/pricing',
    component: lazy(() => import('./pages/Pricing')),
  },
  {
    path: '/jobs',
    component: lazy(() => import('./pages/Jobs')),
  },
  {
    path: '/jobs/:id',
    component: lazy(() => import('./pages/JobDetail')),
  },
  {
    path: '/submit-job',
    component: lazy(() => import('./pages/SubmitJob')),
    requiresAuth: true,
  },
  {
    path: '/stylists',
    component: lazy(() => import('./pages/Stylists')),
  },
  {
    path: '/stylists/:id',
    component: lazy(() => import('./pages/StylistDetail')),
  },
  {
    path: '/salons/:id',
    component: lazy(() => import('./pages/SalonDetail')),
  },
  {
    path: '/salons',
    component: lazy(() => import('./pages/StableSalonPage')),
  },
  {
    path: '/sell-salon',
    component: lazy(() => import('./pages/sell-salon')),
    requiresAuth: true,
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/dashboard')),
    requiresAuth: true,
  },
  {
    path: "/dashboard/owner",
    component: lazy(() => import("./pages/dashboard/owner")),
    requiresAuth: true,
  },
  {
    path: '/dashboard/customer',
    component: lazy(() => import('./pages/dashboard/Customer')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/artist',
    component: lazy(() => import('./pages/dashboard/Artist')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/artist/profile',
    component: lazy(() => import('./components/dashboard/artist/ArtistProfileEditor')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/artist/portfolio',
    component: lazy(() => import('./components/dashboard/artist/ArtistPortfolio')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/artist/services',
    component: lazy(() => import('./components/dashboard/artist/ArtistServices')),
    requiresAuth: true,
  },
   {
    path: '/dashboard/artist/booking-calendar',
    component: lazy(() => import('./components/dashboard/artist/ArtistBookingCalendar')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/artist/inbox',
    component: lazy(() => import('./components/dashboard/artist/ArtistInbox')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/freelancer',
    component: lazy(() => import('./pages/dashboard/Freelancer')),
    requiresAuth: true,
  },
  {
    path: '/dashboard/manager',
    component: lazy(() => import('./pages/dashboard/Manager')),
    requiresAuth: true,
  },
  {
    path: '/profile',
    component: lazy(() => import('./pages/Profile')),
    requiresAuth: true,
  },
  {
    path: '/login',
    component: lazy(() => import('./pages/Login')),
  },
  {
    path: '/register',
    component: lazy(() => import('./pages/Register')),
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('./pages/ForgotPassword')),
  },
  {
    path: '/reset-password',
    component: lazy(() => import('./pages/ResetPassword')),
  },
  {
    path: '/verify-email',
    component: lazy(() => import('./pages/VerifyEmail')),
  },
  {
    path: '/logout',
    component: lazy(() => import('./pages/Logout')),
  },
  {
    path: '/404',
    component: lazy(() => import('./pages/NotFound')),
  },
  {
    path: '*',
    component: lazy(() => import('./pages/NotFound')),
  },
];

export default routes;
