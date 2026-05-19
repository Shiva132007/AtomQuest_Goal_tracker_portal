import { motion } from "framer-motion";
import { ShieldAlert, Key, UserPlus, FileEdit, LogIn, CalendarClock } from "lucide-react";
import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { Card, CardContent } from "../../Components/ui/Card";
import { Badge } from "../../Components/ui/Badge";

function AuditLogs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const logs = [
    { id: 1, action: "Authentication Failed", user: "Unknown IP (192.168.1.42)", time: "10 mins ago", type: "danger", icon: ShieldAlert },
    { id: 2, action: "Goal Promoted to Q3", user: "Alice Freeman", time: "1 hour ago", type: "primary", icon: FileEdit },
    { id: 3, action: "System Backup Completed", user: "System", time: "3 hours ago", type: "success", icon: Key },
    { id: 4, action: "New Manager Registered", user: "Diana Prince", time: "Yesterday", type: "warning", icon: UserPlus },
    { id: 5, action: "Bulk Data Export", user: "Bob Smith", time: "2 days ago", type: "primary", icon: LogIn },
  ];

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
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display">
              Audit Logs
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Real-time enterprise security and activity monitoring.
            </p>
          </div>
          <div className="p-3 bg-white/60 dark:bg-neutral-900/60 glass-panel rounded-xl text-neutral-500">
            <CalendarClock size={28} />
          </div>
        </motion.div>

        {/* Logs Timeline */}
        <motion.div variants={itemVariants}>
          <Card className="glass-panel border-0">
            <CardContent className="p-8">
              <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 space-y-10">
                {logs.map((log) => (
                  <div key={log.id} className="relative pl-8">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[21px] top-1 p-2 rounded-full border-4 border-white dark:border-neutral-900 bg-${log.type}-500 text-white shadow-lg`}>
                      <log.icon size={16} />
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white/50 dark:bg-neutral-900/50 rounded-xl p-5 border border-neutral-100 dark:border-neutral-800 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{log.action}</h3>
                        <Badge variant={log.type} className="w-fit">{log.time}</Badge>
                      </div>
                      <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                        Performed by: <span className="text-neutral-700 dark:text-neutral-300 font-bold">{log.user}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default AuditLogs;