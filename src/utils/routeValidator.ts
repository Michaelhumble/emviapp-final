
import { router } from "../routes";

export const validateRoute = (path: string): boolean => {
  const routes = router.routes;
  return routes.some(route => route.path === path);
};

export const getValidRoutes = (): string[] => {
  return router.routes.map(route => route.path || '/');
};
