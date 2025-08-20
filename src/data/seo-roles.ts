// SEO roles for programmatic artist pages
export const SEO_ROLES = [
  {
    id: 'nails',
    name: 'Nail',
    pluralName: 'Nail Artists',
    description: 'Professional nail technicians specializing in manicures, pedicures, nail art, and nail extensions.'
  },
  {
    id: 'hair',
    name: 'Hair',
    pluralName: 'Hair Stylists',
    description: 'Expert hair stylists offering cuts, color, styling, and specialized hair treatments.'
  },
  {
    id: 'barber',
    name: 'Barber',
    pluralName: 'Barbers',
    description: 'Professional barbers specializing in men\'s haircuts, beard grooming, and traditional barbering services.'
  },
  {
    id: 'lashes',
    name: 'Lash',
    pluralName: 'Lash Artists',
    description: 'Certified lash extension artists providing volume lashes, classic lashes, and lash lifts.'
  },
  {
    id: 'massage',
    name: 'Massage',
    pluralName: 'Massage Therapists',
    description: 'Licensed massage therapists offering therapeutic, relaxation, and specialized massage services.'
  },
  {
    id: 'skincare',
    name: 'Skincare',
    pluralName: 'Estheticians',
    description: 'Licensed estheticians providing facials, skin treatments, and professional skincare services.'
  }
] as const;

export type RoleId = typeof SEO_ROLES[number]['id'];