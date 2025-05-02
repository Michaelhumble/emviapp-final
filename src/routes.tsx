
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "./pages/home";
import Index from "./pages/Index";
import ErrorPage from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import JobsPage from "./pages/jobs";
import SalonsPage from "./pages/salons/SalonsPage";
import VietnameseListingsPage from "./pages/vietnamese-listings/VietnameseListingsPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/salons",
    element: <SalonsPage />,
  },
  {
    path: "/vietnamese-listings",
    element: <VietnameseListingsPage />,
  }
];

export const router = createBrowserRouter(routes);
