import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, activeRoute }) => {
    return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            {isSignedIn
                ? <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign out</p>
                : ( activeRoute === 'signin' || activeRoute === 'signout')
                    ? <p onClick={() => onRouteChange('register')} className="f4 link dim black underline pa3 pointer">Register</p>
                    : ( activeRoute === 'register')
                    ? <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
                    : <p onClick={() => onRouteChange('register')} className="f4 link dim black underline pa3 pointer">Register</p>
            }
        </nav>
    );
}

export default Navigation;
