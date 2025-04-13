
import { ActionSuggestion } from "@/components/chat/ChatSystem";

export const getDefaultActions = (): ActionSuggestion[] => {
  return [
    {
      id: 'explore',
      label: 'Explore Artists',
      icon: 'users',
      href: '/artists'
    },
    {
      id: 'book',
      label: 'Book Service',
      icon: 'calendar',
      href: '/artists'
    },
    {
      id: 'jobs',
      label: 'Browse Jobs',
      icon: 'briefcase',
      href: '/jobs'
    }
  ];
};
