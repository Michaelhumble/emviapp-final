
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AboutPage from './About';

export const aboutRoutes: RouteObject[] = [
  {
    path: '/about',
    element: <AboutPage />,
  },
];
