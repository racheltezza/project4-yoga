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
const EventsListSchema = new mongoose.Schema({
 name: String,
 userId: mongoose.Types.ObjectId
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const EventsListCollection = mongoose.model('EventsList', EventsListSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllEventLists() {
  return EventsListCollection.find()
}

function getOneEventList(listId){
  return EventsListCollection.findById(listId)
}

function createEventList(list) {
  return EventsListCollection.create(list)
}

function deleteEventList(listId) {
  return EventsListCollection.findByIdAndDelete(listId)
}

function getEventListByUserId(userId) {
  return EventsListCollection.find({userId: userId})
}
/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllEventLists,
  getOneEventList,
  deleteEventList,
  createEventList,
  getEventListByUserId
}
