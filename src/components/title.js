import React, {useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Brightness6TwoToneIcon from '@material-ui/icons/Brightness6TwoTone';
import Brightness2TwoToneIcon from '@material-ui/icons/Brightness2TwoTone';
import { IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, pink } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    pink: {
        color: theme.palette.getContrastText(pink[300]),
        backgroundColor:pink[300],
        // marginTop:theme.spacing(3)
      },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
  }));

export default function Title({ userName, auth, darkModeToggle, theme }){
    const classes = useStyles();
    const [checked, setChecked] = useState(false)

    const changeTheme = () => {
        darkModeToggle();
    }


    const signOut = () => {
        console.log('Signing out')
        if(userName){
            auth.signOut();
        }
    }


    return(
        <div className="title">
          <div className="navbar">
            <div className="container-fluid">
                    <h1>PinGram</h1>
                    <div style={{marginTop:'-5px'}} className="header-icons">
                        {/* <div className="icon"><i class="fab fa-github"></i></div>
                        <div className="icon"><i class="fab fa-twitter"></i></div>
                        <div className="icon"><i class="fab fa-instagram"></i></div> */}
                        <div style={{marginBottom:'-7px'}}>
                            {/* <label class="switch">
                                <input type="checkbox" checked={theme==="dark"} onChange={() => changeTheme()}/>
                                <span class="slider round"></span>
                            </label> */}
                            <div style={{position: 'relative', display: 'inline-block', marginTop:'-5px'}}>
                               <IconButton style={{border:"none", outline:"none"}} onClick={() => changeTheme()}>
                                {theme==="dark" && <Brightness6TwoToneIcon fontSize="large" style={{color: "#fff"}}/>}
                                {theme==="light" && <Brightness2TwoToneIcon fontSize="large" style={{color: "#f48fb1"}}/>}
                               </IconButton>
                            </div>
                        </div>
                           <div style={{marginBottom:'-2px'}}>
                           <a className="nav-link dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontSize:'3rem;'}}>
                            {theme==="light" && <Avatar className={classes.pink} alt={userName}>{userName[0].toUpperCase()}</Avatar>}
                            {theme==="dark" && <Avatar className={classes.purple} alt={userName}>{userName[0].toUpperCase()}</Avatar>}
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                {/* <a class="dropdown-item" href="#">Your Collection</a> */}
                                <a class="dropdown-item" href="#" onClick={() => {auth.signOut()}}>Sign Out</a>
                            </div>
                           </div>
                    </div>
                </div>
          </div>
            {userName!==null && <h2>Welcome, { userName }</h2>}
            {userName===null && <h2>Welcome</h2>}
            <p>Search free high-resolution photos</p>
      </div>
    )
}