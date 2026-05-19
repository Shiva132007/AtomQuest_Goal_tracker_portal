import { motion } from "framer-motion";
import { Card, CardContent } from "../Components/ui/Card";
import { Badge } from "../Components/ui/Badge";
import { getAchievements } from "./productivityUtils";

/**
 * Achievements Display Component
 */
export function AchievementsWidget({ goals, checkins }) {
  const achievements = getAchievements(goals, checkins);
  const earnedAchievements = achievements.filter((a) => a.earned);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
          🏅 Achievements ({earnedAchievements.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.slice(0, 8).map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? "bg-accent-50 dark:bg-accent-900/20 border-accent-300 dark:border-accent-600"
                  : "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="text-xs font-semibold text-center text-neutral-900 dark:text-white">
                {achievement.title}
              </p>
              {!achievement.earned && achievement.progress && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  {achievement.progress}/{achievement.total}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
