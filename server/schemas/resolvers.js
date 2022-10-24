const { AuthenticationError } = require('apollo-server-express');
const { Movie, User } = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        movie: async (parent, { movieId }) => {
            return Movie.findOne({_id: movieId});
        },

        movies: async (parent, { username }) => {
            return User.find({username});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('movies');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email});

            if (!user) {
                throw new AuthenticationError('No user found with this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
        },

        addMovie: async (parent, { name, description, image, rate, trailer, live_stream_url}) => {
            if (name &&
                description &&
                image &&
                rate &&
                trailer &&
                live_stream_url) {
                    const movie = await Movie.create({
                        name: name,
                        description: description,
                        image: image,
                        rate: rate,
                        trailer: trailer,
                        live_stream_url: live_stream_url,
                    });
                    return movie;
                }

            throw new AuthenticationError('Wrong data input');
        },

        addFavouriteMovie: async (parent, {movieId}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id},
                    {
                        $addToSet: {
                            favourite_movies: {movieId},
                        }
                    },
                );
            };

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;