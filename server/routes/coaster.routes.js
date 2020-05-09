const express = require('express')
const router = express.Router()

const Coaster = require('./../models/coaster.model')

router.get('/getAllCoasters', (req, res, next) => {
    Coaster.find()
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/getOneCoaster/:id', (req, res, next) => {
    Coaster.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.post('/postCoaster', (req, res, next) => {
    Coaster.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router