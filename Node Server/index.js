//Node Server which will handle socket io connections
const io = require('socket.io')(8000) 

const users = {};

io.on('connection',socket =>{ // This line will connect all the users
    // console.log("Server Started")
    socket.on('new-user.joined',name =>{  //This line handles when the new user or connection is done it will share the information of that new connection to everyone
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',messege =>{ // If someone sends a messege broadcast it to every other user.
        socket.broadcast.emit('receive',{messege: messege, name: users[socket.id]})
    });

    socket.on('disconnect',messege =>{ // If someone gets disconnected it will share a notification that user left the chat 
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})