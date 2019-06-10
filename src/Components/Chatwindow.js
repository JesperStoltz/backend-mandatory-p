import React, { useState, useEffect, useRef } from 'react';
import "./Chatwindow.css";
import axios from 'axios';

//Build a GET to get both the usernames and the messages from the specific chatrooms key.

const Chatwindow = (props) => {

    useEffect(() => {
        axios.get("/chatroom/" + props.pickChatroom)
            .then(res => {
                console.log(res.data);
                props.updateCurrentChatroom(res.data)
            })
    }, [props.pickChatroom]);

    let chatwindow = props.currentChatroom.map(x =>
        <>
            <li className="list-item_username">{x.username}</li>
            <li className="list-item_message">{x.message}</li>
        </>
    );

    return (
        <>
            <div className="Chatwindow">
                <p className="Chatwindow_title">{props.pickChatroom}</p>

                <ul className="Chatwindow_content">
                    {chatwindow}
                </ul>
            </div>
        </>
    )
}

export default Chatwindow;