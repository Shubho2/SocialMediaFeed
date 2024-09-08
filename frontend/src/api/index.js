import axios from 'axios';
import { extractUserData } from '../utils/helper';

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001', accessControlAllowOrigin: '*' });

API.interceptors.request.use((request) => {
    let user = extractUserData();
    if(user?.token) request.headers.Authorization = `Bearer ${user.token}`;
    return request;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);