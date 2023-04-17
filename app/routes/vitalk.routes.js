module.exports = app => {
    const vitalk = require("../controllers/vitalk.controller.js");

    const router = require("express").Router();

    router.get('/', vitalk.findAll);
    router.get('/:id', vitalk.findOne);
    app.use('/api/vitalk', router);
};