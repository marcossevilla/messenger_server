/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate_jwt');
const { validateFields } = require('../middlewares/validate_fields');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;