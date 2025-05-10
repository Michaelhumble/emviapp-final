
import React, { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Pages
const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const ForgotPassword = lazy(() => import('./pages/forgot-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const About = lazy(() => import('./pages/about'));
const Settings = lazy(() => import('./pages/settings'));
const Profile = lazy(() => import('./pages/profile'));
const FindJobs = lazy(() => import('./pages/jobs'));
const JobPage = lazy(() => import('./pages/jobs/id'));
const FindBooths = lazy(() => import('./pages/booths'));
const BoothPage = lazy(() => import('./pages/booths/id'));
const FindSalons = lazy(() => import('./pages/salons'));
const SalonPage = lazy(() => import('./pages/salons/id'));
const FindArtists = lazy(() => import('./pages/artists'));
const ArtistPage = lazy(() => import('./pages/artists/id'));
const PostJobPage = lazy(() => import('./pages/post-job/Index'));
const PostJobFormPage = lazy(() => import('./pages/post-job/form'));
const PostJobPricingPage = lazy(() => import('./pages/post-job/pricing'));
const PaymentSuccess = lazy(() => import('./pages/payment-success'));
const PaymentCanceled = lazy(() => import('./pages/payment-canceled'));
const PostSuccess = lazy(() => import('./pages/post-success'));
const PostingIndex = lazy(() => import('./pages/posting/Index'));

// Import your auth context provider
import { UserProvider } from './context/auth';
import { ThemeProvider } from './context/theme';
import AppLoader from './components/ui/app-loader';
import RouteLogger from './components/common/RouteLogger';
