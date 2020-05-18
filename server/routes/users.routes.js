const express = require("express")
const router = express.Router()

const User = require("../models/user.model")
const Games = require("../models/games.model")
const Events = require("../models/events.model")
const Review = require("../models/review.model")


router.get('/', (req, res, next) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))

})

router.get('/:userId/profile-info', (req, res, next) => {

    let userPromise = User.findById(req.params.userId)
    let gamePromise = Games.find({ owner: req.params.userId })
    let eventPromise = Events.find({ author: req.params.userId })
    let reviewPromise = Review.find({ author: req.params.userId })
    
    let allPromises = [userPromise, gamePromise, eventPromise, reviewPromise]

    Promise.all(allPromises)
        .then(data => res.json({user: data[0], games: data[1], events: data[2], reviews: data[3] }))
        .catch(err => next(new Error(err)))
})

module.exports = router