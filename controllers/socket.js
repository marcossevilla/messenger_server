const User = require('../models/user');
const Message = require('../models/message');

const updateUserOnlineStatus = async (uid = '', connected = Boolean) => {

    const user = await User.findById(uid);

    // update online status in db
    user.online = connected;
    await user.save();

    return user;
}

const saveMessage = async (payload) => {

    /*
        payload: {
            from: '',
            to: '',
            message: ''
        }
    */

    try {
        const message = new Message(payload);
        await message.save();

        return true;
    } catch (error) {

        return false;
    }
}

module.exports = {
    updateUserOnlineStatus,
    saveMessage
}