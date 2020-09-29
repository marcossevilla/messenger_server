const { io } = require('../index');


// socket messages
io.on('connection', client => {
    console.log('client connected');

    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    client.on('message', (payload) => {
        console.log('message', payload);
        io.emit('message', { admin: 'new message' });
    });

});
