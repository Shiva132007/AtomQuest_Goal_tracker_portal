import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Brain, Coffee } from "lucide-react";
import { Card, CardContent } from "../Components/ui/Card";
import { usePomodoro } from "../hooks/usePomodoro";

export function PomodoroTimer() {
  const { timeLeft, isActive, mode, toggleTimer, resetTimer, setFocusMode, setBreakMode } = usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === "focus" 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <Card className="glass-panel overflow-hidden relative group">
      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br transition-colors duration-1000 ${mode === 'focus' ? 'from-primary-500 to-accent-500' : 'from-success-500 to-teal-500'}`}></div>
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {mode === 'focus' ? <Brain size={20} className="text-primary-500" /> : <Coffee size={20} className="text-success-500" />}
            {mode === 'focus' ? 'Deep Work Session' : 'Quick Break'}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={setFocusMode}
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${mode === 'focus' ? 'bg-primary-500 text-white shadow-md' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            >
              Focus
            </button>
            <button 
              onClick={setBreakMode}
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${mode === 'break' ? 'bg-success-500 text-white shadow-md' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            >
              Break
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Circular Progress */}
            <svg className="w-full h-full transform -rotate-90 absolute">
              <circle cx="96" cy="96" r="88" className="stroke-neutral-200 dark:stroke-neutral-800" strokeWidth="8" fill="transparent" />
              <motion.circle 
                cx="96" cy="96" r="88"
                strokeWidth="8" fill="transparent"
                strokeDasharray="552.92"
                strokeDashoffset={552.92 - (552.92 * progress) / 100}
                className={mode === 'focus' ? 'stroke-primary-500' : 'stroke-success-500'}
                strokeLinecap="round"
                animate={{ strokeDashoffset: 552.92 - (552.92 * progress) / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            
            <div className="text-center font-display">
              <div className="text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <p className="text-sm text-neutral-500 mt-1 uppercase tracking-widest">
                {isActive ? "Active" : "Paused"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTimer}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-elevation ${mode === 'focus' ? 'bg-primary-500 hover:bg-primary-600' : 'bg-success-500 hover:bg-success-600'}`}
            >
              {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
              className="w-14 h-14 rounded-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
            >
              <RotateCcw size={20} />
            </motion.button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
