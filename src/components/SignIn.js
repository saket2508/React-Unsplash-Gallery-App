import React, { useState } from 'react';
import { Link } from '@reach/router';
import { auth } from '../firebase/config';
import { signInWithGoogle } from '../firebase/config';
import "./loginPages.css";
import { useMediaQuery } from 'react-responsive'


const SignIn = () =>{

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const [ errorEmpty, setErrorEmpty ] = useState(null);
    const [loadingOne, setLoadingOne] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);

     const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })

    const signInWithEmailAndPasswordHandler = 
            (event, email, password) => {
                event.preventDefault();
                setLoadingOne(true)
                auth.signInWithEmailAndPassword(email, password).catch(error => {
                setLoadingOne(false)
                if(email==="" || password===""){
                    setErrorEmpty("Enter all fields correctly");
                    console.error("Error signing in with password and email", error);
                }
                else{
                    if(errorEmpty){
                        setErrorEmpty(null);
                    }
                    setError("Error signing in with password and email");
                    console.error("Error signing in with password and email", error);
                }
            });
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if(name==="userEmail"){
            setEmail(value)
        }

        else if(name==="userPassword"){
            setPassword(value)
        }
    }


    return(
       <div className="SignIn">
            <div className="container-fluid">
          {isTabletOrMobileDevice && <><div style={{marginTop:'50px'}} className ="col-12 col-sm-6 mx-auto rounded-lg signInForm">
          <form className="px-4 py-4" noValidate>
          <div style={{fontSize:'22px',fontWeight:'600', letterSpacing:'1.0'}} className="formHeading text-center">PinGram</div>
            <div className="form-group mt-2">
                <label style={{fontWeight:'400', fontSize:'15px'}} for="exampleInputEmail1">Email address</label>
                {(error===null&&errorEmpty===null) && <input type="email" id="custom2" name="userEmail" placeholder="Eg: john.doe@gmail.com" className="form-control" onChange={event => onChangeHandler(event)}/>}
                {(error || errorEmpty) && <input type="email" name="userEmail" placeholder="Eg: john.doe@gmail.com" className="form-control is-invalid" id="exampleInputEmail1" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontWeight:'400', fontSize:'15px'}} for="exampleInputPassword1">Password</label>
                {(error===null&&errorEmpty===null) && <input type="password" id="custom2" name="userPassword" className="form-control" placeholder="Your Password"  required onChange={event => onChangeHandler(event)}/>}
                {(error || errorEmpty) && <input type="password" name="userPassword" className="form-control is-invalid" placeholder="Your Password" id="exampleInputPassword1" required onChange={event => onChangeHandler(event)}/>}
                {error && <div id="exampleInputPassword1" className="invalid-feedback">
                    Invalid username or password
                </div>}
                {errorEmpty && <div id="exampleInputPassword1" className="invalid-feedback">
                    Enter all fields correctly
                </div>}
            </div>
            {!loadingOne && <button id="signIn" style={{color:"#fff", backgroundColor:'#388e3c'}} type="submit" className="btn col-12 mt-2 mb-2" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Sign In</button>}
            {loadingOne && <button style={{backgroundColor:'#66bb6a', color:"#fff"}} type="submit" className="btn col-12 mt-2 mb-2" disabled>
            {/* <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                Loading...
            </button>}
            <div className="text-center">
                or
            </div>
           {!loadingTwo && <button type="submit" id="signInGoogle" style={{color:'#fff', backgroundColor:'#d32f2f'}} className="btn col-12 mt-2 mb-2"  onClick={() => {
            try{
                setLoadingTwo(true)
                signInWithGoogle();
            }
            catch(error){
                console.error("Error signing in with Google", error);
                setLoadingTwo(false)
            }
          }}>
                Sign In with Google
              <i class="fab fa-google px-2"></i>
            </button>}
            {loadingTwo && <button style={{backgroundColor:'#ef5350', color:'#fff'}} className="btn col-12 mt-2 mb-2" disabled>
            <span className="spinner-grow spinner-grow-sm pr-1" role="status" aria-hidden="true"></span>
                Loading...
            </button>}
            <p className="text-center my-2">
                Don't have an account?{" "}
                <Link to="signUp" className="text-primary">
                    Sign up here
                </Link>{" "}
                <br />{" "}
                <Link to = "passwordReset" className="text-primary">
                    Forgot Password?
                </Link>
            </p>
            </form>
        </div></>}
        
        {isDesktopOrLaptop && <><div style={{marginTop:'50px'}} className ="col-12 col-sm-6 mx-auto shadow rounded-lg signInForm">
          <form className="px-4 py-4" noValidate>
          <div style={{fontSize:'22px',fontWeight:'600', letterSpacing:'1.0'}} className="formHeading text-center">PinGram</div>
            <div className="form-group mt-2">
                <label style={{fontWeight:'400', fontSize:'15px'}} for="exampleInputEmail1">Email address</label>
                {(error===null&&errorEmpty===null) && <input type="email" id="custom2" name="userEmail" placeholder="Eg: john.doe@gmail.com" className="form-control" onChange={event => onChangeHandler(event)}/>}
                {(error || errorEmpty) && <input type="email" name="userEmail" placeholder="Eg: john.doe@gmail.com" className="form-control is-invalid" id="exampleInputEmail1" onChange={event => onChangeHandler(event)}/>}
            </div>
            <div class="form-group mt-4">
                <label style={{fontWeight:'400', fontSize:'15px'}} for="exampleInputPassword1">Password</label>
                {(error===null&&errorEmpty===null) && <input type="password" id="custom2" name="userPassword" className="form-control" placeholder="Your Password"  required onChange={event => onChangeHandler(event)}/>}
                {(error || errorEmpty) && <input type="password" name="userPassword" className="form-control is-invalid" placeholder="Your Password" id="exampleInputPassword1" required onChange={event => onChangeHandler(event)}/>}
                {error && <div id="exampleInputPassword1" className="invalid-feedback">
                    Invalid username or password
                </div>}
                {errorEmpty && <div id="exampleInputPassword1" className="invalid-feedback">
                    Enter all fields correctly
                </div>}
            </div>
            {!loadingOne && <button id="signIn" style={{color:"#fff", backgroundColor:'#388e3c'}} type="submit" className="btn col-12 mt-2 mb-2" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Sign In</button>}
            {loadingOne && <button style={{backgroundColor:'#66bb6a', color:"#fff"}} type="submit" className="btn col-12 mt-2 mb-2" disabled>
            {/* <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> */}
                Loading...
            </button>}
            <div className="text-center">
                or
            </div>
           {!loadingTwo && <button type="submit" id="signInGoogle" style={{color:'#fff', backgroundColor:'#d32f2f'}} className="btn col-12 mt-2 mb-2"  onClick={() => {
            try{
                setLoadingTwo(true)
                signInWithGoogle();
            }
            catch(error){
                console.error("Error signing in with Google", error);
                setLoadingTwo(false)
            }
          }}>
                Sign In with Google
              <i class="fab fa-google px-2"></i>
            </button>}
            {loadingTwo && <button style={{backgroundColor:'#ef5350', color:'#fff'}} className="btn col-12 mt-2 mb-2" disabled>
            <span className="spinner-grow spinner-grow-sm pr-1" role="status" aria-hidden="true"></span>
                Loading...
            </button>}
            <p className="text-center my-2">
                Don't have an account?{" "}
                <Link to="signUp" className="text-primary">
                    Sign up here
                </Link>{" "}
                <br />{" "}
                <Link to = "passwordReset" className="text-primary">
                    Forgot Password?
                </Link>
            </p>
            </form>
        </div></>}

          </div>
       </div>
    )
}

export default SignIn