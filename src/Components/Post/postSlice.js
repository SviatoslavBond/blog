import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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


const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		fetchDeletePostById: (state, action) => {
			console.log(action);
			state.posts.items = state.posts.items.filter((item) => item._id !== action.payload)
		}
	},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.postsLoadingStatus = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.postsLoadingStatus = 'loaded'

			state.posts.items = action.payload
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.postsLoadingStatus = 'error'
		},
	}
})

export const postsReducer = postsSlice.reducer
const { fetchDeletePostById } = postsSlice.actions;
export { fetchDeletePostById };