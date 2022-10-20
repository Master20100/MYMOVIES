const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    rate: {
        type: Number,
        require: true,
        min: 1,
        max: 5,
    },
    trailer: {
        type: String,
        require: true,
    },
    live_stream_url: {
        type: String,
        require: true,
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;