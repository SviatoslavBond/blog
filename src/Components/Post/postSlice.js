import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import axios from '../../utils/axios'
const initialState = {
	posts: {
		items: [],
		postsLoadingStatus: 'loading'
	},

};


export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async () => {
		const { data } = await axios.get('/posts');
		return data.posts
	}
)
const fetchPostsStatus = {
	[fetchPosts.pending]: (state) => {
		state.posts.postsLoadingStatus = 'loading'
	},
	[fetchPosts.fulfilled]: (state, action) => {
		state.posts.postsLoadingStatus = 'loaded'

		state.posts.items = action.payload
	},
	[fetchPosts.rejected]: (state) => {
		state.posts.postsLoadingStatus = 'error'
	}
}





const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		deletePostById: (state, action) => {
			state.posts.items = state.posts.items.filter((item) => item._id !== action.payload)
		},
		addCreatedPost: (state, action) => {
			state.posts.items.push(action.payload);
		},
		updatePost: (state, action) => {
			state.posts.items = state.posts.items.map(post => post._id === action.payload._id ? action.payload : post)
		}

	},
	extraReducers: {
		...fetchPostsStatus,
	}
})

export const postsReducer = postsSlice.reducer
const { deletePostById, addCreatedPost, updatePost } = postsSlice.actions;
export { deletePostById, addCreatedPost, updatePost };