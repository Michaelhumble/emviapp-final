
import { Users } from "lucide-react";
import { User } from "../../types/admin";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="subtle-enter">
      <div className="flex items-center mb-4">
        <Users size={20} className="text-purple-400 mr-2" />
        <h2 className="text-xl font-medium">All Users</h2>
      </div>
      
      {users.length > 0 ? (
        <div className="bg-gray-800/60 rounded-xl border border-white/5 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-black/30 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-[120px] truncate">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-white">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm">
                      {user.role ? (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs">
                          {user.role}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/40 rounded-xl border border-white/5 p-8 text-center">
          <p className="text-gray-400">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
