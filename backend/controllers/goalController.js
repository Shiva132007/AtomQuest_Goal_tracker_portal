const Goal = require("../models/Goal");

// CREATE GOAL

const createGoal = async (req, res) => {

  try {

    const {
      title,
      target,
      weightage,
    } = req.body;

    const goal =
      await Goal.create({

        title,

        target,

        weightage,

        employee: req.user.id,

      });

    res.status(201).json(goal);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// GET GOALS

const getGoals = async (req, res) => {

  try {

    const goals =
      await Goal.find({

        employee: req.user.id,

      });

    res.status(200).json(goals);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// DELETE GOAL

const deleteGoal = async (req, res) => {

  try {

    const goal =
      await Goal.findById(
        req.params.id
      );

    if (!goal) {

      return res.status(404).json({

        message: "Goal not found",

      });

    }

    await goal.deleteOne();

    res.status(200).json({

      message:
        "Goal deleted successfully",

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

//UPDTAE GOAL
// UPDATE GOAL

const updateGoal = async (req, res) => {

  try {

    const goal =
      await Goal.findById(
        req.params.id
      );

    if (!goal) {

      return res.status(404).json({

        message: "Goal not found",

      });

    }

    // UPDATE VALUES

    goal.achievement =
      req.body.achievement;

    goal.progress =
      req.body.progress;

    goal.status =
      req.body.status;

    await goal.save();

    res.status(200).json(goal);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};
const managerReviewGoal = async (req, res) => {

  try {

    const goal =
      await Goal.findById(
        req.params.id
      );

    if (!goal) {

      return res.status(404).json({

        message: "Goal not found",

      });

    }

    // MANAGER REVIEW

    goal.managerStatus =
      req.body.managerStatus;

    goal.managerComment =
      req.body.managerComment;

    await goal.save();

    res.status(200).json(goal);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};
const getAllGoals = async (req, res) => {

  try {

    const goals =
      await Goal.find()
        .populate(
          "employee",
          "name email"
        );

    res.status(200).json(goals);

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

const getAnalytics = async (req, res) => {

  try {

    const goals =
      await Goal.find();

    // TOTAL GOALS

    const totalGoals =
      goals.length;

    // COMPLETED GOALS

    const completedGoals =
      goals.filter(

        (goal) =>
          goal.status === "Completed"

      ).length;

    // PENDING GOALS

    const pendingGoals =
      goals.filter(

        (goal) =>
          goal.status !== "Completed"

      ).length;

    // AVERAGE PROGRESS

    const totalProgress =
      goals.reduce(

        (sum, goal) =>

          sum + (goal.progress || 0),

        0

      );

    const averageProgress =
      totalGoals > 0

        ? Math.round(
            totalProgress / totalGoals
          )

        : 0;

    res.status(200).json({

      totalGoals,

      completedGoals,

      pendingGoals,

      averageProgress,

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

const getLeaderboard = async (req, res) => {

  try {

    const goals =
      await Goal.find()

        .populate(
          "employee",
          "name"
        );

    const leaderboard =
      goals.map((goal) => ({

        employee:
          goal.employee?.name ||
          "Unknown",

        progress:
          goal.progress || 0,

        status:
          goal.status,

      }))

      .sort(
        (a, b) =>
          b.progress - a.progress
      );

    res.status(200).json(
      leaderboard
    );

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};
module.exports = {

  createGoal,

  getGoals,
  deleteGoal,
  updateGoal,
  managerReviewGoal,
  getAllGoals,
  getAnalytics,
  getLeaderboard,

};