const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const uploader = require('../configs/cloudinary.config');

router.post('/upload', ensureLoggedIn(), uploader.single("gameImg"), (req, res, next) => {

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;