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
const EventSchema = new mongoose.Schema({
 name: String,
 city: String,
 address: String,
 date: String,
 description: String,
 userId: mongoose.Types.ObjectId,
 eventsListId: mongoose.Types.ObjectId
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const EventCollection = mongoose.model('Event', EventSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllEvents() {
  return EventCollection.find()
}

function getOneEvent(eventId) {
  return EventCollection.find(eventId)
}

function createEvent(event) {
  return EventCollection.create(event)
}

function editEvent(eventId, event) {
  return EventCollection.findByIdAndUpdate(eventId, event, {new: true})
}

function deleteEvent(eventId) {
  return EventCollection.findByIdAndDelete(eventId)
}

function getEventsByListId(eventsListId) {
  return EventCollection.find({eventsListId: eventsListId})
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  editEvent,
  deleteEvent,
  getEventsByListId
}
