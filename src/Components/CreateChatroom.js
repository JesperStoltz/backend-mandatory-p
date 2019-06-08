import React, {useState, useEffect, useRef} from 'react';
import './CreateChatroom.css';
const fs = require("fs");

//Build a POST to send a new chatroom-object to the server.

const CreateChatroom = () => {
    const [username, updateUsername] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
        fs.mkdir('./Database/Test', { recursive: true }, (err) => {
            if (err) throw err;
        });
    }   

    return (
        <>
        <form className="Create_chatroom" onSubmit={onSubmit}> 
            <p className="Create_chatroom_title">Create new chatroom</p>
            <input
             className="Create_chatroom_input" 
             type="text" 
             placeholder="New chatroom name here"
             maxLength={20}
            />
            <button className="Create_chatroom_button">Create</button>
        </form> {/* //End Create_chatroom */}
        </>
    )
}

export default CreateChatroom;