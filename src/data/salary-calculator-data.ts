// Salary Calculator Static Data

export const CALCULATOR_ROLES = [
  'Nail Technician',
  'Hair Stylist',
  'Salon Manager',
  'Massage Therapist',
  'Barber',
  'Esthetician'
] as const;

export const CALCULATOR_CITIES = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'Charlotte, NC',
  'San Francisco, CA',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Nashville, TN',
  'Portland, OR',
  'Las Vegas, NV',
  'Miami, FL',
  'Atlanta, GA'
] as const;

// Average monthly income baselines (role + city)
// Used for comparison calculation
export const SALARY_BASELINES: Record<string, Record<string, number>> = {
  'Nail Technician': {
    'New York, NY': 3800,
    'Los Angeles, CA': 3600,
    'Chicago, IL': 3200,
    'Houston, TX': 2900,
    'Phoenix, AZ': 2800,
    'San Francisco, CA': 4200,
    'Seattle, WA': 3700,
    'Boston, MA': 3500,
    'Miami, FL': 3100,
    'Atlanta, GA': 2900
  },
  'Hair Stylist': {
    'New York, NY': 4200,
    'Los Angeles, CA': 4000,
    'Chicago, IL': 3500,
    'San Francisco, CA': 4600,
    'Seattle, WA': 4000,
    'Boston, MA': 3800,
    'Miami, FL': 3400,
    'Atlanta, GA': 3200
  },
  'Salon Manager': {
    'New York, NY': 5500,
    'Los Angeles, CA': 5200,
    'Chicago, IL': 4800,
    'San Francisco, CA': 6000,
    'Seattle, WA': 5300,
    'Boston, MA': 5100
  },
  'Massage Therapist': {
    'New York, NY': 4000,
    'Los Angeles, CA': 3800,
    'Chicago, IL': 3300,
    'Seattle, WA': 3900,
    'Boston, MA': 3700
  },
  'Barber': {
    'New York, NY': 3900,
    'Los Angeles, CA': 3700,
    'Chicago, IL': 3100,
    'Houston, TX': 2800,
    'Miami, FL': 3200
  },
  'Esthetician': {
    'New York, NY': 3700,
    'Los Angeles, CA': 3500,
    'San Francisco, CA': 4000,
    'Seattle, WA': 3600,
    'Boston, MA': 3400
  }
};

export function calculateMonthlyIncome(
  basePayPerHour: number,
  hoursPerWeek: number,
  avgTipsPerDay: number,
  commissionPercent: number
): {
  baseMonthly: number;
  tipsMonthly: number;
  commissionBonus: number;
  totalMonthly: number;
} {
  const weeksPerMonth = 4.33;
  const daysPerMonth = 30;
  
  const baseMonthly = basePayPerHour * hoursPerWeek * weeksPerMonth;
  const tipsMonthly = avgTipsPerDay * daysPerMonth;
  const subtotal = baseMonthly + tipsMonthly;
  const commissionBonus = subtotal * (commissionPercent / 100);
  const totalMonthly = subtotal + commissionBonus;
  
  return {
    baseMonthly: Math.round(baseMonthly),
    tipsMonthly: Math.round(tipsMonthly),
    commissionBonus: Math.round(commissionBonus),
    totalMonthly: Math.round(totalMonthly)
  };
}

export function getComparisonToAverage(
  role: string,
  city: string,
  calculatedIncome: number
): { percentDiff: number; higherOrLower: 'higher' | 'lower' } | null {
  const baseline = SALARY_BASELINES[role]?.[city];
  if (!baseline) return null;
  
  const percentDiff = ((calculatedIncome - baseline) / baseline) * 100;
  return {
    percentDiff: Math.abs(Math.round(percentDiff)),
    higherOrLower: percentDiff >= 0 ? 'higher' : 'lower'
  };
}
