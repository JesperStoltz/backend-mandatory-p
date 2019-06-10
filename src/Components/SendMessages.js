import React, {useState, useEffect, useRef} from 'react';
import './SendMessages.css';
import axios from "axios";

//Build a POST that sends the username and the message into the object.

const SendMessages = (props) => {


    const onChange = (e) => {
        props.updateNewMessage(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("/sendmessage", {username: props.username, message: props.newMessage})
        .then (res => {
            console.log(res);
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
                    <textarea className="Message_input" onChange={onChange}/>
                    <button className="SendMessage_button">Send</button>
                </form> {/* End SendMessages */}
            </div>
        </>
    )
}

export default SendMessages;