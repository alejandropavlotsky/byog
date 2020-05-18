const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')
const User = require('../models/user.model')

router.get('/', (req, res, next) => {
	Event.find().populate('author').then(data => res.json(data)).catch(err => next(new Error(err)))
})

router.get('/:eventId/details', (req, res, next) => {
	Event.findById(req.params.eventId)
		.populate('author')
		.populate('assistance')
		.populate('reviews')
		.then(data => res.json(data))
		.catch(err => next(new Error(err)))
})

router.put('/:eventId/edit', (req, res, next) => {
	Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true })
		.then(data => {
			return Event.findById(data._id)
				.populate('author')
				.populate('assistance')
				.populate('reviews')
		})
		.then(data => res.json(data))
		.catch(err => next(new Error(err)))
})

router.delete('/:eventId/delete', (req, res, next) => {
	Event.findByIdAndRemove(req.params.eventId).then(response => res.json(response)).catch(err => next(new Error(err)))
})

router.post('/new-event', (req, res, next) => {
	Event.create(req.body).then(data => res.json(data)).catch(err => next(new Error(err)))
})

module.exports = router
