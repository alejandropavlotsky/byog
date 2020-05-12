const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Games = require('../models/games.model')

router.get('/', (req, res, next) => {
    Games.find()
        .populate('owner')
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/:gameId/details', (req, res, next) => {
    Games.findById(req.params.gameId)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.put('/:gameId/edit', (req, res, next) => {
    Games.findByIdAndUpdate(req.params.gameId, req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.delete('/:gameId/delete', (req, res, next) => {
    Games.findByIdAndRemove(req.params.gameId)
        .then((response) => res.json(response))
        .catch(err => console.log(err))
})

router.post('/new-game', (req, res, next) => {
    Games.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router