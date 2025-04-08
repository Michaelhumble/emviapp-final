
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ArtistProfilesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">View Artist Profiles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Browse through our database of qualified beauty professionals who are actively looking for new opportunities.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                  <div className="relative h-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">Jennifer Smith</h3>
                    <p className="text-xs text-gray-500 mb-2">Nail Artist • 5+ years exp</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Gel', 'Acrylic', 'Nail Art'].map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full hover:bg-primary/5">View Profile</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="hover:bg-primary/5">View All Artists</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtistProfilesSection;
