import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';

import { store, persistor } from './redux/store';

ReactDOM.render(
  // The prodiver gives all the components access to the store to dispatch actions to, 
  // or receive states from. The store "stores" the root-reducer which combines all the individual 
  // reducers, each one with its state and sets of actions.types to which react to.
  <Provider store={store}>
    <BrowserRouter>
    {/* Just like this, with this persistor, the reducers that have been
    defined for the persistor to persist, will have their state stored on
    browser storage instead of falling back to the initial states 
    when resetting the browser or session.  */}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

