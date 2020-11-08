const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { updateUserOnlineStatus } = require('../controllers/socket');

// socket messages
io.on('connection', client => {
    console.log('client connected');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    // verify authentication
    if (!valid) { return client.disconnect(); }

    // authenticated client
    updateUserOnlineStatus(uid, true);

    client.on('disconnect', () => {
        updateUserOnlineStatus(uid, false);
        console.log('client disconnected');
    });

    // client.on('message', (payload) => {
    //     console.log('message', payload);
    //     io.emit('message', { admin: 'new message' });
    // });

});
