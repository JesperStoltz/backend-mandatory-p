import React, {useState, useEffect, useRef} from 'react';
import './Userlist.css';
import axios from 'axios';

//Build a GET to get all the usernames in the chatroom

const Userlist = (props) => {


    useEffect(() => {
        axios.get("/usernamelist/"+props.currentChatroom)
        .then(res => {
            props.updateUserList(res.data)
            console.log(res.data)
        })
      }, []);
    
      let userlist = props.userList.map(x => 
              <li className="list-item">{x}</li>
      ); 

    return (
        <>
            <div className="UserList">
                <p className="UserList_title">Userlist</p>
                <ul className="Userroom_list">
                     {userlist} 
                </ul>
            </div>
        </>
    )
}

export default Userlist;