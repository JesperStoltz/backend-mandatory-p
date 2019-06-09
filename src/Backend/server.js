const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
const fs = require("fs");
let socket = require("socket.io");
var rimraf = require("rimraf");
const server = app.listen(port, () => console.log(`Listening on ${port}`));

let chatroomId = 0;
let messageId = 0;
let messageArray =[]; //Måste nog sättas till chatrummets meddelanden vid varje GetChat, annars kommer den att tömmas.s

function getChatroomId() {
    return chatroomId++;
}

function getMessageId() {
    return messageId++;
}

//==============CREATE CHATROOM===============
app.post("/createchat", (req, res) => {
    const body = req.body;
    
    if (!body.title || typeof body.title !== 'string') {
      res.status(400).end();
      return;
    }

    //Check if directory/chatroom already exists
    fs.access("../Database/"+body.title, (err) => {
        if (err) {
            //Creates chatroom
            fs.mkdir('../Database/'+body.title, (err) => {
        
                if (err) {
                      console.error(err);
                }
                else {
                    //Create ChatroomObj

                    let chatroomObj = {
                        chatID: getChatroomId(),
                        chatroomName: body.title,
                    }

                        fs.writeFile('../Database/' + body.title + "/" + body.title + '.json', JSON.stringify(chatroomObj), (err) => {
                            if (err) {
                                console.error(err);
                            }
                            else {
                                res.end(chatroomObj);
                            }
                        });

                      res.status(201);
                      res.send("Chatroom created");
                }
            })
        }
        else (
            res.status(400).send("Chatroom already exists")
        )
    });
});

app.post("/sendmessage", (req, res) => {
    const body = req.body;

     if (!body.username || typeof body.username !=="string" || !body.message || typeof body.message !=="string") {
        console.log("Wrong validation");
        res.status(400).end();
        return;
    } 

    //The MessageObject
    let newMessageObj = {
        messageId: getMessageId(),
        username: body.username,
        message: body.message,
    }

    messageArray.push(newMessageObj);

            fs.writeFile("../Database/Chatroom1/" + "Chatroom1" + "Messages.json", JSON.stringify(messageArray), (err) => {
                if (err) {
                    console.log("Writefile wrong");
                    console.error(err);
                }
                else {
                    res.status(201);
                    res.send("Message created");
                }
            });
})

//GET Chatroom

app.get("/chatroom", (req, res) => {
    
    let chatroom = [];

    fs.readFile('../Database/Chatroom1/Chatroom1' + 'Messages.json', (err, data) => {
        if (err) {
              console.error(err);
              res.statusCode = 500;
              res.end();
        }
        else {
            let j = JSON.parse(data);

            for (let i=0; i<j.length; i++ ){
                chatroom.push(j[i]);
            }
            res.statusCode = 201;
            res.send(chatroom);
        }
    });

})

//Get Usernames

app.get('/usernamelist', (req, res) => {

    let userList = [];
    
    fs.readFile('../Database/Chatroom1/Chatroom1' + 'Messages.json', (err, data) => {
        if (err) {
              console.error(err);
              res.statusCode = 500;
              res.end();
        }
        else {
            let j = JSON.parse(data);

                for (let i=0; i<j.length; i++){
                    if (j[i].username) {
                        userList.push(j[i].username)
                    }
                }
            res.statusCode = 201;
            res.send(userList);
        }
    });
});

//Get chatroomList


app.get("/chatroomlist", (req, res) => {

    fs.readdir("../Database", (err, data) => {
        
        let chatroomList = data;
        res.send(chatroomList);

    })


})

//Delete Chatroom

app.delete("/delete", (req, res) => {

    rimraf("../Database/test1", function () { 
        res.statusCode = 200;
        console.log("done"); });

    res.end();

})
