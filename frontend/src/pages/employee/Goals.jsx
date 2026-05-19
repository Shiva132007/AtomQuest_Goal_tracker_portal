import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, TrendingUp } from "lucide-react";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/Progress";
import { useGoals } from "../../hooks/useGoals";
import API from "../../services/api";
import toast from "react-hot-toast";

/**
 * Modern Goals Management Page
 */
function Goals() {
  const { goals, fetchGoals } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    target: "",
    weightage: "",
  });
  const [errors, setErrors] = useState({});

  const totalWeightage = goals.reduce(
    (sum, goal) => sum + Number(goal.weightage || 0),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.target || formData.target <= 0)
      newErrors.target = "Target must be greater than 0";
    if (!formData.weightage || formData.weightage < 10)
      newErrors.weightage = "Minimum weightage is 10%";
    if (totalWeightage + Number(formData.weightage) > 100) {
      newErrors.weightage = `Total weightage cannot exceed 100% (current: ${totalWeightage}%)`;
    }
    if (goals.length >= 8) newErrors.form = "Maximum 8 goals allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.post("/goals", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Goal created successfully! 🎯");
      setFormData({ title: "", target: "", weightage: "" });
      setShowForm(false);
      fetchGoals();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create goal";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Goal deleted successfully");
      fetchGoals();
    } catch (err) {
      toast.error("Failed to delete goal");
      console.error(err);
    }
  };

  const handleUpdateProgress = async (goalId, newAchievement) => {
    try {
      const token = localStorage.getItem("token");
      const goal = goals.find((g) => g._id === goalId);
      const progress = Math.min(100, (newAchievement / goal.target) * 100);

      await API.put(
        `/goals/${goalId}`,
        { achievement: newAchievement, progress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Progress updated! 📈");
      fetchGoals();
    } catch (err) {
      toast.error("Failed to update progress");
      console.error(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Goals
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Manage and track your quarterly goals
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={Plus}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Goal"}
          </Button>
        </motion.div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Create New Goal
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddGoal} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Goal Title"
                      name="title"
                      placeholder="e.g., Increase Sales by 20%"
                      value={formData.title}
                      onChange={handleChange}
                      error={errors.title}
                    />
                    <Input
                      label="Target Value"
                      name="target"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.target}
                      onChange={handleChange}
                      error={errors.target}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={`Weightage % (Available: ${100 - totalWeightage}%)`}
                      name="weightage"
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.weightage}
                      onChange={handleChange}
                      error={errors.weightage}
                    />
                  </div>

                  {errors.form && (
                    <div className="bg-danger-50 dark:bg-danger-900 border border-danger-200 dark:border-danger-700 rounded-lg p-3 text-danger-700 dark:text-danger-200 text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={loading}
                      className="flex-1"
                    >
                      Create Goal
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Goals List */}
        <motion.div className="space-y-4">
          {goals.length === 0 ? (
            <Card className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-primary-600 dark:text-primary-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    No Goals Yet
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    Create your first goal to start tracking!
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            goals.map((goal, idx) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="magic-border rounded-xl"
              >
                <Card hover className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 transition-all hover:bg-white/80 dark:hover:bg-neutral-900/80">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                            {goal.title}
                          </h3>
                          <Badge
                            variant={
                              goal.status === "Completed"
                                ? "success"
                                : "primary"
                            }
                          >
                            {goal.status || "In Progress"}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Weightage: <span className="font-semibold">{goal.weightage}%</span> • Target:{" "}
                          <span className="font-semibold">{goal.target}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition"
                        >
                          <Edit2 size={18} className="text-primary-600" />
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteGoal(goal._id)}
                          className="p-2 hover:bg-danger-100 dark:hover:bg-danger-900 rounded-lg transition"
                        >
                          <Trash2 size={18} className="text-danger-600" />
                        </motion.button>
                      </div>
                    </div>

                    <ProgressBar
                      value={goal.progress || 0}
                      max={100}
                      color={goal.status === "Completed" ? "success" : "primary"}
                      animated
                      className="mb-4"
                    />

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Update achievement"
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleUpdateProgress(goal._id, Number(e.target.value));
                            e.target.value = "";
                          }
                        }}
                        className="flex-1 h-9"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Weightage Info */}
        {goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Total Weightage Used
              </span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalWeightage / 100) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-primary"
                  />
                </div>
                <span className="font-semibold text-neutral-900 dark:text-white min-w-fit">
                  {totalWeightage}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default Goals;