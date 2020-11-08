const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise(
        (resolve, reject) => {
            const payload = { uid };

            jwt.sign(
                payload,
                process.env.JWT_KEY,
                { expiresIn: '12h' },
                (error, token) => {
                    if (error) {
                        // couldn't generate token
                        reject('Couldn\'t generate token');
                    } else {
                        // return generated token
                        resolve(token);
                    }
                }
            );
        }
    );
}

const checkJWT = (token = '') => {

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];

    } catch (error) {
        return [false, undefined];
    }

}

module.exports = {
    generateJWT,
    checkJWT
}