const { response } = require('express');

const createUser = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'create user!'
    });

}

module.exports = {
    createUser
}
