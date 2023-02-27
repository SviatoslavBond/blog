import axios from "axios";
import { serverUrl } from "./serverUrl";
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL || serverUrl
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config

})
export default instance;
