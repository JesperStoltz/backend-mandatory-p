import React, { useEffect } from 'react';
import './SendMessages.css';
import axios from "axios";
//import io from 'socket.io-client';
//const socket = io('http://localhost:3001');

const SendMessages = (props) => {

    const onChange = (e) => {
        props.updateNewMessage(e.target.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault();


        axios.post("/send/"+props.currentChatroom, {user: props.username, msg: props.newMessage})
        .then (res => {
            console.log(res);
            props.updateNewMessage("")
            props.updatePoll("A");
            props.updatePoll("B");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="NewMessages_container">
                <form className="SendMessages" onSubmit={onSubmit}>
                    <div className="Username_says">{props.username}</div>
                    <textarea className="Message_input" onChange={onChange} value={props.newMessage}/>
                    <button className="SendMessage_button">Send</button>
                </form> {/* End SendMessages */}
            </div>
        </>
    )
}

export default SendMessages;