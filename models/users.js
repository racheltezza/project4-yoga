/* 
 * Place all functions, classes, and/or DB schemas here for a single 
 * model.
 */

/* Step 1
 *
 * TODO: import mongoose connection
 * NOTE: skip this if you are not using mongoose
 *
 */
const mongoose = require('./connection.js')



/* Step 2
 *
 * TODO: create model schema 
 * NOTE: skip this if you are not using mongoose
 *
 */
const UserSchema = new mongoose.Schema({
 name: String,
 userName: String,
 password: String,
 city: String
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const UserCollection = mongoose.model('User', UserSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllUsers() {
  return UserCollection.find()
}

function getOneUser(userId) {
  return UserCollection.findById(userId)
}

function createUser(newUser) {
  return UserCollection.create(newUser)
}

function deleteUser(userId) {
  return UserCollection.findByIdAndDelete(userId)
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser
}
