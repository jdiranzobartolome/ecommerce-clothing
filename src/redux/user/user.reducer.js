import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }


        // If none of the actions match (this is needed 
        //since all reducers receive all actions that are triggered)
        default:
            return state;
    }
}

export default userReducer;