const { AuthenticationError } = require('apollo-server-express');
const { Movie, User } = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        movie: async (parent, { movieId }) => {
            return Movie.findOne({_id: movieId});
        },

        movies: async (parent, { email }) => {
            return User.find({email});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('favourite_movies');
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
            const existingUser = await User.findOne({email})
            if (existingUser) {
                // add logic if user exisits
                throw new Error('Email exists');
            }
            else {
                const user = await User.create({ email, password });
                const token = signToken(user);
                return { token, user };
            }
            
        },

        addMovie: async (parent, { title, name, rating, year, plot, image}, context) => {
            if (context.user) {
                if (name &&
                    title &&
                    image &&
                    rating &&
                    plot &&
                    year
                    ) {
                        const movie = await Movie.create({
                            name: name,
                            title: title,
                            image: image,
                            rating: rating,
                            plot: plot,
                            year: year,
                            
                        });
                        await User.findOneAndUpdate(
                            { _id: context.user._id},
                            {
                                $addToSet: {
                                    favourite_movies: movie,
                                }
                            },
                        );
                        //
                        return movie;
                    }
    
                throw new Error('Wrong data input');
            }
            throw new AuthenticationError('You need to be logged in!');
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
        },

        deleteFavouriteMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                return User.findOneAndDelete(
                    { _id: context.user._id },
                    {
                        $pull: {
                            favourite_movies: {
                                _id: movieId,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;