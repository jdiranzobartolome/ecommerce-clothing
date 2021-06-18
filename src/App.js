import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// this is gives us the auth state of a logged in user. 
// So we need to send this as props to the components that need authorization
// We need to store all this info in the app, so we make App.js
// into a class element so it can have a state.
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  // The communication (subscription) with firebase is an open subscription. 
  // In other words, a listener is set up and the communication is always open for
  // firebase to communicate with the app. That is why it is enough to call the 
  // auth.onAuthStateChanged once, when mounting. It is a listener so it will be listening
  // the whole time. However, it is important to unsibscribe when the website is closed, 
  // otherwise the coneccion will be open, the listener will continue to listen and memory 
  // leaks might be produced. For unsubscribing we need something to unsusbscribe for
  // so we create a variable for subscribing and unsubscribing. 
  // More info: https://stackoverflow.com/questions/59223510/why-do-i-need-to-unsubscribe-to-onauthstatechanged-in-firebase
  unsubscribeFromAuth = null;

  componentDidMount() {
    // Firebase gives us easily info about the logged in user and 
    // it gives us persistance of our user sessions without the need for us
    // to do anything else. 

    //Listening to uthentication state changes from firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        // Listener that listens to any changes on the snapShot data. 
        // We do not change the user data in out website, so it will not trigger except
        // for the first time, where it just triggers once for giving the original snapShot
        // info. That is what we use here.  
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

        });
        
      } else {
        // If the userAuth is null, we still need to set the currentUser to null. 
        this.setState({
          currentUser: userAuth
        })
      }
      
    })
  }

  componentWillUnmount() {
    // stop listening to authentication state changed from firebase
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/'component={HomePage} />
          <Route  path='/shop'component={ShopPage} />
          <Route  path='/signin'component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
