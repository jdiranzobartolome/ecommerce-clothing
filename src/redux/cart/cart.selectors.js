//All this comes from the library called "reselect" (npm install reselect)
// It is a really useful library for creating selectors which are then passed to the 
// mapToProps. It might seem like it just makes things complex but it has a huge adventages. 
// 1) The state gets cached when it is sent to the props. So if later the same state is sent to the props, 
// the library knows the output will be the same, and that there is no need to render again. 
// This is mostly for avoiding all the components who have a mapToProps to render everytime there is 
// an action dispatched. 

import { createSelector } from 'reselect';

const selectCart = state => state.cart; 

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity,
            0
        )
)