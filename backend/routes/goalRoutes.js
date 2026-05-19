const express = require("express");

const router = express.Router();

const goalController =
  require("../controllers/goalController");

const authMiddleware =
  require("../middleware/authMiddleware");

// CREATE GOAL

router.post(
  "/",
  authMiddleware.protect,
  goalController.createGoal
);

// GET GOALS

router.get(
  "/",
  authMiddleware.protect,
  goalController.getGoals
);

router.delete(
  "/:id",
  authMiddleware.protect,
  goalController.deleteGoal
);

router.put(
  "/:id",
  authMiddleware.protect,
  goalController.updateGoal
);

router.put(
  "/review/:id",
  authMiddleware.protect,
  goalController.managerReviewGoal
);

router.get(
  "/all",
  authMiddleware.protect,
  goalController.getAllGoals
);

router.get(
  "/analytics",
  authMiddleware.protect,
  goalController.getAnalytics
);

router.get(
  "/leaderboard",
  authMiddleware.protect,
  goalController.getLeaderboard
);

module.exports = router;