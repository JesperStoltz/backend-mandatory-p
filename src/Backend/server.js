const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;
const fs = require("fs");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const server = http.listen(port, () => console.log(`Listening on ${port}`));

/*

let roomObj = {
    name: "",
    messages: [
        {user: "", msg: ""}
    ]
}

*/
let data = require("./data.json");
let data1 = data.rooms;

fs.readFile("./data.json", (err, data) => {
    if (err) {
        console.log(err)
    }
    data = JSON.parse(data);
});

console.log(data1)

//==============GET ROOMS========================OK
app.get("/chatrooms/", (req, res) => {
    if(!res) {
        res.status(204).send("There are no chatrooms at the moment.");
        return;
    }
    res.status(200);
    res.json(data1);
});

//============================GET SPECIFIC CHATROOM==============================OK
app.get("/chatrooms/:name", (req, res) => {
    let name = req.params.name;

    if (!name) {
        res.status(400).send("There is no chatroom with this name.");
        return;
    } 

    let chatroom = data1.find(data => data.name === name);

    if (chatroom) {
        res.json(chatroom);
        res.status(200)
    }else{
       res.status(404).end() 
    }
    return;
});

//========================CREATE ROOM=========================OK
app.post("/newroom/", (req, res) => {
    const body = req.body;

    if (!body.name || typeof body.name !== 'string') {
        res.status(400).send("This request contains invalid information");
        return;
    }

    for (let chatroom of data1){
        if (chatroom.name === body.name){
            res.status(400).send("A chatroom with this name already exists"); 
            return;
        }
    }

    let roomObj = {
        name: body.name,
        chatroom: []
    }

    data1.push(roomObj)

    fs.writeFile("./data.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Something went wrong on the server.")
        }
        else {
            res.status(201).json(roomObj);
            res.send("Chatroom created!")
        }
    });
    return;
})


//===============SEND MESSAGE========================OK
    app.post("/send/:name", (req, res) => {
        const body = req.body;
        let name = req.params.name;

        if (!body.user || typeof body.user !== "string" || !body.msg || typeof body.msg !== "string") {
            res.status(400).send("This request contains invalid information");
            return;
        }

           //The MessageObject
           let newMessageObj = {
            user: body.user,
            msg: body.msg,
        }


        for (let i=0; i<data1.length; i++) {
           
            if (data1[i].name === name) {
                
                data1[i].chatroom.push(newMessageObj);
                console.log(data1[i].chatroom)
                
            } 
        }

         fs.writeFile("./data.json", JSON.stringify({rooms: data1}), (err) => { //Lägger till meddelandet MEN tar bort rooms. WTF.
            if (err) {
                console.error(err);
                res.status(500).send("Something went wrong on the server.")
            }
            else {
                res.status(201).send("Message created and sent");
                io.emit("message", newMessageObj);

                return;
            }
        }); 
    });

//=======================Get Usernames=====================OK


    app.get('/usernamelist/:name', (req, res) => {
        let name = req.params.name;
        let arr=[];

        for (let i=0; i<data1.length; i++){

            if (data1[i].name === name) {
            for (let key of data1[i].chatroom) {
                if (!arr.includes(key.user)){
                arr.push(key.user)
                }
            }
            }
        }

        res.status(200).json(arr);
        return;
    });

    //===========================Delete Chatroom====================================OK OK

    app.delete("/delete/:name", (req, res) => { //Funkar men tar också bort rooms, dvs allt slutar fungera.
        let name = req.params.name;

        if(!name) {
            res.status(400).end();
            return;
        }

        let roomInd = data1.findIndex(data1 => data1.name === name) 
        console.log(roomInd)
            if (roomInd !== -1){
                data1.splice(roomInd, 1);
            }
             fs.writeFile("./data.json", JSON.stringify({rooms: data1}), (err) => {
                if (err){
                    console.log(err)
                    res.status(500).send("Something went wrong on the server.")
                }
                res.status(200).send("Object deleted");
            }) 
            return;
    })
