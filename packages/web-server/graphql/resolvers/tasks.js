module.exports = {
  Query: {
    task: async (obj, args, ctx, info) => {
      const task = await ctx.Task.findById(args.id);
      return task;
    },
    tasks: async(obj, args, ctx, info) => {
      const tasks = await ctx.Task.find({});
      return tasks;
    },
  },
  Mutation: {
    addTask: async (obj, args, ctx, info) => {
      const { text, status } = args;
      const task = await ctx.Task.create({ text, status });
      return task;
    },
    removeTask: async (obj, args, ctx, info) => {
      const { id } = args;
      const ok = await ctx.Task.findByIdAndDelete(id);
      return { id };
    },
    updateTask: async (obj, args, ctx, info) => {
      const { id, text, status } = args;
      const task = await ctx.Task.findById(id);
      if (text) task.text = text;
      task.status = status;
      
      await task.save();
      return task;
    },
  },
}