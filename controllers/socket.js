const User = require('../models/user');


const updateUserOnlineStatus = async (uid = '', connected = Boolean) => {

    const user = await User.findById(uid);

    // update online status in db
    user.online = connected;
    await user.save();

    return user;
}

module.exports = {
    updateUserOnlineStatus
}