import ACTION_TYPES from "../constants/actionTypes";
import { storeUserData, clearUserData } from "../utils/helper"; 

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH:
            if (action?.payload) {
                storeUserData(action?.payload);
                return {...state, authData: action?.payload};
            } else if (action?.data) {
                storeUserData(action?.data);
                return {...state, authData: action?.data};
            } else {
                return state;
            }
        case ACTION_TYPES.LOGOUT:
            clearUserData();
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;