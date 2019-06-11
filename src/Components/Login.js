import React, {useState}  from 'react';
import Home from "./Home.js";
import "./Login.css";

const Login = () => {
    const [tempUsername, updateTempUsername] = useState("");
    const [username, updateUsername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    updateUsername(tempUsername);
    updateTempUsername("");
  }

  const onChange = (e) => {
   updateTempUsername(e.target.value);
  } 
    
  if (username){
    //return <Redirect to="/Home" />
    return (
        <Home username={username}/>
    )
  }

  return (
        <div className="Login_window">
            <div className="Login_container">
                <form className="Login_form" onSubmit={onSubmit}>
                    <input
                    onChange={onChange} 
                    className="Login_input"
                    placeholder="Choose your username"
                    maxLength={12}
                    />
                    <button className="Login_button">Login</button>
                </form>
            </div>
        </div>
  );
}

export default Login;
