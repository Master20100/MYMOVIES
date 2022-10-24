const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    year: {
        type: String,
        require: true,
    },
    rating: {
        type: String,
        require: true,
    },
    trailer: {
        type: String,
    },
    live_stream_url: {
        type: String,   
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;