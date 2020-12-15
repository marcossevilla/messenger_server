const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { updateUserOnlineStatus, saveMessage } = require('../controllers/socket');

// socket messages
io.on('connection', client => {
    console.log('client connected');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    // verify authentication
    if (!valid) { return client.disconnect(); }

    // authenticated client
    updateUserOnlineStatus(uid, true);

    // log user to specific chat room
    client.join(uid);

    // listening to private message
    client.on('private-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload);
    });

    client.on('disconnect', () => {
        updateUserOnlineStatus(uid, false);
        console.log('client disconnected');
    });

});
