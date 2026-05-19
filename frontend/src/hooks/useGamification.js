import { useState, useEffect } from "react";

export function useGamification() {
  const [stats, setStats] = useState({
    level: 5,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 12,
    rank: "Goal Achiever",
  });

  // Load from local storage for demo purposes if it exists
  useEffect(() => {
    const saved = localStorage.getItem("demoGamification");
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  const addXp = (amount) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const leveledUp = newXp >= prev.nextLevelXp;
      
      const newStats = {
        ...prev,
        xp: leveledUp ? newXp - prev.nextLevelXp : newXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        nextLevelXp: leveledUp ? Math.floor(prev.nextLevelXp * 1.5) : prev.nextLevelXp,
      };
      
      localStorage.setItem("demoGamification", JSON.stringify(newStats));
      return newStats;
    });
  };

  return { stats, addXp };
}
