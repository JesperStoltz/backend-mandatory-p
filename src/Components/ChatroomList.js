import React, {useState, useEffect, useRef} from 'react';
import './ChatroomList.css';
import axios from 'axios';


//Build a GET-method for the chatroom-name keys!

const ChatroomList = (props) => {
  useEffect(() => {
    axios.get("/chatroomlist")
    .then(res => {
        props.updateChatroomList(res.data)
    })
  }, []);

  const Delete = (e) => {
    let id = e.target.id;

    axios.delete("/delete"+id)
    .then (res => {
      console.log(res);
    })
  }

  const Pick = (e) => {
    let val = e.target.id;
    props.updatePickChatroom(val);
  }

  let chatlist = props.chatroomList.map(x => 
        <>
          <li className="list-item" onClick={Pick}>
            <div className="list_content" id={x}>{x}</div>
            <div className="list_delete_content" onClick={Delete} id={x}>X</div>
            </li>
        </>
  );

    return (
         <div className="ChatroomList">
             <p className="Chatlist_title">Chatroom-list</p>
            <ul className="Chatroom_list">
                {chatlist}
            </ul>
         </div>
    )
}

export default ChatroomList;