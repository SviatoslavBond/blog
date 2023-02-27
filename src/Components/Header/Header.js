import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../../pages/Loggin/authSlice';
import { logout } from '../../pages/Loggin/authSlice';
import { Avatar } from '@mui/material';
import styles from './Header.module.scss'

const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const authUserInfo = useSelector((state) => state.auth.data);
	const dispatch = useDispatch();

	const onLogout = async () => {
		if (window.confirm('Ви дійсно хочете вийти з акаунта?')) {
			await dispatch(logout());
			window.localStorage.removeItem('token')

		}
	}


	return (
		<header className={styles.header}>
			<div className='container container-lg' >
				<nav className="">
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<Link to='/' className=' btn btn-light px-5 py-1.5 text-decoration-none text-dark' href="#">BLOG</Link>
						</div>
						<div className=" d-flex">
							{isAuth ?
								<div className={styles.wrapper}>
									<Link to='/add-post'><button className="btn btn-primary mx-1">Create post</button></Link>
									<Link to='/'><button onClick={() => onLogout()} className="btn btn-danger px-4 mx-1">Log out</button></Link>

									<Avatar
										className={styles.avatar}
										src={authUserInfo.avatarURL}
									/>
									<p className={styles.fullname} >{authUserInfo.fullname}</p>
								</div> :
								<div>
									<Link to='/login'><button className="btn btn-outline-success mx-1">Log in</button></Link>
									<Link to='/registration' ><button className="btn btn-primary px-4 mx-1">Sign in</button></Link>

								</div>
							}
						</div>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header