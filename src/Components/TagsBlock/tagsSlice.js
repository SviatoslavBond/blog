import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'
const initialState = {
	tags: {
		items: [],
		tagsLoadingStatus: 'loading'
	}
};

export const fetchTags = createAsyncThunk(
	'tags/fetchTags',
	async () => {
		const { data } = await axios.get('/tags');
		return data.tags
	}
)

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {

	},
	extraReducers: {

		[fetchTags.pending]: (state) => {
			state.tags.tagsLoadingStatus = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.tagsLoadingStatus = 'loaded'

			state.tags.items = action.payload
		},
		[fetchTags.rejected]: (state) => {
			state.tags.tagsLoadingStatus = 'error'
		}

	}
})

export const tagsReducer = tagsSlice.reducer
