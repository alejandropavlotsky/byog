const express = require('express')
const router = express.Router()
const Review = require('../models/review.model')
const User = require('../models/user.model')
const Events = require('../models/events.model')
const Games = require('../models/games.model')

router.get('/', (req, res, next) => {
    Review.find()
        .populate('author')
        .populate('reviewedInEvent')
        .populate('reviewedInGame')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/eventreviews/:eventId', (req, res, next) => {
    Review.find({ reviewedInEvent: req.params.eventId })
        .populate('author')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
router.get('/gamereviews/:gameId', (req, res, next) => {
    Review.find({ reviewedInGame: req.params.gameId })
        .populate('author')
        .then(data => res.json(data))
        .catch(err => next (new Error(err)))
})

router.post('/new-post', (req, res, next) => {
    Review.create(req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

module.exports = router