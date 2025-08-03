import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

interface RoutingConfirmation {
  destination: string;
  title: string;
  message: string;
  requiresAuth?: boolean;
}

export const useChatRouting = () => {
  const [pendingRoute, setPendingRoute] = useState<RoutingConfirmation | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const confirmRoute = useCallback((confirmation: RoutingConfirmation) => {
    setPendingRoute(confirmation);
  }, []);

  const executeRoute = useCallback(() => {
    if (!pendingRoute) return;

    // Check if auth is required but user is not logged in
    if (pendingRoute.requiresAuth && !user) {
      // Return false to indicate auth is needed
      return false;
    }

    // Minimize chat and navigate
    setIsMinimized(true);
    navigate(pendingRoute.destination);
    setPendingRoute(null);
    return true;
  }, [pendingRoute, user, navigate]);

  const cancelRoute = useCallback(() => {
    setPendingRoute(null);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const restoreChat = useCallback(() => {
    setIsMinimized(false);
  }, []);

  return {
    pendingRoute,
    isMinimized,
    confirmRoute,
    executeRoute,
    cancelRoute,
    minimizeChat,
    restoreChat
  };
};