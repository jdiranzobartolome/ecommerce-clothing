import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        //This e.target.value is not the same as the one 
        // in the input. It is, but this one is the updated one 
        // as soon as the event triggers. Then we modify the state
        // with that new value, and then the value of the input field,
        // gets updated to that new state. So the user sees how
        // the field he is filling up is getting updated with what he/she writes.
        const { value, name } = event.target;

        // Since the key of objects are always written without '',
        // for using variables, [] is used. 
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>  
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput label='email' name='email' value={this.state.email}
                    handleChange={this.handleChange} required />
                    <FormInput autocomplete="new-password" type='password' label='password' name='password' value={this.state.password}
                    handleChange={this.handleChange} required />
                    
                    <div className="buttons">
                        <CustomButton type="submit">
                            SIGN IN
                        </CustomButton>        
                          {/*Writing isGoogleSignIn will pass a value of true if we do not 
                             give it any value */}
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
                            {'  '}
                            SIGN IN WITH GOOGLE{'  '}
                            {'  '}
                        </CustomButton> 
                    </div>
                             
                </form>
        </div>
        )
        
    }
}

export default SignIn