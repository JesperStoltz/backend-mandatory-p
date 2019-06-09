import React, {useState, useEffect, useRef} from 'react';
import './SendMessages.css';

//Build a POST that sends the username and the message into the object.

const SendMessages = (props) => {
    return (
        <>
            <div className="NewMessages_container">
                <form className="SendMessages">
                    <div className="Username_says">{props.username}</div>
                    <textarea className="Message_input"/>
                    <button className="SendMessage_button">Send</button>
                </form> {/* End SendMessages */}
            </div>
        </>
    )
}

export default SendMessages;