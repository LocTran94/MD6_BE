import express from "express";
import {router} from './src/router/router';
import bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";
import cors from "cors";
const http = require('http');




const app = express();
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

AppDataSource.initialize().then(() => {
    console.log('database connected');
});


// app.get('/home/message', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// });
//
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });


app.use(cors());
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
