const { response } = require('express');

const User = require('../models/user');

const createUser = async (req, res = response) => {

    const { email } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                message: 'Email already in use'
            });
        }

        const user = new User(req.body);
        await user.save();

        res.json({ ok: true, msg: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Communicate with the admin'
        });
    }
}

module.exports = {
    createUser
}
