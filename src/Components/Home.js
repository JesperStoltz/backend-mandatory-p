import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Chatwindow from "./Chatwindow.js";
import ChatroomList from "./ChatroomList.js";
import CreateChatroom from "./CreateChatroom.js";
import SendMessages from "./SendMessages.js";
import Userlist from "./Userlist.js";

/*
Om du slår ihop alla komponenter i home (även om du löser props), 
så kan du använda ett state för att köra pollningen, dvs att alla useEffects lyssnar på statet.

typ if (Poll = 1) {
  poll = 2
} else if (Poll = 2) {
  poll = 1
}

Typ.
*/


const Home = (props) => {
  const [newChatroom, updateNewChatroom] = useState("test");
  const [currentChatroom, updateCurrentChatroom] = useState([]);
  const [chatroomList, updateChatroomList] = useState([]);
  const [userList, updateUserList] = useState([]);
  const [newMessage, updateNewMessage] = useState([]);

  const onClick = (e) => {
    console.log("klick")
  }
  return (
    <>
      <div className="ChatApp">

        <div className="Chatwindow_Lists_container">
          <div onClick={onClick}>TESTDIV</div>
          <Chatwindow currentChatroom={currentChatroom} updateCurrentChatroom={updateCurrentChatroom} />

          <div className="Chatroom_sidebar">
            <div className="Username">
              <p className="Username_text">{props.username}</p>
            </div>
            <CreateChatroom newChatroom={newChatroom} updateNewChatroom={updateNewChatroom} />

            <ChatroomList chatroomList={chatroomList} updateChatroomList={updateChatroomList} />
            <Userlist userList={userList} updateUserList={updateUserList} />

          </div> {/* //End Chatroom_sidebar */}

        </div> {/* End Chatwindow_Lists_container */}


        <SendMessages username={props.username} newMessage={newMessage} updateNewMessage={updateNewMessage} />


      </div> {/* End ChatApp */}
    </>
  );
}

export default Home;