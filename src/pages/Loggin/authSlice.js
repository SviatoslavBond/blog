import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'
const initialState = {
	data: null,
	authLoadingStatus: "loading"

};


export const fetchAuth = createAsyncThunk(
	'auth/login',
	async (params) => {
		const { data } = await axios.post('/auth/login', params);
		console.log(data);

		return data
	}
)
const fetchAuthStates = {
	[fetchAuth.pending]: (state) => {
		state.authLoadingStatus = 'loading'
	},
	[fetchAuth.fulfilled]: (state, action) => {
		state.authLoadingStatus = 'loaded'
		state.data = action.payload
	},
	[fetchAuth.rejected]: (state) => {
		state.authLoadingStatus = 'error'
	}
}

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchUser',
	async () => {
		const { data } = await axios.get('/auth/me');
		return data
	}
)
const fetchAuthMeStates = {
	[fetchAuthMe.pending]: (state) => {
		state.authLoadingStatus = 'loading'
	},
	[fetchAuthMe.fulfilled]: (state, action) => {
		state.authLoadingStatus = 'loaded'
		state.data = action.payload
	},
	[fetchAuthMe.rejected]: (state) => {
		state.authLoadingStatus = 'error'
	}
}

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params) => {
		const response = await axios.post('/auth/register', params);
		const { data } = response
		return data;
	})
const fetchRegisterState = {
	[fetchRegister.pending]: (state) => {
		state.authLoadingStatus = 'loading'
	},
	[fetchRegister.fulfilled]: (state, action) => {
		state.authLoadingStatus = 'loaded'
		state.data = action.payload
	},
	[fetchRegister.rejected]: (state) => {
		state.authLoadingStatus = 'error'
	}
}


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		}
	},
	extraReducers: {
		...fetchAuthStates,
		...fetchAuthMeStates,
		...fetchRegisterState
	}
})

export const selectIsAuth = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectUserIdAuth = (state) => state.auth?.data?._id;