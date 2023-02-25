import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, fetchAuthMe } from './pages/Loggin/authSlice';
import Header from './Components/Header/Header'
import Login from './pages/Loggin/Login';
import AuthPage from './pages/AuthPage/AuthPage';
import { Home } from './pages/Home/Home';
import { FullPost } from './pages/FullPost/FullPost';
import { AddPost } from './pages/AddPost/index'
import './index.scss';
import { useEffect } from 'react';

function App() {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	return (
		<div className="App">
			<Header />
			<div className='container'>
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
