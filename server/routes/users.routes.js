const express = require("express")
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const User = require("../models/user.model")
const Games = require("../models/games.model")
const Events = require("../models/events.model")
const Review = require("../models/review.model")


router.get('/', (req, res, next) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/:userId', ensureLoggedIn(), (req, res, next) => {
    User.findById(req.params.userId)        
        .populate('favorites')
        .then((data) => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/:userId/profile-info', ensureLoggedIn(), (req, res, next) => {
    
    let userPromise = User.findById(req.params.userId).populate('favorites')
    let gamePromise = Games.find({ owner: req.params.userId })
    let eventPromise = Events.find({ author: req.params.userId })
    let reviewPromise = Review.find({ author: req.params.userId })
    
    let allPromises = [userPromise, gamePromise, eventPromise, reviewPromise]
    
    Promise.all(allPromises)
    .then(data => res.json({user: data[0], games: data[1], events: data[2], reviews: data[3] }))
    .catch(err => next(new Error(err)))
})

router.post('/:userId/edit', ensureLoggedIn(), (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .populate('favorites')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.put('/:userId/update', ensureLoggedIn(), (req, res, next) => {
    console.log(req.params.userId)
    User.findByIdAndUpdate(req.params.userId)
        .then((response) => res.json(response))
})

module.exports = router