import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import toast from "react-hot-toast";

export function DemoModeToggle({ onDemoActivate }) {
  const handleActivate = () => {
    onDemoActivate();
    toast.success("Demo Mode Activated! Loaded perfect hackathon data.", {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: '#1f2937',
        color: '#fff',
      },
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleActivate}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white rounded-xl shadow-lg font-medium text-sm border border-white/20"
    >
      <Trophy size={16} />
      <span>Load Demo Data</span>
      <Sparkles size={14} className="animate-pulse" />
    </motion.button>
  );
}
