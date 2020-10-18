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

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const userFromDB = await User.findOne({ email });

        if (!userFromDB) {
            return res.status(404).json({
                ok: false,
                message: 'User not found'
            });
        }

        const validPassword = bcrypt.compareSync(password, userFromDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password not valid'
            });
        }

        // generate JWT
        const token = await generateJWT(userFromDB.id);

        res.json({
            ok: true,
            user: userFromDB,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Communicate with the admin'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await generateJWT(uid);

    const user = await User.findById(uid);

    res.json({ ok: true, user: user, token });

}

module.exports = {
    createUser,
    login,
    renewToken
}
