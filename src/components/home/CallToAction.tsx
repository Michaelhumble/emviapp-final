
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
          Ready to Grow Your Beauty Career?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto font-sans">
          Join thousands of beauty professionals and salons already using EmviApp to connect, grow, and succeed.
        </p>
        <Link to="/auth/signup">
          <Button size="lg" variant="secondary" className="font-medium px-8">
            Sign Up Free
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
