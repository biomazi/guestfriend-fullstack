const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    text: String,
    status: String,
  },
  {
    timestamps: true
  }
);

taskSchema.statics.methods = () => {
  const taskdata = `${this.text} ${this.status}`
}

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;