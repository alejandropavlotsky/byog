const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")



router.get('/:userId', (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


module.exports = router