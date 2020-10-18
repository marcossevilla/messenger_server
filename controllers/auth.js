const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const createUser = async (req, res = response) => {


    const user = new User(req.body);

    await user.save();

    res.json({
        ok: true,
        msg: 'create user!'
    });

}

module.exports = {
    createUser
}
