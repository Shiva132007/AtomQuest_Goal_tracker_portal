import { useState } from "react";
import { motion } from "framer-motion";
import { Users as UsersIcon, Search, MoreVertical, Edit2, Trash2, ShieldCheck, Briefcase, User } from "lucide-react";
import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "../../Components/ui/Card";
import { Badge } from "../../Components/ui/Badge";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const users = [
    { id: 1, name: "Alice Freeman", email: "alice@atomquest.com", role: "admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@atomquest.com", role: "manager", status: "Active" },
    { id: 3, name: "Charlie Davis", email: "charlie@atomquest.com", role: "employee", status: "Inactive" },
    { id: 4, name: "Diana Prince", email: "diana@atomquest.com", role: "manager", status: "Active" },
    { id: 5, name: "Evan Wright", email: "evan@atomquest.com", role: "employee", status: "Active" },
  ];

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <ShieldCheck size={16} className="text-danger-500" />;
      case 'manager': return <Briefcase size={16} className="text-warning-500" />;
      default: return <User size={16} className="text-primary-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-20 z-0"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display">
              User Management
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Manage system access and enterprise roles.
            </p>
          </div>
          <Button variant="primary" icon={UsersIcon} className="shadow-lg shadow-primary-500/25">
            Invite New User
          </Button>
        </motion.div>

        {/* Toolbar */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-96">
            <Input 
              icon={Search} 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div variants={itemVariants}>
          <Card className="glass-panel border-0">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-md">
                    <th className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300">Employee Name</th>
                    <th className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300">Email Address</th>
                    <th className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300">Role</th>
                    <th className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300">Status</th>
                    <th className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-neutral-900 dark:text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-neutral-600 dark:text-neutral-400">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium capitalize">
                          {getRoleIcon(user.role)}
                          {user.role}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={user.status === "Active" ? "success" : "neutral"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-neutral-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Users;