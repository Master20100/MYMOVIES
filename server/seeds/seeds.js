const db = require('../config/connection');
const { User} = require('../models');

db.once('open', async () => {

  await User.create({
    email: 'testq@testmail.com',
    password: 'password12345'
  });


  process.exit();
});