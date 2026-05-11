import React from "react";
import { Link } from "react-router-dom";

/**
 * HiringInYourCity
 * --------------------------------------------------------------
 * Homepage internal-linking module that helps Google (and humans)
 * understand EmviApp as a beauty-industry HIRING marketplace.
 *
 * - Mobile-first responsive grid (1 / 2 / 3 columns)
 * - Strong, transactional anchor text (no SEO spam styling)
 * - Each city links to its hiring hub + 3 high-intent role hubs
 * - Links target canonical URL pattern:
 *     /jobs/{citySlug}                (city hub — CityJobsLanding)
 *     /jobs/{roleSlug}/{citySlug}     (role+city — CityRoleJobLanding)
 *
 * Roles prioritized: nail technician (primary), hair stylist, barber.
 * Cities prioritized: top US metros with active beauty hiring demand.
 */

type CityLink = { city: string; state: string; slug: string };

const TOP_METROS: CityLink[] = [
  { city: "Houston", state: "TX", slug: "houston-tx" },
  { city: "Dallas", state: "TX", slug: "dallas-tx" },
  { city: "Austin", state: "TX", slug: "austin-tx" },
  { city: "San Antonio", state: "TX", slug: "san-antonio-tx" },
  { city: "Los Angeles", state: "CA", slug: "los-angeles-ca" },
  { city: "San Jose", state: "CA", slug: "san-jose-ca" },
  { city: "San Diego", state: "CA", slug: "san-diego-ca" },
  { city: "Atlanta", state: "GA", slug: "atlanta-ga" },
  { city: "Orlando", state: "FL", slug: "orlando-fl" },
  { city: "Tampa", state: "FL", slug: "tampa-fl" },
  { city: "Miami", state: "FL", slug: "miami-fl" },
  { city: "Charlotte", state: "NC", slug: "charlotte-nc" },
];

const ROLES = [
  { slug: "nail-technician", label: "Nail tech jobs" },
  { slug: "hair-stylist", label: "Hair stylist jobs" },
  { slug: "barber", label: "Barber jobs" },
];

const HiringInYourCity: React.FC = () => {
  return (
    <section
      aria-labelledby="hiring-in-your-city-heading"
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-10 text-center">
          <h2
            id="hiring-in-your-city-heading"
            className="text-3xl md:text-4xl font-display font-bold text-slate-900"
          >
            Beauty hiring in your city
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Browse open nail, hair, and barber positions in the top
            US metros. New roles posted by salon owners every week.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          role="list"
        >
          {TOP_METROS.map(({ city, state, slug }) => {
            const cityLabel = `${city}, ${state}`;
            return (
              <li
                key={slug}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  <Link
                    to={`/jobs/${slug}`}
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 rounded"
                  >
                    Beauty jobs in {cityLabel}
                  </Link>
                </h3>
                <ul className="space-y-1.5" role="list">
                  {ROLES.map((role) => (
                    <li key={role.slug}>
                      <Link
                        to={`/jobs/${role.slug}/${slug}`}
                        className="text-sm text-slate-600 hover:text-primary hover:underline underline-offset-2"
                      >
                        {role.label} in {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            See all beauty jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HiringInYourCity;
