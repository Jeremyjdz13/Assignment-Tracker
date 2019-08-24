const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
        firstName: 'William',
        lastName: 'Stryker',
        email: 'admin@email.com',
        password: bcrypt.hashSync('password', 10),
        admin: true
      },
    {
      firstName: 'Shazam',
      lastName: 'Zeus',
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My final project for the HTML & CSS course',
          link: 'somelink',
          grade:'Grade TBD'
        }
      ],
      admin: false
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})