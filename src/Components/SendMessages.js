import React from 'react';
import './SendMessages.css';

//Build a POST that sends the username and the message into the object.

const SendMessages = () => {
    return (
        <>
            <div className="NewMessages_container">
                <form className="SendMessages">
                    <div className="Username_says">J123456789101</div>
                    <textarea className="Message_input"/>
                    <button className="SendMessage_button">Send</button>
                </form> {/* End SendMessages */}
            </div>
        </>
    )
}

export default SendMessages;