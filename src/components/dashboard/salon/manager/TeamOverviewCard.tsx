
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTeamMembers } from "../../team/hooks/useTeamMembers";

export default function TeamOverviewCard() {
  const { teamMembers, loading } = useTeamMembers();

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-100 to-white border-0">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <Users className="h-6 w-6 text-purple-600" />
        <CardTitle className="text-lg sm:text-xl font-playfair">Team Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="mt-4 text-center text-gray-400">Loading team...</div>
        ) : teamMembers.length === 0 ? (
          <div className="mt-4 text-center text-gray-400">
            No staff members yet. Invite your team!
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <li key={member.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{member.full_name}</div>
                  <div className="text-xs text-gray-500 capitalize">{member.role.replace("_", " ")}</div>
                  {member.email && (
                    <div className="text-xs text-gray-400">{member.email}</div>
                  )}
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium
                    ${
                      member.status === "active"
                        ? "bg-green-50 text-green-600"
                        : member.status === "pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {member.status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
