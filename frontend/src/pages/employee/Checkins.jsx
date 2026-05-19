import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Target, TrendingUp, Save } from "lucide-react";

import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { Card, CardContent } from "../../Components/ui/Card";
import { Badge } from "../../Components/ui/Badge";
import { ProgressBar } from "../../Components/ui/Progress";
import { Input, Textarea } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import toast from "react-hot-toast";

function Checkins() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD GOALS
  useEffect(() => {
    // Simulate slight loading delay for skeleton/animation
    setTimeout(() => {
      const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGoals(savedGoals);
      setLoading(false);
    }, 400);
  }, []);

  // UPDATE ACHIEVEMENT
  function updateAchievement(index, value) {
    const updatedGoals = [...goals];
    updatedGoals[index].achievement = Number(value);

    // CALCULATE PROGRESS
    updatedGoals[index].progress = Math.min(
      100,
      Math.round((Number(value) / Number(updatedGoals[index].target)) * 100)
    );

    // STATUS
    if (updatedGoals[index].progress >= 100) {
      updatedGoals[index].status = "Completed";
    } else if (updatedGoals[index].progress > 0) {
      updatedGoals[index].status = "On Track";
    } else {
      updatedGoals[index].status = "Not Started";
    }

    setGoals(updatedGoals);
  }

  // UPDATE REMARK
  function updateRemark(index, value) {
    const updatedGoals = [...goals];
    updatedGoals[index].remark = value;
    setGoals(updatedGoals);
  }

  // SAVE CHANGES
  function handleSave(index) {
    localStorage.setItem("goals", JSON.stringify(goals));
    toast.success("Check-in saved successfully! ✅");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display">
              Quarterly Check-ins
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Log your achievements and update your milestone progress.
            </p>
          </div>
          <div className="p-3 bg-white/60 dark:bg-neutral-900/60 glass-panel rounded-xl">
            <ClipboardCheck size={28} className="text-primary-500" />
          </div>
        </motion.div>

        {/* GOALS LIST */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 h-[400px] animate-pulse" />
              ))}
            </motion.div>
          ) : goals.length === 0 ? (
            <motion.div key="empty" variants={itemVariants} className="flex flex-col items-center justify-center p-16 text-center">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-neutral-400" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">No Active Goals</h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                You haven't set any goals yet. Head over to the Goals page to create your first quarterly objective.
              </p>
            </motion.div>
          ) : (
            <motion.div key="content" className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <motion.div key={index} variants={itemVariants} className="magic-border rounded-2xl group">
                  <Card className="glass-panel border-0 bg-white/70 dark:bg-neutral-900/70 h-full hover:bg-white/90 dark:hover:bg-neutral-900/90 transition-colors">
                    <CardContent className="p-8 flex flex-col h-full">
                      
                      {/* Title & Status */}
                      <div className="flex justify-between items-start mb-8 gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 font-display">
                            {goal.title}
                          </h2>
                          <div className="flex items-center gap-2 text-neutral-500 font-medium">
                            <Target size={16} className="text-primary-500"/> 
                            Target: <span className="text-neutral-900 dark:text-white font-bold">{goal.target}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            goal.status === "Completed" ? "success" : 
                            goal.status === "On Track" ? "warning" : "neutral"
                          }
                          className="px-3 py-1 shadow-sm"
                        >
                          {goal.status || "Not Started"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-1">
                        {/* Achievement Input */}
                        <div className="space-y-4">
                          <Input
                            label="Current Achievement"
                            type="number"
                            placeholder={`e.g. ${Math.round(goal.target / 2)}`}
                            value={goal.achievement || ""}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                            icon={TrendingUp}
                          />
                          
                          {/* Progress Visual */}
                          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800">
                            <div className="flex justify-between mb-3">
                              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Completion</span>
                              <span className="font-bold text-primary-600 dark:text-primary-400 text-lg leading-none">
                                {goal.progress || 0}%
                              </span>
                            </div>
                            <ProgressBar 
                              value={goal.progress || 0} 
                              max={100} 
                              color={goal.progress >= 100 ? "success" : "primary"}
                              className="h-3 shadow-inner" 
                            />
                          </div>
                        </div>

                        {/* Remark Textarea */}
                        <div className="h-full flex flex-col">
                          <Textarea
                            label="Quarterly Remarks"
                            placeholder="Detail your progress, blockers, or key wins..."
                            value={goal.remark || ""}
                            onChange={(e) => updateRemark(index, e.target.value)}
                            className="flex-1 min-h-[120px]"
                          />
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                        <Button
                          variant="primary"
                          icon={Save}
                          onClick={() => handleSave(index)}
                          className="px-8 shadow-lg shadow-primary-500/20"
                        >
                          Save Check-in
                        </Button>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}

export default Checkins;