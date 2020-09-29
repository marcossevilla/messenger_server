const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        console.log('init db');
    } catch (error) {
        console.error(error);
        throw new Error('db-error');
    }

}

module.exports = {
    dbConnection
}