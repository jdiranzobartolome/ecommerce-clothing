//All this comes from the library called "reselect" (npm install reselect)
// It is a really useful library for creating selectors which are then passed to the 
// mapToProps. It might seem like it just makes things complex but it has a huge adventages. 
// 1) The state gets cached when it is sent to the props. So if later the same state is sent to the props, 
// the library knows the output will be the same, and that there is no need to render again. 
// 2) In addition, the library also memoize the different functions (like, in this case, the one present
// in selectCartItemsCount) and does not perform them if the result is cached. 

// NOTE: Redux also has a shallow comparison for primitive types so the components do not always get rendered, it 
// is more complex than that. But still the library gives better performance. 


import { createSelector } from 'reselect';

const selectCart = state => state.cart; 

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

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

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity*cartItem.price,
            0
        )
)