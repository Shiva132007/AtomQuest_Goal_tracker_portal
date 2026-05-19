/**
 * Calculate productivity score based on goals
 */
export const calculateProductivityScore = (goals) => {
  if (goals.length === 0) return 0;

  const completedPercentage =
    (goals.filter((g) => g.status === "Completed").length / goals.length) * 100;

  const averageProgress =
    goals.reduce((sum, g) => sum + (g.progress || 0), 0) / goals.length;

  // Score = 50% from completion rate + 50% from average progress
  const score = completedPercentage * 0.5 + averageProgress * 0.5;

  return Math.round(score);
};

/**
 * Calculate daily streak based on check-ins
 */
export const calculateStreak = (checkins) => {
  if (!checkins || checkins.length === 0) return 0;

  const sortedCheckins = checkins
    .map((c) => new Date(c.date))
    .sort((a, b) => b - a);

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const checkinDate of sortedCheckins) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() - 1);

    if (
      checkinDate.getFullYear() === nextDate.getFullYear() &&
      checkinDate.getMonth() === nextDate.getMonth() &&
      checkinDate.getDate() === nextDate.getDate()
    ) {
      streak++;
      currentDate = nextDate;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Get achievements based on milestones
 */
export const getAchievements = (goals, checkins, score) => {
  const achievements = [];

  if (goals.filter((g) => g.status === "Completed").length >= 1) {
    achievements.push({
      id: "first_goal",
      title: "First Steps",
      description: "Complete your first goal",
      icon: "🎯",
      earned: true,
    });
  }

  if (goals.filter((g) => g.status === "Completed").length >= 5) {
    achievements.push({
      id: "goal_master",
      title: "Goal Master",
      description: "Complete 5 goals",
      icon: "🏆",
      earned: true,
    });
  }

  if (score >= 80) {
    achievements.push({
      id: "high_achiever",
      title: "High Achiever",
      description: "Score 80+ productivity points",
      icon: "⭐",
      earned: true,
    });
  }

  if (checkins && calculateStreak(checkins) >= 7) {
    achievements.push({
      id: "week_warrior",
      title: "Week Warrior",
      description: "Maintain 7-day check-in streak",
      icon: "🔥",
      earned: true,
    });
  }

  // Locked achievements
  if (goals.filter((g) => g.status === "Completed").length < 5) {
    achievements.push({
      id: "goal_master_locked",
      title: "Goal Master",
      description: "Complete 5 goals",
      icon: "🏆",
      earned: false,
      progress: goals.filter((g) => g.status === "Completed").length,
      total: 5,
    });
  }

  return achievements;
};
