
import { UserProfile } from "@/context/auth/types";

const getSentenceCase = (name?: string) =>
  name && name.length > 0
    ? name.charAt(0).toUpperCase() + name.slice(1).split(" ")[0].toLowerCase()
    : "Manager";

export default function ManagerGreetingHeader({ userProfile }: { userProfile: UserProfile | null }) {
  const name = getSentenceCase(userProfile?.full_name);
  return (
    <section className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-playfair font-semibold text-purple-800 tracking-tight mb-1">
        Welcome back, {name} <span role="img" aria-label="wave">👋</span>
      </h1>
      <div className="text-base sm:text-lg text-gray-600">
        Support your team and manage your salon. We’re here to help!
      </div>
    </section>
  );
}
