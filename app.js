const express = require('express');
const app = express();
const serv = require('http').Server(app);
const cors = require('cors')
const bodyParser = require("body-parser")

const fs = require("fs");

//let board = JSON.parse(fs.readFileSync(__dirname + "/board.json"));

const fileUpload = require("express-fileupload");

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 50000000
    },
    abortOnLimit: true
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/b/data/", function(req, res) {
    //res.send(board);
    res.sendFile(__dirname+"/board.json");
});

app.get("/b/data/:id", function(req, res) {
    console.log(req.params.id);
    let board = JSON.parse(fs.readFileSync(__dirname+"/board.json"));
    //return res.send({posts: [board.posts.filter(post => post.timestamp == req.params.id)]}); //fucking GOATED one liner
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce this is the smart code mom and dad are losing their marbles to
    for(let post of board.posts) {
        if(post.timestamp == req.params.id) { //reducer??? (oh shit i meant filter) <- (aw damn i was finna write some smart code but the benefit of using the for of is returning when it's done)
            return res.send({posts: [post]});
        }
    }
    res.send(board);//File(__dirname+"/board.json");
});

app.post("/b/data/", function(req ,res) {
    console.log(req.body, req.files);
    let board = JSON.parse(fs.readFileSync(__dirname + "/board.json"));
    let timestamp = Date.now();
    let obj = {timestamp: timestamp, content: req.body.content};//, subject: req.body.subject, replies: []};
    if(req.files) {
        let file = req.files.file;
        obj.file = {name: file.name, link: file.name.split(".")[file.name.split(".").length-1], size: Math.round(file.size/1000), dim: req.body.dim};
        console.log(`/imgs/${timestamp}.${file.name.split(".")[file.name.split(".").length-1]}`);
        req.files.file.mv(__dirname + `/imgs/${timestamp}.${file.name.split(".")[file.name.split(".").length-1]}`);
    }
    if(req.body.reply) {
        obj.content = `>>${req.body.reply}\r\n${obj.content}`;
        //if this takes too long i could memoize it at the start by creating a list then updating when i post
        //(list of timestamps)
        for(let post of board.posts) { //lol in because i want the object straight up! (wait no of returns board.posts by REF)
            if(post.timestamp == req.body.reply) {
                obj.content = obj.content.replace(req.body.reply, "$& (OP)");
                post.replies.push(obj);
                break;
            }else {
                for(let reply of post.replies) {
                    //console.log(reply.timestamp, req.body.reply);
                    if(reply.timestamp == req.body.reply) {
                        post.replies.push(obj);
                        break;
                    }
                }
            }
        }
    }else {
        obj.subject = req.body.subject;
        obj.replies = [];
        board.posts.splice(0, 0, obj);
    }
    fs.writeFileSync(__dirname + "/board.json", JSON.stringify(board));
    res.sendStatus(200);
});

app.get("/b/*", function(req, res) {
    res.sendFile(__dirname+"/reactsrc/build/index.html");
});

app.use("/",express.static(__dirname + "/shit"));
app.use("/",express.static(__dirname + "/imgs"));
app.use("/",express.static(__dirname + "/reactsrc/build"));//"/react"))

serv.listen(process.env.PORT || 80);

console.log("doin' ur mom doin' doin' ur mom");