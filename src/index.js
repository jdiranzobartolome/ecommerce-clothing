import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import store from './redux/store';

ReactDOM.render(
  // The prodiver gives all the components access to the store to dispatch actions to, 
  // or receive states from. The store "stores" the root-reducer which combines all the individual 
  // reducers, each one with its state and sets of actions.types to which react to.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

