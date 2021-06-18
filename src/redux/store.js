import { createStore, applyMiddleware } from 'redux';
// Logger is a middleware that is not needed but that is useful for understanding
// what is happening. It just catches actions and logs them before they reach the store. 
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
