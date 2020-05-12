const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")
const Games = require("../models/games.model")
const Events = require("../models/events.model")
const Review = require("../models/review.model")



router.get('/:userId', (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/:userId/profile-info', (req, res, next) => {
    User.findById(req.params.userId)
        .then(userData => {
            Games.find({ owner: req.params.userId })
                .then(gameData => {
                    Events.find({ author: req.params.userId })
                        .then(eventData => {
                            Review.find({ author: req.params.userId })
                                .then(reviewData => res.json({user: userData, games: gameData, events: eventData, reviews: reviewData}))
                        })
                })

        })
        .catch(err => console.log(err))
})

// 


module.exports = router