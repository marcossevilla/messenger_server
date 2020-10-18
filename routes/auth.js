/*
    path: api/login
*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { createUser, login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

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

module.exports = router;