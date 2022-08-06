import React, { useState } from "react";
import { ValidateMobileNumber, EMAIL_ID_REGEX } from "../../util/ApplicationUtil";
import './SignUpForm.css';


function SignUpForm() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setdob] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const  [password, setPassword] = useState('');
    const [emailid, setEmailId] = useState('');


    function Validate() {
        if (firstname.length >= 1 && emailid.match(EMAIL_ID_REGEX) && ValidateMobileNumber(mobileno)) {
            return true;
        }
        return false;

    }

    function CreateUser() {
        const isValidPayload = Validate();
        if (!isValidPayload) {
            alert('Invalid user details')
            return;
        }
        const body = {
            "firstName": firstname,
            "lastName": lastname,
            "gender": gender,
            "dob": dob,
            "emailId": emailid,
            "password":password,
            "mobileNumber": mobileno
        };
        fetch("http://localhost:9000/user", {
            "method": "POST",
            "body": JSON.stringify(body),
            "headers": {
                'Content-Type': 'application/json'
            }

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                if (data.userId != undefined) {
                    window.location.href = "/";
                    document.cookie = "userId=" + data.userId
                }
                
                else {
                    alert("Sign up failed !")
                }
            })
    }
    return (<React.Fragment>
        <div className="SignUpFormAlignment">
        <h2 className="heading"> SignUp</h2>
            

            <label> Enter your First Name</label>
             <input className="input-box" type="text" value={firstname} onChange={function (event) { setFirstName(event.target.value) }} /><br />
            <label> Enter your Last Name</label> <input className="input-box" type="text" value={lastname} onChange={function (event) { setLastname(event.target.value) }} /><br />
            <label>Enter your Gender </label>  <input className="input-box" type="dropdown" value={gender} onChange={function (event) { setGender(event.target.value) }} /><br />

            <label>Enter your DOB </label>  <input className="input-box" placeholder="dd/mm/yyyy" type="dob" value={dob} onChange={function (event) { setdob(event.target.value) }} /><br />
            <label>Enter your Email Id </label>  <input className="input-box" type="text" value={emailid} onChange={function (event) { setEmailId(event.target.value) }} /><br />
            <label>Enter your Mobile Number </label> <input className="input-box" type="text" value={mobileno} onChange={function (event) { setMobileNo(event.target.value) }} /><br />
            <label>Enter your Password</label> <input className="input-box" type="password" value={password} onChange={function (event) { setPassword   (event.target.value) }} /><br />

            <input className="input-button" type="button" value="Register" onClick={CreateUser} />


        </div>

    </React.Fragment>)

}

export default SignUpForm;