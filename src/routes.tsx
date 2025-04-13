
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import InviteGuard from '@/components/auth/InviteGuard';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
const SignIn = lazy(() => import('@/pages/auth/SignIn'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));
const EarlyAccess = lazy(() => import('@/pages/auth/EarlyAccess'));
const AccessDenied = lazy(() => import('@/pages/auth/AccessDenied'));
const CommandCenter = lazy(() => import('@/pages/CommandCenter'));

// Main routes
const routes = [
  // Public routes (no auth required)
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
  },
  
  // Auth routes
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<Loading />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    ),
  },
  
  // Add early access request page
  {
    path: '/early-access',
    element: (
      <Suspense fallback={<Loading />}>
        <EarlyAccess />
      </Suspense>
    ),
  },
  
  // Access denied page
  {
    path: '/access-denied',
    element: (
      <Suspense fallback={<Loading />}>
        <AccessDenied />
      </Suspense>
    ),
  },
  
  // Protected routes (auth required)
  {
    path: '/command-center',
    element: (
      <Suspense fallback={<Loading />}>
        <InviteGuard>
          <CommandCenter />
        </InviteGuard>
      </Suspense>
    ),
  },
  
  // Catch-all route for 404 Not Found
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export default routes;
