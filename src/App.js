import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './pages/Loggin/authSlice';
import Header from './Components/Header/Header'
import Login from './pages/Loggin/Login';
import AuthPage from './pages/AuthPage/AuthPage';
import { Home } from './pages/Home/Home';
import { FullPost } from './pages/FullPost/FullPost';
import { AddPost } from './pages/AddPost/index'
import './index.scss';
import { useEffect } from 'react';
import DrawerAppBar from './Components/TestHeader/HeaderResponseble';

// export const serverUrl = 'https://blog-backend-production-79dc.up.railway.app';
// export const url = 'http://localhost:4444';


function App() {

	const dispatch = useDispatch();
	useEffect(() => {
		const token = window.localStorage.getItem('token');
		if (token) {
			dispatch(fetchAuthMe());
		}
	}, []);
	return (
		<div className="App">
			<DrawerAppBar />
			{/* <Header /> */}
			<div className='container main container-lg'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path="/login" element={< Login />} />
					<Route path="/registration" element={<AuthPage />} />
					<Route path="/posts/:id" element={<FullPost />} />
					<Route path='/add-post' element={<AddPost />} />
					<Route path='/posts/:id/edit' element={<AddPost />} />
				</Routes>
			</div>

		</div>
	);
}

export default App;
