import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        clearPosts: (state) => {
            state.posts = [];
        },
    },
});

export const { setPosts, clearPosts } = postSlice.actions;
export default postSlice.reducer;