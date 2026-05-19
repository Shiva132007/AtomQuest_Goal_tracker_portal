import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Zap, Shield, ArrowRight } from "lucide-react";

import API from "../../services/api";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("userRole", response.data.user.role);

      toast.success(response.data.message || "Welcome back! 👋");

      if (response.data.user.role === "employee") {
        navigate("/employee/dashboard");
      } else if (response.data.user.role === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900 overflow-hidden">

      {/* LEFT SIDE: HERO PRESENTATION (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-neutral-900 overflow-hidden flex-col justify-center items-center p-12">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary-600/30 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-600/20 blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 mb-8 shadow-2xl">
            <Target size={48} className="text-primary-400" />
          </div>
          <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Goal Tracking
            </span>
          </h1>
          <p className="text-neutral-400 text-lg mb-12">
            Accelerate your team's performance with AI-driven insights, gamified milestones, and premium productivity tools.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-sm font-medium backdrop-blur-sm">
              <Zap size={16} className="text-warning-400" /> Lightning Fast
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-sm font-medium backdrop-blur-sm">
              <Shield size={16} className="text-success-400" /> Enterprise Secure
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">

        {/* Mobile Background Elements */}
        <div className="absolute inset-0 lg:hidden z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 blur-[80px] z-0"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl">
              <Target size={32} className="text-primary-600 dark:text-primary-400" />
            </div>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg font-bold shadow-primary-500/25 shadow-xl"
                isLoading={loading}
                icon={ArrowRight}
              >
                Sign In to Workspace
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-neutral-500 dark:text-neutral-400 mt-8"
          >
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>

    </div>
  );
}

export default Login;