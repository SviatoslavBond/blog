import React from 'react'
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
const UserInfo = ({ isAuth, authUserInfo, onLogout }) => {

	return (
		<>
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
		</>
	)
}

export default UserInfo