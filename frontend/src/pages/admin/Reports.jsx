import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "../../Components/ui/Card";
import { Button } from "../../Components/ui/Button";

function Reports() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const reports = [
    { title: "Quarterly Performance", desc: "Aggregated goal completion rates across all departments.", icon: TrendingUp, color: "text-primary-500", bg: "bg-primary-100 dark:bg-primary-900/30" },
    { title: "Employee Engagement", desc: "Activity metrics, login frequencies, and app usage stats.", icon: Users, color: "text-success-500", bg: "bg-success-100 dark:bg-success-900/30" },
    { title: "System Health", desc: "API response times, error logs, and infrastructure uptime.", icon: Activity, color: "text-warning-500", bg: "bg-warning-100 dark:bg-warning-900/30" },
    { title: "Financial Forecast", desc: "Projected ROI based on milestone completion velocities.", icon: BarChart3, color: "text-accent-500", bg: "bg-accent-100 dark:bg-accent-900/30" },
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
              Analytics Center
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Generate and download comprehensive enterprise reports.
            </p>
          </div>
        </motion.div>

        {/* Reports Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="glass-panel border-0 hover:-translate-y-1 transition-transform duration-300 magic-border">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${report.bg} ${report.color}`}>
                    <report.icon size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{report.title}</h2>
                    <p className="text-neutral-500 dark:text-neutral-400">{report.desc}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 flex gap-3 border-t border-neutral-100 dark:border-neutral-800">
                  <Button variant="outline" className="flex-1" icon={FileText}>
                    Preview
                  </Button>
                  <Button variant="primary" className="flex-1" icon={Download}>
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Reports;