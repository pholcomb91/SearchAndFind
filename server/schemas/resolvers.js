const { AuthenticationError } = require ('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select("-_v -password");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { body }, res) => {
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

            if (!user) {
                throw new AuthenticationError("Invalid credentials");
            }
            const correctPassword = await User.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError("Invalid Credentials");
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { user, body }, res) => {
            const updatedUser = User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body }},
                { new: true}
            )
            return updatedUser;
        },
        deleteBook: async (parent, { user, body }, res) => {
            const updatedUser = User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true}
            )
            return updatedUser;
        },
    }
}