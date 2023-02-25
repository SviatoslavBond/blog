import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'
const initialState = {
	items: [],
	isComentsLoading: "idle"
}

export const fetchComents = createAsyncThunk(
	'coments/fetchComents',
	async (id) => {
		const { data } = await axios.get(`/coment/${id}`);
		return data
	}
)



const comentsSlice = createSlice({
	name: 'coments',
	initialState,
	reducers: {
		addComent: (state, action) => {
			state.items.push(action.payload);
		}
	},
	extraReducers: {
		[fetchComents.pending]: state => {
			state.isComentsLoading = 'loading'
		},
		[fetchComents.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.isComentsLoading = 'loaded'
		},
		[fetchComents.rejected]: state => {
			state.isComentsLoading = 'error'
		}
	}

})

const comentsReducer = comentsSlice.reducer;
export { comentsReducer };
const { addComent } = comentsSlice.actions;
export { addComent }
