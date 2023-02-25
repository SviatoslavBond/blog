import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "../Components/Post/postSlice";
import { tagsReducer } from "../Components/TagsBlock/tagsSlice";
import { authReducer } from "../pages/Loggin/authSlice";
import { comentsReducer } from "../Components/ComentsBlock/comentSlice";
const store = configureStore({
	reducer: {
		posts: postsReducer,
		tags: tagsReducer,
		auth: authReducer,
		coments: comentsReducer
	},
	devTools: process.env.NODE_ENV !== 'production',
})
export default store;