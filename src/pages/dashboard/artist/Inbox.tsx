
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

export default function ArtistInbox() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-white via-purple-50 to-pink-50">
        <Card className="w-full max-w-md mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-[#f7f4fe] via-[#fbeffb] to-[#fff] border-0">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <span className="font-playfair text-2xl font-bold text-emvi-dark mb-4 text-center">Your full message inbox is coming soon!</span>
            <p className="text-gray-500 text-lg text-center">
              You'll soon be able to read, reply, and manage all client messages here.<br />
              Stay tuned for luxury in-app messaging.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
