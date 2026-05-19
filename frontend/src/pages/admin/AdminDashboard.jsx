/* eslint-disable react-hooks/immutability, react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  Download,
  Activity,
  Trophy,
  Medal,
  Award
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { DashboardLayout } from "../../Components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "../../Components/ui/Card";
import { Badge } from "../../Components/ui/Badge";
import { ProgressBar } from "../../Components/ui/Progress";
import { Button } from "../../Components/ui/Button";
import API from "../../services/api";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalGoals: 0,
    completedGoals: 0,
    pendingGoals: 0,
    averageProgress: 0,
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const dashboardRef = useRef();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/goals/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);

      const leaderboardResponse = await API.get("/goals/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(leaderboardResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    try {
      toast.loading("Generating PDF...", { id: "pdf" });
      const input = dashboardRef.current;
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Temporarily add a solid background for PDF rendering if glassmorphism causes issues
      input.classList.add("bg-neutral-900");

      const canvas = await html2canvas(input, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#111827",
      });

      input.classList.remove("bg-neutral-900");

      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
      pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("Enterprise_Executive_Report.pdf");

      toast.success("PDF Exported Successfully!", { id: "pdf" });
    } catch (error) {
      console.log(error);
      toast.error("PDF Export Failed", { id: "pdf" });
    }
  }

  const pieData = [
    { name: "Completed", value: analytics.completedGoals },
    { name: "Pending", value: analytics.pendingGoals },
  ];

  const trendData = [
    { month: "Jan", progress: 20 },
    { month: "Feb", progress: 35 },
    { month: "Mar", progress: 50 },
    { month: "Apr", progress: 70 },
    { month: "May", progress: analytics.averageProgress || 85 },
  ];

  const COLORS = ["#10b981", "#6366f1"]; // Success Green, Primary Indigo

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel bg-white/90 dark:bg-neutral-900/90 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-xl">
          <p className="font-bold text-neutral-800 dark:text-neutral-200">{label}</p>
          <p className="text-primary-600 dark:text-primary-400 font-semibold">
            Progress: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-20 z-0"></div>

      <div ref={dashboardRef} className="relative z-10 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2 font-display">
                Executive Command
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                Enterprise performance intelligence and analytics.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">System Health</span>
                <span className="text-success-500 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse-slow"></span>
                  Optimal
                </span>
              </div>
              <Button
                variant="primary"
                icon={Download}
                onClick={downloadPDF}
                className="shadow-primary-500/25 shadow-lg"
              >
                Export PDF Report
              </Button>
            </div>
          </motion.div>

          {/* KPI Bento Box */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 magic-border group">
              <CardContent className="p-6 relative z-10 bg-white dark:bg-neutral-900 rounded-xl transition-colors group-hover:bg-primary-50/50 dark:group-hover:bg-primary-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Total Enterprise Goals</p>
                    <h3 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">
                      {analytics.totalGoals}
                    </h3>
                  </div>
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                    <Target size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 group">
              <CardContent className="p-6 relative z-10 transition-colors group-hover:bg-success-50/50 dark:group-hover:bg-success-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Goals Completed</p>
                    <h3 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">
                      {analytics.completedGoals}
                    </h3>
                  </div>
                  <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-xl text-success-600 dark:text-success-400">
                    <CheckCircle size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 group">
              <CardContent className="p-6 relative z-10 transition-colors group-hover:bg-warning-50/50 dark:group-hover:bg-warning-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Pending Review</p>
                    <h3 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">
                      {analytics.pendingGoals}
                    </h3>
                  </div>
                  <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-xl text-warning-600 dark:text-warning-400">
                    <Clock size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-0 bg-white/60 dark:bg-neutral-900/60 group">
              <CardContent className="p-6 relative z-10 transition-colors group-hover:bg-accent-50/50 dark:group-hover:bg-accent-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Company Avg Progress</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">
                        {analytics.averageProgress}
                      </h3>
                      <span className="text-xl font-bold text-neutral-500">%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-xl text-accent-600 dark:text-accent-400">
                    <TrendingUp size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Area Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="glass-panel border-0 h-full">
                <CardHeader className="border-b border-neutral-100 dark:border-neutral-800/50">
                  <div className="flex items-center gap-2">
                    <Activity className="text-primary-500" size={24} />
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Performance Velocity</h2>
                      <p className="text-sm text-neutral-500">Monthly aggregate KPI growth</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="progress"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorProgress)"
                        activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pie Chart */}
            <motion.div variants={itemVariants}>
              <Card className="glass-panel border-0 h-full">
                <CardHeader className="border-b border-neutral-100 dark:border-neutral-800/50">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Distribution</h2>
                  <p className="text-sm text-neutral-500">Completion vs Pending</p>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center h-[350px]">
                  {analytics.totalGoals > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-4 text-center">
                        <div className="text-4xl font-display font-bold text-success-500">
                          {Math.round((analytics.completedGoals / analytics.totalGoals) * 100)}%
                        </div>
                        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1">Completion Rate</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-neutral-400">
                      <Target size={48} className="mb-4 opacity-50" />
                      <p>No goal data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Leaderboard */}
          <motion.div variants={itemVariants}>
            <Card className="glass-panel border-0">
              <CardHeader className="border-b border-neutral-100 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Trophy className="text-warning-500" size={24} />
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Top Performers</h2>
                    <p className="text-sm text-neutral-500">Enterprise employee intelligence ranking</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-12 text-center text-neutral-500 animate-pulse">Analyzing employee performance...</div>
                ) : leaderboard.length === 0 ? (
                  <div className="p-12 text-center text-neutral-500">No employee data found.</div>
                ) : (
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                    {leaderboard.map((item, index) => (
                      <div key={index} className="p-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 font-bold text-xl">
                          {index === 0 ? <Trophy className="text-warning-500" /> :
                            index === 1 ? <Medal className="text-neutral-400" /> :
                              index === 2 ? <Award className="text-amber-700 dark:text-amber-600" /> :
                                <span className="text-neutral-500">#{index + 1}</span>}
                        </div>

                        {/* Name */}
                        <div className="w-48 flex-shrink-0">
                          <h4 className="font-bold text-neutral-900 dark:text-white text-lg">{item.employee}</h4>
                          <p className="text-sm text-neutral-500">Employee Score</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex-1 w-full max-w-md">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">KPI Alignment</span>
                            <span className="font-bold text-neutral-900 dark:text-white">{item.progress}%</span>
                          </div>
                          <ProgressBar
                            value={item.progress}
                            max={100}
                            color={item.progress >= 80 ? "success" : item.progress >= 50 ? "warning" : "danger"}
                            animated={false}
                          />
                        </div>

                        {/* Badge Status */}
                        <div className="flex-shrink-0 md:ml-auto">
                          <Badge
                            variant={item.progress >= 80 ? "success" : item.progress >= 50 ? "warning" : "danger"}
                            className="px-4 py-2 text-sm uppercase tracking-wider"
                          >
                            {item.progress >= 80 ? "Excellent" : item.progress >= 50 ? "Good" : "Needs Work"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;