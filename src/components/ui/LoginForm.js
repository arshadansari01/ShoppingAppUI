import React, { useState } from "react";
import "./LoginForm.css";


function LoginForm() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [loginFailure, setloginFailure] = useState(false);


    function handleUsernameInput(event) {
        setusername(event.target.value);
    }

    function handleUserPassword(event) {
        setpassword(event.target.value);
    }
    function handleUserLoginActivity() {
        fetch('http://localhost:9000/user/userLogin?username=' + username + '&password=' + password)
            .then(function (response) {
                return response.json();
            })
            .then(function (finalresponse) {
                if (finalresponse == undefined) {
                    setloginFailure(true);
                } else {

                    document.cookie = 'userId=' + finalresponse.userId;
                    window.location.href = "/";


                }
            })
    }

    function handleSignUpActivity() {
        window.location.href = "/signup";
    }

    //     function formValidation(){
    //         let name=document.myform.name.value;
    //         let password=document.myform.password.value;

    //         if(name==null||name==""){
    //         alert ("Name can't be blank");

    //     }   
    //     else if (password.length<6){
    //         alert("Password must be at least 6 characters long.");  

    //     }   
    // }



    return (
    
        <React.Fragment>
        <div className="LoginFormAlignment">
            <h1 className="heading"> Log In</h1>

            <label>  Enter your Username</label>  <input className="user" type="text" value={username} name="name" onChange={handleUsernameInput} placeholder="Enter username" /> <br />

            <label> Enter Password </label> <input className="user" type="password" value={password} name="password" onChange={handleUserPassword} /> <br />

            <input className="button" type="submit" value="Login" onClick={handleUserLoginActivity} />

            <input className="button" type="button" value="Sign Up" onClick={handleSignUpActivity} />

            {loginFailure && <label>Invalid Credentials !</label>}

        </div>
    </React.Fragment>)

}

export default LoginForm;
