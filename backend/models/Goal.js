const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  target: {
    type: Number,
    required: true,
  },

  weightage: {
    type: Number,
    required: true,
  },

  
  achievement: {
  type: Number,
  default: 0,
},

progress: {
  type: Number,
  default: 0,
},

status: {
  type: String,
  default: "Not Started",
},
managerStatus: {
  type: String,
  default: "Pending",
},

managerComment: {
  type: String,
  default: "",
},
employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, {
  timestamps: true,
});

module.exports =
  mongoose.model("Goal", goalSchema);