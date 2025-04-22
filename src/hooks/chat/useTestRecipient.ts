
import { useState, useEffect } from "react";

export interface Recipient {
  id: string;
  name: string;
  avatar?: string;
}

export const useTestRecipient = () => {
  const [testRecipient, setTestRecipient] = useState<Recipient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call to get a test recipient
    const fetchTestRecipient = async () => {
      try {
        setLoading(true);
        // This would be replaced with a real API call in production
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 80% chance to return a test recipient, 20% chance to return null
        // to simulate both cases for development
        if (Math.random() > 0.2) {
          setTestRecipient({
            id: "test-recipient-1",
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=32"
          });
        } else {
          setTestRecipient(null);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching test recipient:", err);
        setError(err instanceof Error ? err : new Error("Failed to load test recipient"));
      } finally {
        setLoading(false);
      }
    };

    fetchTestRecipient();
  }, []);

  return { testRecipient, loading, error };
};
