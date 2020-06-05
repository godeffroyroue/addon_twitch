// const { check, validationResult } = require('express-validator');

exports.home = function(req, res) {
    res.send(200).json({"message" : "Welcome on the AddON Gveriz API"})
};