import * as api from '../api';
import ACTION_TYPES from '../constants/actionTypes';

// Action Creators: redux-thunk allows us to return functions instead of actions

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: ACTION_TYPES.AUTH, payload: data });
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: ACTION_TYPES.AUTH, payload: data });
        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}