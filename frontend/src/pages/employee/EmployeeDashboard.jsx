import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { StatCard } from "../../Components/common/StatCard";
import { Card, CardContent, CardHeader } from "../../Components/ui/Card";
import { ProgressBar } from "../../Components/ui/Progress";
import { Badge } from "../../Components/ui/Badge";
import { useGoals } from "../../hooks/useGoals";

// New Hackathon Features
import { AIAssistant } from "../../features/AIAssistant";
import { PomodoroTimer } from "../../features/PomodoroTimer";
import { GamificationStats } from "../../features/GamificationStats";
import { DemoModeToggle } from "../../features/DemoModeToggle";

/**
 * Premium AI-Powered Employee Dashboard (Hackathon Version)
 */
function EmployeeDashboard() {
  const { goals } = useGoals();
  const [demoActive, setDemoActive] = useState(false);
  
  const displayGoals = demoActive 
    ? [
        { _id: '1', title: 'Q3 Product Launch', target: 'Complete Beta', weightage: 40, status: 'In Progress', progress: 65 },
        { _id: '2', title: 'Code Refactoring', target: 'Zero Tech Debt', weightage: 30, status: 'Completed', progress: 100 },
        { _id: '3', title: 'Team Mentoring', target: 'Onboard 2 Devs', weightage: 30, status: 'In Progress', progress: 40 }
      ]
    : goals;
    
  const completed = displayGoals.filter((g) => g.status === "Completed").length;
  const progressSum = displayGoals.reduce((sum, g) => sum + (g.progress || 0), 0);
  const avgProgress = displayGoals.length > 0 ? Math.round(progressSum / displayGoals.length) : 0;

  const analytics = {
    totalGoals: displayGoals.length,
    completedGoals: completed,
    pendingGoals: displayGoals.length - completed,
    averageProgress: avgProgress,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <DashboardLayout>
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-20 z-0"></div>
      <div className="hero-glow"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display tracking-tight">
              Command Center
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Your AI-powered productivity hub.
            </p>
          </div>
          <DemoModeToggle onDemoActivate={() => setDemoActive(true)} />
        </motion.div>

        {/* Bento Box Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Column (Left - 8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="magic-border rounded-2xl bg-white dark:bg-neutral-900">
                <StatCard title="Total Goals" value={analytics.totalGoals} icon={Target} color="primary" />
              </div>
              <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <StatCard title="Completed" value={analytics.completedGoals} icon={CheckCircle2} color="success" />
              </div>
              <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <StatCard title="In Progress" value={analytics.pendingGoals} icon={Clock} color="warning" />
              </div>
              <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                <StatCard title="Avg. Progress" value={`${analytics.averageProgress}%`} icon={TrendingUp} color="accent" />
              </div>
            </motion.div>

            {/* Goals Overview */}
            <motion.div variants={itemVariants}>
              <Card className="glass-panel overflow-hidden border-0">
                <CardHeader className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50 flex justify-between items-center py-4 px-6">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Zap size={20} className="text-accent-500" />
                    Active Objectives
                  </h2>
                  <Badge variant="primary" className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    {displayGoals.length} Items
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  {displayGoals.length > 0 ? (
                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                      {displayGoals.slice(0, 5).map((goal, idx) => (
                        <motion.div
                          key={goal._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ backgroundColor: "var(--tw-colors-neutral-50)", dark: { backgroundColor: "var(--tw-colors-neutral-800)" } }}
                          className="p-6 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-neutral-900 dark:text-white text-lg">
                                {goal.title}
                              </h3>
                              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                Target: {goal.target}
                              </p>
                            </div>
                            <Badge variant={goal.status === "Completed" ? "success" : "warning"}>
                              {goal.status || "In Progress"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <ProgressBar
                                value={goal.progress || 0}
                                max={100}
                                color={goal.status === "Completed" ? "success" : "accent"}
                                animated={goal.status !== "Completed"}
                                className="h-2.5 rounded-full"
                              />
                            </div>
                            <span className="text-sm font-semibold w-10 text-right">{goal.progress || 0}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 px-6">
                      <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-100 dark:border-primary-800/30">
                        <Award className="text-primary-500" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">All clear!</h3>
                      <p className="text-neutral-500 mt-2">Create new goals or load demo data to see the magic.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

          </div>
          
          {/* Sidebar Column (Right - 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div variants={itemVariants}>
              <GamificationStats />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <PomodoroTimer />
            </motion.div>
          </div>
          
        </div>
      </motion.div>
      
      {/* Floating AI Assistant Widget */}
      <AIAssistant />
    </DashboardLayout>
  );
}

export default EmployeeDashboard;