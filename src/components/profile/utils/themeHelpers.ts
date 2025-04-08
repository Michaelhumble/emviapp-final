
// Role-based theming helper functions

type RoleThemeType = {
  gradient: string;
  textColor: string;
  accentColor: string;
  lightBg: string;
  patternClass: string;
  iconColor: string;
  borderColor: string;
  hoverColor: string;
};

export const getRoleTheme = (role?: string | null): RoleThemeType => {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
    case 'renter':
      return {
        gradient: 'from-purple-600 to-pink-500',
        textColor: 'text-purple-700',
        accentColor: 'bg-purple-600 hover:bg-purple-700',
        lightBg: 'from-purple-50 to-pink-50',
        patternClass: 'pattern-dots pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-4',
        iconColor: 'text-purple-500',
        borderColor: 'border-purple-200',
        hoverColor: 'hover:bg-purple-50'
      };
      
    case 'salon':
    case 'owner':
      return {
        gradient: 'from-blue-600 to-indigo-500',
        textColor: 'text-blue-700',
        accentColor: 'bg-blue-600 hover:bg-blue-700',
        lightBg: 'from-blue-50 to-indigo-50',
        patternClass: 'pattern-zigzag pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6',
        iconColor: 'text-blue-500',
        borderColor: 'border-blue-200',
        hoverColor: 'hover:bg-blue-50'
      };
      
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return {
        gradient: 'from-emerald-600 to-teal-500',
        textColor: 'text-emerald-700',
        accentColor: 'bg-emerald-600 hover:bg-emerald-700',
        lightBg: 'from-emerald-50 to-teal-50',
        patternClass: 'pattern-grid pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-4',
        iconColor: 'text-emerald-500',
        borderColor: 'border-emerald-200',
        hoverColor: 'hover:bg-emerald-50'
      };
      
    case 'freelancer':
      return {
        gradient: 'from-amber-500 to-yellow-500',
        textColor: 'text-amber-700',
        accentColor: 'bg-amber-600 hover:bg-amber-700',
        lightBg: 'from-amber-50 to-yellow-50',
        patternClass: 'pattern-diagonal-lines pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6',
        iconColor: 'text-amber-500',
        borderColor: 'border-amber-200',
        hoverColor: 'hover:bg-amber-50'
      };
      
    case 'customer':
      return {
        gradient: 'from-rose-500 to-pink-500',
        textColor: 'text-rose-700',
        accentColor: 'bg-rose-600 hover:bg-rose-700',
        lightBg: 'from-rose-50 to-pink-50',
        patternClass: 'pattern-diagonal-stripes pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6',
        iconColor: 'text-rose-500',
        borderColor: 'border-rose-200',
        hoverColor: 'hover:bg-rose-50'
      };
      
    default:
      return {
        gradient: 'from-gray-700 to-slate-700',
        textColor: 'text-gray-700',
        accentColor: 'bg-gray-600 hover:bg-gray-700',
        lightBg: 'from-gray-50 to-slate-50',
        patternClass: 'pattern-triangles pattern-white pattern-bg-transparent pattern-opacity-10 pattern-size-6',
        iconColor: 'text-gray-500',
        borderColor: 'border-gray-200',
        hoverColor: 'hover:bg-gray-50'
      };
  }
};

// Role-specific button styling
export const getRoleButtonStyle = (role?: string | null): string => {
  const theme = getRoleTheme(role);
  return theme.accentColor;
};

// Role-specific card styling
export const getRoleCardStyle = (role?: string | null): string => {
  const theme = getRoleTheme(role);
  return `bg-gradient-to-r ${theme.lightBg} border ${theme.borderColor}`;
};

// Get badge color based on role
export const getRoleBadgeStyle = (role?: string | null): string => {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return 'bg-purple-100 text-purple-800';
    case 'salon':
    case 'owner':
      return 'bg-blue-100 text-blue-800';
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return 'bg-emerald-100 text-emerald-800';
    case 'freelancer':
      return 'bg-amber-100 text-amber-800';
    case 'customer':
      return 'bg-rose-100 text-rose-800';
    case 'renter':
      return 'bg-violet-100 text-violet-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
