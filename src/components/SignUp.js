import React, { useState } from 'react';
import { Link } from '@reach/router';
import {auth, generateUserDocument} from '../firebase/config';
import { signInWithGoogle } from '../firebase/config';
import "./loginPages.css";
import { useMediaQuery } from 'react-responsive'

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
    const [loadingOne, setLoadingOne] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);

     const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
      event.preventDefault();
      console.log(loadingOne)
      try{
        setLoadingOne(true);
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, {displayName});
        // setLoadingOne(false);
      }
      catch(error){
        // setLoadingOne(false)
        setError('Error Signing up with email and password');
        console.log(error);
        setLoadingOne(false)
      }
  
      setEmail("");
      setPassword("");
      setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        } else if (name === "userPassword") {
          setPassword(value);
        } else if (name === "displayName") {
          setDisplayName(value);
        }
      };


    return(
        <div className="SignUp">
            <div className="container-fluid">
          {isTabletOrMobileDevice && <><div style={{marginTop:'50px'}} className ="col-12 col-sm-6 mx-auto rounded-lg signUpForm">
          <form className="px-4 py-4" noValidate>
            <div style={{fontSize:'22px', fontWeight:'600', letterSpacing:'1.0'}} className="formHeading text-center">PinGram</div>
          <div class="form-group mt-2">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="displayName">Display Name</label>
                {error===null && <input id="custom2" type="text" placeholder="Eg: John Doe" name="displayName" class="form-control" onChange={event => onChangeHandler(event)}/>}
                {error && <input id="displayName" type="text" placeholder="Eg: John Doe" name="displayName" class="form-control is-invalid" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="exampleInputEmail1">Email address</label>
                {error===null && <input id="custom2" type="email" placeholder="Eg: john.doe@gmail.com" name="userEmail" class="form-control" onChange={event => onChangeHandler(event)}/>}
                {error && <input type="email" placeholder="Eg: john.doe@gmail.com" name="userEmail" class="form-control is-invalid" id="exampleInputEmail1" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="exampleInputPassword1">Password</label>
                {error===null && <input id="custom2"  type="password" class="form-control" name="userPassword" placeholder="Your Password" onChange={event => onChangeHandler(event)}/>}
                {error && <input type="password" class="form-control is-invalid" name="userPassword" placeholder="Your Password" id="exampleInputPassword1" onChange={event => onChangeHandler(event)}/>}
                {error && <div id="exampleInputPassword1" className="invalid-feedback">
                    Enter all fields correctly
                </div>}
            </div>
           {!loadingOne && <button id="signIn" style={{color:"#fff", backgroundColor:'#388e3c'}} type="submit" className="btn col-12 mt-2 mb-2" onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>Sign Up</button>}
            {loadingOne && <button type="button" className="btn col-12 mt-2 mb-2" style={{backgroundColor:'#81c784', color:"#fff"}} disabled>
            {/* <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
              Loading...</button>}
            <div className="text-center">
                or
            </div>

            {!loadingTwo && <button id="signInWithGoogle" type="submit" style={{color:'#fff', backgroundColor:'#d32f2f'}} className="btn col-12 mt-2 mb-2"  onClick={() => {
              try {
                setLoadingTwo(true)
                signInWithGoogle();
                // setLoadingTwo(false)
              } catch (error) {
                console.error("Error signing in with Google", error);
                setLoadingTwo(false)
              }
          }}>
              Sign In with Google
              <i class="fab fa-google px-2"></i>
            </button>}

          {loadingTwo && <button type="button" style={{backgroundColor:'#ef5350', color:'#fff'}} className="btn col-12 mt-2 mb-2" disabled>
          {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
            Loading...
            </button>}

            <p className="text-center my-2">
                Already have an account?{" "}
                <Link to={process.env.PUBLIC_URL} className="text-primary">
                    Sign in here
                </Link>{" "}
                <br />{" "}
            </p>
            </form>
        </div></>}

        {isDesktopOrLaptop && <>
          <div style={{marginTop:'50px'}} className ="col-12 col-sm-6 mx-auto shadow rounded-lg signUpForm">
          <form className="px-4 py-4" noValidate>
            <div style={{fontSize:'22px', fontWeight:'600', letterSpacing:'1.0'}} className="formHeading text-center">PinGram</div>
          <div class="form-group mt-2">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="displayName">Display Name</label>
                {error===null && <input id="custom2" type="text" placeholder="Eg: John Doe" name="displayName" class="form-control" onChange={event => onChangeHandler(event)}/>}
                {error && <input id="displayName" type="text" placeholder="Eg: John Doe" name="displayName" class="form-control is-invalid" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="exampleInputEmail1">Email address</label>
                {error===null && <input id="custom2" type="email" placeholder="Eg: john.doe@gmail.com" name="userEmail" class="form-control" onChange={event => onChangeHandler(event)}/>}
                {error && <input type="email" placeholder="Eg: john.doe@gmail.com" name="userEmail" class="form-control is-invalid" id="exampleInputEmail1" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontSize:'15px', fontWeight:'400'}} for="exampleInputPassword1">Password</label>
                {error===null && <input id="custom2"  type="password" class="form-control" name="userPassword" placeholder="Your Password" onChange={event => onChangeHandler(event)}/>}
                {error && <input type="password" class="form-control is-invalid" name="userPassword" placeholder="Your Password" id="exampleInputPassword1" onChange={event => onChangeHandler(event)}/>}
                {error && <div id="exampleInputPassword1" className="invalid-feedback">
                    Enter all fields correctly
                </div>}
            </div>
           {!loadingOne && <button id="signIn" style={{color:"#fff", backgroundColor:'#388e3c'}} type="submit" className="btn col-12 mt-2 mb-2" onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>Sign Up</button>}
            {loadingOne && <button type="button" className="btn col-12 mt-2 mb-2" style={{backgroundColor:'#81c784', color:"#fff"}} disabled>
            {/* <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
              Loading...</button>}
            <div className="text-center">
                or
            </div>

            {!loadingTwo && <button id="signInWithGoogle" type="submit" style={{color:'#fff', backgroundColor:'#d32f2f'}} className="btn col-12 mt-2 mb-2"  onClick={() => {
              try {
                setLoadingTwo(true)
                signInWithGoogle();
                // setLoadingTwo(false)
              } catch (error) {
                console.error("Error signing in with Google", error);
                setLoadingTwo(false)
              }
          }}>
              Sign In with Google
              <i class="fab fa-google px-2"></i>
            </button>}

          {loadingTwo && <button type="button" style={{backgroundColor:'#ef5350', color:'#fff'}} className="btn col-12 mt-2 mb-2" disabled>
          {/* <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
            Loading...
            </button>}

            <p className="text-center my-2">
                Already have an account?{" "}
                <Link to={process.env.PUBLIC_URL} className="text-primary">
                    Sign in here
                </Link>{" "}
                <br />{" "}
            </p>
            </form>
        </div></>}
          </div>
       </div>
    )
}

export default SignUp