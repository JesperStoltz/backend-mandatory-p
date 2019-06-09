import React, {useState, useEffect, useRef} from 'react';
import './ChatroomList.css';
import axios from 'axios';


//Build a GET-method for the chatroom-name keys!

const ChatroomList = () => {
    const [chatroomList, updateChatroomList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/chatroomlist")
    .then(res => {
        updateChatroomList(res.data)
        console.log(chatroomList);
    })
  }, []);

  let chatlist = chatroomList.map(x => 
          <li className="list-item">{x}</li>
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