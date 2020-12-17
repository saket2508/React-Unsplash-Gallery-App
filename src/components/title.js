import React, {useState} from 'react';
import Switch from '@material-ui/core/Switch';


export default function Title({ userName, auth, darkModeToggle, theme }){

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
                            <label class="switch">
                                <input type="checkbox" checked={theme==="dark"} onChange={() => changeTheme()}/>
                                <span class="slider round"></span>
                            </label>
                        </div>
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontSize:'3rem;'}}><i className="fa fa-user"></i><span className="caret"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                {/* <a class="dropdown-item" href="#">Your Collection</a> */}
                                <a class="dropdown-item" href="#" onClick={() => {auth.signOut()}}>Sign Out</a>
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