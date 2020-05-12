import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            {isSignedIn
                ? <p onClick={() => onRouteChange('SignOut')} className="f3 link dim black underline pa3 pointer">Sign out</p>
                : ( route === 'SignIn')
                    ? <p onClick={() => onRouteChange('Register')} className="f4 link dim black underline pa3 pointer">Register</p>
                    : <p onClick={() => onRouteChange('SignIn')} className="f3 link dim black underline pa3 pointer">Sign In</p>
            }
        </nav>
    );
}

export default Navigation;
