const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    // read token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No token found on request'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();


    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            message: 'Invalid token'
        });
    }

}

module.exports = {
    validateJWT
}