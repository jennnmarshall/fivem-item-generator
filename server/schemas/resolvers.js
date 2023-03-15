const { AuthenticationError } = require("apollo-server-express");
const { User, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    items: async (parent, { doclId }) => {
      return User.findOne({ doclId }).populate();
    },
  },

  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with these credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addItem: async (parent, { label, description, bizName, doclId }) => {
        const item = await Item.create({
          label,
          weight: 200,
          description,
          bizName,
          doclId,
          unique: false,
          stackable: true,
          type: "item"
        });

        return item;
      }
    },
  
};


module.exports = resolvers;
