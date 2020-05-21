const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Games = require('../models/games.model')
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get('/', (req, res, next) => {
    Games.find()
        .populate('owner')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))

})

router.get('/:gameId/details', (req, res, next) => {
    Games.findById(req.params.gameId)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.put('/:gameId/edit', ensureLoggedIn(), (req, res, next) => {
    Games.findByIdAndUpdate(req.params.gameId, req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))

})

router.delete('/:gameId/delete', ensureLoggedIn(), (req, res, next) => {
    Games.findByIdAndRemove(req.params.gameId)
        .then((response) => res.json(response))
        .catch(err => next(new Error(err)))

})

router.post('/new-game', ensureLoggedIn(), (req, res, next) => {
    Games.create(req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))

})

module.exports = router