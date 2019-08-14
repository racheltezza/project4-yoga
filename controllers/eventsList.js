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
const eventsListApi = require('../models/eventsList.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const eventsListRouter = express.Router({mergeParams: true})

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

/* Step 5
 *
 * TODO: delete this handler; it's just a sample
 */ 
eventsListRouter.get('/', (req, res) => {
  return eventsListApi.getEventListByUserId(req.params.userId)
  .then((lists) => {
    res.json(lists)
  })
})

eventsListRouter.get('/:listId', (req, res) => {
  return eventsListApi.getOneEventList(req.params.listId)
  .then((list) => {
    res.json(list)
  })
})

eventsListRouter.post('/', (req, res) => {
  req.body.userId = req.params.userId
  return eventsListApi.createEventList(req.body)
  .then((list) => {
    res.json(list)
  })
})

eventsListRouter.delete('/:listId', (req, res) => {
  return eventsListApi.deleteEventList(req.params.listId)
  .then(() => {
    res.send('list deleted')
  })
})
/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  eventsListRouter
}
