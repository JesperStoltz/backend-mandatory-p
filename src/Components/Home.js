import React, { useState } from 'react';
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
  const [currentChatroom, updateCurrentChatroom] = useState("Click on a chatroom to start chatting");
  const [chatWindow, updateChatwindow] = useState([]);
  const [chatroomList, updateChatroomList] = useState([]);
  const [userList, updateUserList] = useState([]);
  const [newMessage, updateNewMessage] = useState([]);
  const [poll, updatePoll] = useState("")

  return (
    <>
      <div className="ChatApp">

        <div className="Chatwindow_Lists_container">
          <Chatwindow poll={poll} currentChatroom={currentChatroom} chatWindow={chatWindow} updateChatwindow={updateChatwindow} />

          <div className="Chatroom_sidebar">
            <div className="Username">
              <p className="Username_text">{props.username}</p>
            </div>
            <CreateChatroom newChatroom={newChatroom} updateNewChatroom={updateNewChatroom} updatePoll={updatePoll} />

            <ChatroomList chatroomList={chatroomList} updateChatroomList={updateChatroomList} currentChatroom={currentChatroom} updateCurrentChatroom={updateCurrentChatroom} updatePoll={updatePoll} poll={poll}/>
            <Userlist userList={userList} updateUserList={updateUserList} updateCurrentChatroom={updateCurrentChatroom} currentChatroom={currentChatroom} poll={poll}/>

          </div> {/* //End Chatroom_sidebar */}

        </div> {/* End Chatwindow_Lists_container */}


        <SendMessages updatePoll={updatePoll} poll={poll} username={props.username} newMessage={newMessage} updateNewMessage={updateNewMessage} currentChatroom={currentChatroom}/>


      </div> {/* End ChatApp */}
    </>
  );
}

export default Home;