var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var taskController = require('./controllers/tasks');
mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true});
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var router = express.Router();

// app.use('/api', router);
//
// router.route('/allTasks').get(taskController.getAllTasks);
// router.route('/tasks/:userId').get(taskController.getTasksById);
// router.route('/task/:taskID').get(taskController.getTask);
// router.route('/addTask').post(taskController.addTask);
// router.route('/updateTask/:userId').post(taskController.updateTask);
// router.route('/deleteTask/:taskID').get(taskController.deleteTask);
// app.listen(3000, function () {
//     console.log("Server listening on port 3000");
// });


const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("outside io");

io.on('connection', function(socket){

    console.log('User Conncetion');

    socket.on('connect user', function(user){
        console.log("Connected user ");
        io.emit('connect user', user);
    });

    socket.on('on typing', function(typing){
        console.log("Typing.... ");
        io.emit('on typing', typing);
    });

    socket.on('chat message', function(msg){
        console.log("Message " + msg['message']);
        io.emit('chat message', msg);
    });
});

http.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});