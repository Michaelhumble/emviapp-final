
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/auth/AuthProvider'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import Analysis from '@/pages/Analysis'
import Checkout from '@/pages/Checkout'
import Artists from '@/pages/Artists'
import Customers from '@/pages/Customers'
import Freelancers from '@/pages/Freelancers'
import Jobs from '@/pages/Jobs'
import Index from '@/pages/Index'
import NailJobs from '@/pages/NailJobs'
import NotFound from '@/pages/NotFound'
import ProductPromotions from '@/pages/ProductPromotions'
import Profile from '@/pages/Profile'
import SalonMarketplace from '@/pages/SalonMarketplace'
import SalonOwners from '@/pages/SalonOwners'
import Salons from '@/pages/Salons'
import Suppliers from '@/pages/Suppliers'
import SupplierDirectory from '@/pages/SupplierDirectory'
import ManageJobs from '@/pages/ManageJobs'
import Welcome from '@/pages/Welcome'
import RouteLogger from '@/components/common/RouteLogger'
import SignIn from '@/pages/auth/SignIn'
import SignUp from '@/pages/auth/SignUp'
import Dashboard from '@/pages/dashboard/Dashboard'
import ArtistDashboard from '@/pages/dashboard/Artist'
import CustomerDashboard from '@/pages/dashboard/Customer'
import FreelancerDashboard from '@/pages/dashboard/Freelancer'
import OwnerDashboard from '@/pages/dashboard/Owner'
import SalonDashboard from '@/pages/dashboard/Salon'
import SupplierDashboard from '@/pages/dashboard/Supplier'
import OtherDashboard from '@/pages/dashboard/Other'
import MessageIndex from '@/pages/messages/index'
import ProfileEditor from '@/pages/profile/ProfileEditor'
import ProfileRedirect from '@/pages/profile/ProfileRedirect'
import ArtistSetup from '@/pages/profile/artist/setup'
import CustomerSetup from '@/pages/profile/customer/setup'
import FreelancerSetup from '@/pages/profile/freelancer/setup'
import OtherSetup from '@/pages/profile/other/setup'
import RenterSetup from '@/pages/profile/renter/setup'
import SalonSetup from '@/pages/profile/salon/setup'
import SupplierSetup from '@/pages/profile/supplier/setup'

import PostingIndex from '@/pages/posting/Index'
import JobPost from '@/pages/posting/JobPost'
import SalonPost from '@/pages/posting/SalonPost'
import BoothPost from '@/pages/posting/BoothPost'

// Create a query client
const queryClient = new QueryClient()

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Index /> },
      { path: '/artists', element: <Artists /> },
      { path: '/customers', element: <Customers /> },
      { path: '/freelancers', element: <Freelancers /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/jobs/nail', element: <NailJobs /> },
      { path: '/jobs/manage', element: <ManageJobs /> },
      { path: '/marketplace', element: <SalonMarketplace /> },
      { path: '/salons', element: <Salons /> },
      { path: '/salon-owners', element: <SalonOwners /> },
      { path: '/suppliers', element: <Suppliers /> },
      { path: '/supplier-directory', element: <SupplierDirectory /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/profile', element: <Profile /> },
      { path: '/profile/edit', element: <ProfileEditor /> },
      { path: '/profile/redirect', element: <ProfileRedirect /> },
      { path: '/profile/artist/setup', element: <ArtistSetup /> },
      { path: '/profile/customer/setup', element: <CustomerSetup /> },
      { path: '/profile/freelancer/setup', element: <FreelancerSetup /> },
      { path: '/profile/other/setup', element: <OtherSetup /> },
      { path: '/profile/renter/setup', element: <RenterSetup /> },
      { path: '/profile/salon/setup', element: <SalonSetup /> },
      { path: '/profile/supplier/setup', element: <SupplierSetup /> },
      { path: '/auth/signin', element: <SignIn /> },
      { path: '/auth/signup', element: <SignUp /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/artist', element: <ArtistDashboard /> },
      { path: '/dashboard/customer', element: <CustomerDashboard /> },
      { path: '/dashboard/freelancer', element: <FreelancerDashboard /> },
      { path: '/dashboard/owner', element: <OwnerDashboard /> },
      { path: '/dashboard/salon', element: <SalonDashboard /> },
      { path: '/dashboard/supplier', element: <SupplierDashboard /> },
      { path: '/dashboard/other', element: <OtherDashboard /> },
      { path: '/product-promotions', element: <ProductPromotions /> },
      { path: '/messages', element: <MessageIndex /> },
      { path: '/welcome', element: <Welcome /> },
      { path: '/analysis', element: <Analysis /> },
      { path: '/posting', element: <PostingIndex /> },
      { path: '/posting/job', element: <JobPost /> },
      { path: '/posting/salon', element: <SalonPost /> },
      { path: '/posting/booth', element: <BoothPost /> }
    ]
  }
])

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="emvi-theme">
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
