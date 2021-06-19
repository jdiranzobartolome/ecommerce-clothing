// This root-reducer is the reducer to which all of the rest reducers we write will go into. 
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// since we are going to use local storage, we import
// the local storage version of the redux-persist lab.
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// 'redux-persist' configuration
const persistConfig = {
    key: 'root',
    storage,
    // Array with the reducers we want to p"persist". Since user 
    // info is handled and saved by firebase database, we only need 
    // to persist the cart. 
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

// Like this, we have a modified version of our root reducer with 
// the persist capabilities from 'redux-persist' library.
export default persistReducer(persistConfig, rootReducer);