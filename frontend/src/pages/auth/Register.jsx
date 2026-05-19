import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Users, Briefcase, ArrowRight } from "lucide-react";

import API from "../../services/api";
import { Input } from "../../Components/ui/Input";
import { Button } from "../../Components/ui/Button";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/register", formData);
      toast.success(response.data.message || "Account created successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Visual helper for Role Selection
  const roleOptions = [
    { value: "employee", label: "Employee", icon: Users, desc: "Track personal goals" },
    { value: "manager", label: "Manager", icon: Briefcase, desc: "Manage a team" },
    { value: "admin", label: "Admin", icon: ShieldCheck, desc: "Full system access" }
  ];

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900 overflow-hidden">

      {/* LEFT SIDE: HERO PRESENTATION */}
      <div className="hidden lg:flex w-1/2 relative bg-neutral-900 overflow-hidden flex-col justify-center items-center p-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-600/30 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary-600/20 blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg"
        >
          <div className="glass-panel bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-8 text-white shadow-lg">
              <Target size={40} />
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-4">
              Join AtomQuest
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Transform the way you work. Set audacious goals, achieve flow state, and unlock your ultimate potential.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><ShieldCheck size={16} className="text-success-400" /></div>
                <span>Bank-grade secure encryption</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Users size={16} className="text-primary-400" /></div>
                <span>Seamless team collaboration</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: REGISTRATION FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 overflow-y-auto">
        <div className="absolute inset-0 lg:hidden z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-400/20 blur-[80px] z-0"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md relative z-10 my-8"
        >
          <div className="lg:hidden flex justify-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl text-white">
              <Target size={32} />
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400">
              Start your journey to peak productivity today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Custom Role Selector */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-2">
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((role) => (
                  <div
                    key={role.value}
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    className={`cursor-pointer flex items-center p-4 rounded-xl border-2 transition-all ${formData.role === role.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'
                      }`}
                  >
                    <div className={`p-2 rounded-lg mr-4 ${formData.role === role.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                      }`}>
                      <role.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${formData.role === role.value ? 'text-primary-700 dark:text-primary-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
                        {role.label}
                      </h4>
                      <p className="text-xs text-neutral-500">{role.desc}</p>
                    </div>
                    {/* Hidden input to ensure form submission logic remains intact */}
                    <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={handleChange} className="hidden" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg font-bold shadow-primary-500/25 shadow-xl"
                isLoading={loading}
                icon={ArrowRight}
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-neutral-500 dark:text-neutral-400 mt-8 pb-8"
          >
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </div>

    </div>
  );
}

export default Register;