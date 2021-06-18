import React from 'react';

import './custom-button.style.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    //The {...otherProps} comming from the original form is passing
    // things like type='input'...etc. Children means "anything that is 
    // whithin the parent. In this case, the words "Sign in".
    // For example, the "children" of this button, would be {children}.
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} 
    {...otherProps }>
        {children}
    </button>
)

export default CustomButton