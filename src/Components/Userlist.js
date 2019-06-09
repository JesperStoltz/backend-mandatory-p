import React, {useState, useEffect, useRef} from 'react';
import './Userlist.css';
import axios from 'axios';

//Build a GET to get all the usernames in the chatroom

const Userlist = () => {
    const [userList, updateUserList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/usernamelist")
        .then(res => {
            updateUserList(res.data)
        })
      }, []);
    
      let userlist = userList.map(x => 
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