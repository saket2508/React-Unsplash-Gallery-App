import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Raleway, sans-serif;
    transition: all 0.50s linear;
  }

  .SignIn #signInGoogle, .SignUp #signInWithGoogle {
    backgroundColor: ${({ theme }) => theme.signInWithGoogleColor};
  }

  .dropdown-menu{
    background-color: ${({ theme }) => theme.formColor}  
}

  .dropdown-item{
    color: ${({ theme }) => theme.tagText}
}


  .SignIn #signInGoogle:hover, .SignUp #signInWithGoogle:hover{
    background-color: #e53935;
    }
  
  .SignIn #signIn:hover, .SignUp #signIn:hover {
    background-color: #4caf50;
    }

  .SignIn #signIn, .SignUp #signIn {
    backgroundColor: ${({ theme }) => theme.signInColor};
  }

  .navbar{
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.primary};
  }

  #custom:focus {   
    border-color: ${({ theme }) => theme.borderColor};
    box-shadow: 0 0 0 0.0rem rgb(255,192,203);
    color: ${({ theme }) => theme.tagText}
  }

  #custom{
    background:${({ theme }) => theme.searchBar};
    border-radius: 25px;
    border:${({ theme }) => theme.searchBorder};
    color: ${({ theme }) => theme.tagText}
  }

  .tag {
    display: inline block;
    background-color: ${({ theme }) => theme.tag};
    color:${({ theme }) => theme.tagText};
    font-weight: 500;
    font-size: 12px;
  }

  .signUpForm {
    background-color: ${({ theme }) => theme.formColor}
  }

  .cardTheme {
    background-color: ${({ theme }) => theme.formColor}
  }

  .cardTheme .photo-header, .cardTheme a{
    color: ${({ theme }) => theme.text};
    font-family: Raleway, sans-serif;
    size
  }

  .signInForm {
    background-color: ${({ theme }) => theme.formColor}
  }

  .SignUp #custom2, .SignIn #custom2, .PasswordReset #custom2{
    background:${({ theme }) => theme.searchBar};
    border:${({ theme }) => theme.searchBorder};
  }

  .SignUp #custom2:focus, .SignIn #custom2:focus, .PasswordReset #custom2:focus{
    border:${({ theme }) => theme.searchBorder};
    box-shadow: 0 0 0 0.0rem rgb(255,192,203);
    border-color:${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.tagText}
  }


  .form-control.is-invalid, .was-validated .form-control:invalid {
    background:${({ theme }) => theme.searchBar};
    color: ${({ theme }) => theme.tagText}
  }


  
  #navbarDropdownMenuLink{
    color: ${({ theme }) => theme.primary};
  }

  .SignIn .formHeading, .SignUp .formHeading{
    color: ${({ theme }) => theme.primary};
  }

  .PasswordReset .formHeading{
    color: ${({ theme }) => theme.heading};
  }

  .fa-user{
    color: ${({ theme }) => theme.primary};
  }

  title h1{
    color: ${({ theme }) => theme.primary};
  }

  .caret{
    background-color: ${({ theme }) => theme.primary};
  }
  `
