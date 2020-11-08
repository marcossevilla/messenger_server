const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');

// socket messages
io.on('connection', client => {
    console.log('client connected');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    if (!valid) { return client.disconnect(); }

    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    // client.on('message', (payload) => {
    //     console.log('message', payload);
    //     io.emit('message', { admin: 'new message' });
    // });

});
