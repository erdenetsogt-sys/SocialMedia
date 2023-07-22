const PostResolvers = require("./posts");
const UserResolvers = require("./users");
const CommentResolvers = require("./comments");

module.exports = {
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...PostResolvers.Mutation,
    ...CommentResolvers.Mutation,
  },
};
