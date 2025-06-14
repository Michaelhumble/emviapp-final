
import { UserRole } from "@/context/auth/types";

export const navigateToRoleDashboard = (navigate: any, role: UserRole) => {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    case 'vendor':
      navigate('/dashboard/vendor');
      break;
    case 'renter':
      navigate('/dashboard/renter');
      break;
    case 'manager':
      navigate('/dashboard/manager');
      break;
    case 'admin':
      navigate('/dashboard/admin');
      break;
    default:
      navigate('/dashboard/other');
  }
};

export const getPersonalizedGreeting = (userRole: UserRole | null, name: string) => {
  if (!userRole) return `Hello, ${name}!`;
  
  switch (userRole) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome back, ${name}! 💅`;
    case 'salon':
    case 'owner':
      return `Good to see you, ${name}! 🏢`;
    case 'customer':
      return `Hey there, ${name}! ✨`;
    case 'freelancer':
      return `Hello ${name}, ready to create? 🎨`;
    case 'supplier':
    case 'beauty supplier':
      return `Welcome ${name}! 📦`;
    case 'vendor':
      return `Hello ${name}! 🛍️`;
    case 'manager':
      return `Good day, ${name}! 👔`;
    case 'admin':
      return `Welcome back, ${name}! ⚙️`;
    default:
      return `Hello, ${name}!`;
  }
};
