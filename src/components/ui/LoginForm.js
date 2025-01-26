import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {generateHeaders} from '../../util/ApplicationUtil';
import {login} from '../../util/globalUrl';
import "./LoginForm.css";


function LoginForm() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [loginFailure, setloginFailure] = useState(false);


    function handleUsernameInput(event) {
        setusername(event.target.value);
    }

    function handleUserPassword(event) {
        setpassword(event.target.value);
    }
    async function handleUserLoginActivity() {
        const loginBody = {
            "userName": username,
            "password": password
        }
        if (!!username && !!password) {
            const response = await fetch(login , generateHeaders('POST', loginBody));
            console.log(response, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("auth-token", data.token)
                localStorage.setItem("username", username);
                navigate("/");

            }
            else {
                setloginFailure(true);
            }
        }
        else {
            setloginFailure(true);

        }

    }

    function handleSignUpActivity() {
        navigate('/signup'); 
    }

    function formValidation() {
        let name = document.myform.name.value;
        let password = document.myform.password.value;

        if (name == null || name == "") {
            alert("Name can't be blank");

        }
        else if (password.length < 6) {
            alert("Password must be at least 6 characters long.");

        }
    }



    return (

        <React.Fragment>
            <div className="d-flex">
                <div className="LoginFormAlignment">
                    <h1 className="heading"> Log In</h1>

                    <label>  Username</label>  <input className="user" type="text" value={username} name="name" onChange={handleUsernameInput} placeholder="Enter your username" /> <br />

                    <label> Password </label> <input className="user" type="password" value={password} name="password" onChange={handleUserPassword} placeholder="Enter your password" /> <br />

                    <input className="button" type="submit" value="Login" onClick={handleUserLoginActivity} />

                    <input className="button" type="button" value="Sign Up" onClick={handleSignUpActivity} />

                    {loginFailure && <label>Invalid Credentials !</label>}

                </div>
            </div>

        </React.Fragment>)

}

export default LoginForm;
