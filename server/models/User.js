const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const Movie = require('./Movie');

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    favourite_movies: [Movie.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;