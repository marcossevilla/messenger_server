/*
    path: api/login
*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { createUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post(
    '/new',
    [
        // middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    createUser
);

module.exports = router;