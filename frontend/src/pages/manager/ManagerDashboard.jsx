import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Users, Activity, Target } from "lucide-react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/Progress";
import { Button } from "../../components/ui/Button";
import API from "../../services/api";
import toast from "react-hot-toast";

function ManagerDashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  async function fetchGoals() {
    try {
      const token = localStorage.getItem("token");
      // Mock data for demo if API fails, but try API first
      const response = await API.get("/goals/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedGoals = response.data || [];
      setGoals(fetchedGoals);
      
      setStats({
        total: fetchedGoals.length,
        pending: fetchedGoals.filter(g => g.managerStatus === "Pending" || !g.managerStatus).length,
        approved: fetchedGoals.filter(g => g.managerStatus === "Approved").length
      });
    } catch (error) {
      console.log(error);
      // Fallback to empty if not logged in or backend is down for demo
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGoals();
  }, []);

  async function reviewGoal(id, status) {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/goals/review/${id}`,
        {
          managerStatus: status,
          managerComment: status === "Approved" ? "Excellent progress" : "Needs improvement",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(`Goal ${status} successfully`);
      fetchGoals();
    } catch (error) {
      console.log(error);
      toast.error("Failed to review goal");
    }
  }

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
        className="space-y-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display">
              Team Overview
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Review and approve your team's objectives.
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl text-primary-600 dark:text-primary-400">
                <Users size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Total Team Goals</p>
                <h3 className="text-3xl font-bold">{stats.total}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 magic-border">
            <CardContent className="p-6 flex items-center gap-4 relative z-10 bg-white dark:bg-neutral-900 rounded-xl">
              <div className="p-4 bg-warning-100 dark:bg-warning-900/30 rounded-2xl text-warning-600 dark:text-warning-400">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Pending Reviews</p>
                <h3 className="text-3xl font-bold">{stats.pending}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-4 bg-success-100 dark:bg-success-900/30 rounded-2xl text-success-600 dark:text-success-400">
                <Activity size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Approved</p>
                <h3 className="text-3xl font-bold">{stats.approved}</h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals List */}
        <motion.div variants={itemVariants}>
          <Card className="glass-panel border-0 shadow-elevation">
            <CardHeader className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50 px-6 py-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Target className="text-primary-500" />
                Goals Requiring Action
              </h2>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-12 text-center animate-pulse text-neutral-400">Loading team data...</div>
              ) : goals.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="inline-block p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
                    <CheckCircle size={48} className="text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-300">All Caught Up!</h3>
                  <p className="text-neutral-500">No team goals currently require your review.</p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                  <AnimatePresence>
                    {goals.map((goal) => (
                      <motion.div
                        key={goal._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors flex flex-col md:flex-row md:items-center gap-6"
                      >
                        {/* Info Section */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-neutral-900 dark:text-white">
                              {goal.employee?.name || "Unknown Employee"}
                            </span>
                            <Badge variant={
                              goal.managerStatus === "Approved" ? "success" : 
                              goal.managerStatus === "Rejected" ? "danger" : "warning"
                            }>
                              {goal.managerStatus || "Pending"}
                            </Badge>
                          </div>
                          
                          <div>
                            <p className="text-neutral-600 dark:text-neutral-300 font-medium">{goal.title}</p>
                            <p className="text-sm text-neutral-500 mt-1">Target: {goal.target} | Weightage: {goal.weightage}%</p>
                          </div>

                          <div className="flex items-center gap-4 max-w-md">
                            <div className="flex-1">
                              <ProgressBar 
                                value={goal.progress || 0} 
                                max={100} 
                                color={goal.progress === 100 ? "success" : "primary"}
                                className="h-2"
                              />
                            </div>
                            <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 w-12 text-right">
                              {goal.progress || 0}%
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 md:flex-col lg:flex-row">
                          <Button 
                            variant="secondary"
                            onClick={() => reviewGoal(goal._id, "Approved")}
                            className="bg-success-50 text-success-700 hover:bg-success-100 dark:bg-success-900/20 dark:text-success-400 dark:hover:bg-success-900/40 border border-success-200 dark:border-success-800/50"
                            icon={CheckCircle}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="secondary"
                            onClick={() => reviewGoal(goal._id, "Rejected")}
                            className="bg-danger-50 text-danger-700 hover:bg-danger-100 dark:bg-danger-900/20 dark:text-danger-400 dark:hover:bg-danger-900/40 border border-danger-200 dark:border-danger-800/50"
                            icon={XCircle}
                          >
                            Reject
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default ManagerDashboard;