import React, {useState, useEffect, useRef} from 'react';
import './Home.css';
import Chatwindow from "./Chatwindow.js";
import ChatroomList from "./ChatroomList.js";
import CreateChatroom from "./CreateChatroom.js";
import SendMessages from "./SendMessages.js";
import Userlist from "./Userlist.js";

const Home = (props) => { 

  return (
    <>
        <div className="ChatApp">

          <div className="Chatwindow_Lists_container">

            <Chatwindow />

            <div className="Chatroom_sidebar">
              <div className="Username">
                <p className="Username_text">{props.username}</p>
              </div>
              <CreateChatroom />
              
              <ChatroomList />
              <Userlist />

            </div> {/* //End Chatroom_sidebar */}

          </div> {/* End Chatwindow_Lists_container */}

        
            <SendMessages />
          

        </div> {/* End ChatApp */}
    </>
  );
}

export default Home;