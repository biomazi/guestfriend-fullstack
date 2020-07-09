const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const Task = require('./models/task/Task.js');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/guestfriend', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose connected'));

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './graphql/types')), { all: true });
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './graphql/resolvers')));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, Task })
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.applyMiddleware({ app });

module.exports = app;
