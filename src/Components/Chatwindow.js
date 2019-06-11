import React, {useEffect} from 'react';
import "./Chatwindow.css";
import axios from 'axios';

const Chatwindow = (props) => {

    useEffect(() => {
        axios.get("/chatrooms/"+props.currentChatroom)
            .then(res => {
                let arr=[];
                for (let key of res.data.chatroom) {
                    arr.push(key);
                }
                props.updateChatwindow(arr);  
            
            })
    }, [props.currentChatroom, props.poll]);

 
     let chatwindow = props.chatWindow.map(x =>
        <>
            <li className="list-item_username">{x.user}</li>
            <li className="list-item_message">{x.msg}</li>
        </>
    );  
        
    return (
        <>
            <div className="Chatwindow">
                <p className="Chatwindow_title">{props.currentChatroom}</p>

                <ul className="Chatwindow_content">
                     {chatwindow}
                </ul>
            </div>
        </>
    )
}

export default Chatwindow;