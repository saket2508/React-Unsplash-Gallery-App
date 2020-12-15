import React from 'react';


export default function Title({ userName, auth }){

    const signOut = () => {
        console.log('Signing out')
        if(userName){
            auth.signOut();
        }
    }

    return(
        <div className="title">
          <div className="navbar">
            <div className="container">
                    <h1>PinGram</h1>
                    <div style={{marginTop:'-5px'}} className="header-icons">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div className="icon"><i class="fab fa-twitter"></i></div>
                        <div className="icon"><i class="fab fa-instagram"></i></div>
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'#f48fb1', fontSize:'2rem;'}}><i className="fa fa-user"></i><span className="caret"></span>
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