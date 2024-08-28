import * as api from '../api';
import ACTION_TYPES from '../constants/actionTypes';

// Action Creators: redux-thunk allows us to return functions instead of actions
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: ACTION_TYPES.FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: ACTION_TYPES.CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: ACTION_TYPES.CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: ACTION_TYPES.DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
} 

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: ACTION_TYPES.LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}