export const DEFAULT_JOB_DURATION_DAYS = 30;

export const calculateExpirationDate = (createdAt: string, durationDays: number = DEFAULT_JOB_DURATION_DAYS): string => {
  const createdDate = new Date(createdAt);
  const expirationDate = new Date(createdDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));
  return expirationDate.toISOString();
};

export const isJobExpired = (expiresAt: string): boolean => {
  return new Date(expiresAt) < new Date();
};

export const getDaysUntilExpiration = (expiresAt: string): number => {
  const now = new Date();
  const expiration = new Date(expiresAt);
  const diffTime = expiration.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const shouldSendReminderEmail = (expiresAt: string, reminderDaysBefore: number): boolean => {
  const daysUntilExpiration = getDaysUntilExpiration(expiresAt);
  return daysUntilExpiration === reminderDaysBefore;
};

export const getExpirationStatus = (expiresAt: string) => {
  const daysUntilExpiration = getDaysUntilExpiration(expiresAt);
  
  if (daysUntilExpiration < 0) {
    return { status: 'expired', message: 'Expired', color: 'red' };
  } else if (daysUntilExpiration <= 3) {
    return { status: 'expiring-soon', message: `Expires in ${daysUntilExpiration} day${daysUntilExpiration !== 1 ? 's' : ''}`, color: 'yellow' };
  } else if (daysUntilExpiration <= 7) {
    return { status: 'expiring', message: `Expires in ${daysUntilExpiration} days`, color: 'orange' };
  } else {
    return { status: 'active', message: `${daysUntilExpiration} days remaining`, color: 'green' };
  }
};