
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InternalNotesCard() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: Link with database for real note persistence if needed.
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-yellow-50 to-white border-0">
      <CardHeader className="flex flex-row items-center pb-2 gap-2">
        <MessageSquare className="h-6 w-6 text-yellow-500" />
        <CardTitle className="text-lg sm:text-xl font-playfair">Internal Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          value={note}
          placeholder="Write a note for your team or owner..."
          onChange={(e) => setNote(e.target.value)}
          className="w-full min-h-[56px] rounded-lg border border-yellow-100 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <Button
          size="sm"
          className="mt-3 rounded-lg min-h-[44px] font-medium bg-yellow-400 hover:bg-yellow-500 transition"
          onClick={handleSave}
          disabled={!note.trim()}
        >
          {saved ? "Saved!" : "Save Note"}
        </Button>
      </CardContent>
    </Card>
  );
}
