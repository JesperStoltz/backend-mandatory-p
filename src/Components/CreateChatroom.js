import React, {useState, useEffect, useRef} from 'react';
import './CreateChatroom.css';
import axios from "axios";
import io from "socket.io-client";
const fs = require("fs");



//Build a POST to send a new chatroom-object to the server.

const CreateChatroom = (props) => {
    
    
    const onChange = (e) => {
        props.updateNewChatroom(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("/newroom/", {name: props.newChatroom})
        .then (res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
        <form className="Create_chatroom" onSubmit={onSubmit}> 
            <p className="Create_chatroom_title">Create new chatroom</p>
            <input
            onChange={onChange} 
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