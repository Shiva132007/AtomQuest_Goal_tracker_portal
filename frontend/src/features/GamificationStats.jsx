import { motion } from "framer-motion";
import { Zap, Target, Award, Flame } from "lucide-react";
import { Card, CardContent } from "../Components/ui/Card";
import { useGamification } from "../hooks/useGamification";

export function GamificationStats() {
  const { stats } = useGamification();
  const progressPercent = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <Card className="glass-panel overflow-hidden border-0 bg-gradient-to-br from-primary-900 via-neutral-900 to-accent-900 text-white shadow-elevation relative">
      <div className="absolute top-0 right-0 p-32 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-400 via-transparent to-transparent blur-3xl"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-display tracking-tight flex items-center gap-2">
              <Award className="text-yellow-400" />
              Level {stats.level} {stats.rank}
            </h3>
            <p className="text-neutral-300 text-sm mt-1">Keep pushing! You're in the top 15%.</p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center border border-white/10">
            <Flame size={24} className="text-orange-400 mb-1" />
            <span className="font-bold text-lg leading-none">{stats.streak}</span>
            <span className="text-[10px] text-neutral-300 uppercase tracking-wider">Day Streak</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-primary-300">XP Progress</span>
            <span>{stats.xp} / {stats.nextLevelXp} XP</span>
          </div>
          <div className="h-4 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-accent-400 relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="bg-primary-500/20 p-2 rounded-lg">
              <Target size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">Goals Met</p>
              <p className="font-bold">42</p>
            </div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="bg-accent-500/20 p-2 rounded-lg">
              <Zap size={20} className="text-accent-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">Prod. Score</p>
              <p className="font-bold">94%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
