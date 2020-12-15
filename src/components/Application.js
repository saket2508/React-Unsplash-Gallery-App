import React, { useContext } from 'react';
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import PasswordReset from "./PasswordReset";
import HomePage from './homePage';
import { UserContext } from '../providers/userProvider';

export default function Application(){
  const user = useContext(UserContext);
  console.log(user)
    return(
        user ?
        <HomePage/>
        :
        <Router basepath={process.env.PUBLIC_URL}>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>
    )
}