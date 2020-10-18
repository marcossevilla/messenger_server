const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                message: 'Email already in use'
            });
        }

        const user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // generate JWT
        const token = await generateJWT(user.id);

        res.json({ ok: true, user, token });

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
