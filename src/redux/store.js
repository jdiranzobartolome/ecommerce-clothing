import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// Logger is a middleware that is not needed but that is useful for understanding
// what is happening. It just catches actions and logs them before they reach the store. 
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// This comes from the 'redux-persist' library. 
// It is a library that allow us to easily store data 
// in session storage or local storage.
// Here we create a "persisted" verison of our store. 
export const persistor = persistStore(store);



