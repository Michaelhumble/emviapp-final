
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ChooseRole from "./pages/auth/ChooseRole";
import Dashboard from "./pages/dashboard/Dashboard";
import Artist from "./pages/dashboard/Artist";
import Salon from "./pages/dashboard/Salon";
import Customer from "./pages/dashboard/Customer";
import Owner from "./pages/dashboard/Owner";
import Freelancer from "./pages/dashboard/Freelancer";
import Supplier from "./pages/dashboard/Supplier";
import Other from "./pages/dashboard/Other";
import Manager from "./pages/dashboard/Manager";
import ProfileEdit from "./pages/profile/ProfileEdit";
import PostJob from "./pages/PostJob";
import { ExpiredPostJob } from "./pages/ExpiredPostJob";
import PostJobExperimental from "./pages/PostJobExperimental";
import { SalonListing } from "./pages/SalonListing";
import { ArtistProfile } from "./pages/ArtistProfile";
import { JobDetail } from "./pages/JobDetail";
import { JobsPage } from "./pages/JobsPage";
import { SalonsPage } from "./pages/SalonsPage";
import { ArtistsPage } from "./pages/ArtistsPage";
import { MessagesPage } from "./pages/MessagesPage";
import AuthGuard from "./components/auth/AuthGuard";
// REFACTOR: Removed imports for deleted ProfileRedirect and AuthRedirect components
// These were duplicate redirect logic - now using unified DashboardRedirector only

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/choose-role",
    element: <ChooseRole />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  // REFACTOR: Removed /profile redirect route - was using deleted ProfileRedirect component
  // Dashboard now handles all role-based redirection through unified DashboardRedirector
  {
    path: "/dashboard/artist",
    element: (
      <AuthGuard>
        <Artist />
      </AuthGuard>
    ),
  },
  // REFACTOR: Removed /auth redirect route - was using deleted AuthRedirect component  
  // Authentication flow now handled through unified auth context and DashboardRedirector
  {
    path: "/dashboard/salon",
    element: (
      <AuthGuard>
        <Salon />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/customer",
    element: (
      <AuthGuard>
        <Customer />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/owner",
    element: (
      <AuthGuard>
        <Owner />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/freelancer",
    element: (
      <AuthGuard>
        <Freelancer />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/supplier",
    element: (
      <AuthGuard>
        <Supplier />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/other",
    element: (
      <AuthGuard>
        <Other />
      </AuthGuard>
    ),
  },
  {
    path: "/dashboard/manager",
    element: (
      <AuthGuard>
        <Manager />
      </AuthGuard>
    ),
  },
  {
    path: "/profile/edit",
    element: (
      <AuthGuard>
        <ProfileEdit />
      </AuthGuard>
    ),
  },
  {
    path: "/post-job",
    element: (
      <AuthGuard>
        <PostJob />
      </AuthGuard>
    ),
  },
  {
    path: "/post-job-experimental",
    element: (
      <AuthGuard>
        <PostJobExperimental />
      </AuthGuard>
    ),
  },
  {
    path: "/expired-post-job",
    element: <ExpiredPostJob />,
  },
  {
    path: "/salon/:id",
    element: <SalonListing />,
  },
  {
    path: "/artist/:id",
    element: <ArtistProfile />,
  },
  {
    path: "/job/:id",
    element: <JobDetail />,
  },
  {
    path: "/jobs",
    element: <JobsPage />,
  },
  {
    path: "/salons",
    element: <SalonsPage />,
  },
  {
    path: "/artists",
    element: <ArtistsPage />,
  },
  {
    path: "/messages",
    element: (
      <AuthGuard>
        <MessagesPage />
      </AuthGuard>
    ),
  },
]);
