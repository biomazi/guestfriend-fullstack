module.exports = `
  type Task {
    id: ID!
    text: String
    status: String
    updatedAt: String
  }
  type Ok {
    ok: Boolean
    id: ID
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addTask(text: String!, status: String!): Task
    removeTask(id: ID!): Ok
    updateTask(id: ID!, text: String, status: String!): Task
  }
`;