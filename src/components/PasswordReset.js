import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';
import { auth } from '../firebase/config';
import { UserContext } from '../providers/userProvider';
import "./loginPages.css";


const PasswordReset = () =>{

    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [ error, setError ] = useState(null);
    const [ errorEmpty, setErrorEmpty ] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
    
        if (name === "userEmail") {
          setEmail(value);
        }
      };
    
    const sendResetEmail = event => {
        event.preventDefault();
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
            setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch(() => {
            setError("Error resetting password");
        });
    } 
    

    return(
        <div className="PasswordReset">
            <div className="container-fluid">
                <div style={{marginTop:'50px'}} className ="col-12 col-sm-6 mx-auto shadow rounded-lg signInForm">
                    <form className="px-4 py-4" noValidate>
                    <div style={{fontSize:'22px',fontWeight:'600'}} className="formHeading text-center">Reset your Password</div>
                        <div className="form-group mt-4">
                            <label style={{fontWeight:'400', fontSize:'15px'}} for="exampleInputEmail1">Email</label>
                            {(error===null&&errorEmpty===null) && <input type="email" id="custom2" name="userEmail" placeholder="Enter your email address" className="form-control" onChange={event => onChangeHandler(event)}/>}
                            {(error || errorEmpty) && <input type="email" name="userEmail" placeholder="Eg: john.doe@gmail.com" className="form-control is-invalid" id="exampleInputEmail1" onChange={event => onChangeHandler(event)}/>}
                        </div>
                        <button id="passwordresetbutton" style={{color:"#fff", backgroundColor:'#2196f3'}} type="submit" className="btn col-12 mt-2 mb-2" onClick={event => {sendResetEmail(event);}}>Send me a reset link</button>
                        <p className="text-center my-2">
                            <Link to={process.env.PUBLIC_URL} className="text-primary">
                            &larr; back to sign in page
                            </Link>{" "}
                        </p>
                        </form>
                    </div>
                    {emailHasBeenSent && <div className="d-flex justify-content-center">
                        <div class="alert alert-success col-6 mt-4" role="alert">
                        An email has been sent to you!
                        </div>
                </div>}
                </div>
            </div>
        )
    }

    export default PasswordReset