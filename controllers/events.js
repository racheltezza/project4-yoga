/* Step 1 import express
 *
 */
const express = require('express')

/* Step 2
 *
 * Import the api files from the models
 *
 * TODO: change the file path to the models file you'll need to use.
 * TODO: rename this from `templateApi` to something more sensible (e.g:
 * `shopsAPI`)
 *
 * NOTE: You may need to import more than one API to create the 
 * controller you need.
 * 
 */
const eventsApi = require('../models/events.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const eventsRouter = express.Router()

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

/* Step 5
 *
 * TODO: delete this handler; it's just a sample
 */ 
eventsRouter.get('/', (req, res) => {
  return eventsApi.getEventsByListId(req.params.listId)
  .then((events) => {
    res.json(events)
  })
})

eventsRouter.get('/:eventId', (req, res) => {
  return eventsApi.getOneEvent(req.params.eventId)
  .then((event) => {
    res.json(event)
  })
})

eventsRouter.post('/', (req, res) => {
  return eventsApi.createEvent(req.body)
  .then((event) => {
    res.json(event)
  })
})

eventsRouter.put('/:eventId', (req, res) => {
  return eventsApi.editEvent(req.params.eventId, req.body)
  .then((event) => {
    res.json(event)
  })
})

eventsRouter.delete('/:eventId', (req, res) => {
  return eventsApi.deleteEvent(req.params.eventId)
  .then(() => {
    res.send('event deleted')
  })
})

/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  eventsRouter
}
