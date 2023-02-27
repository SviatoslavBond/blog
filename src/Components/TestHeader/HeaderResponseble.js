

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../../pages/Loggin/authSlice';
import { logout } from '../../pages/Loggin/authSlice';
import { Avatar } from '@mui/material';
import styles from './Header.module.scss'
import UserInfo from "./UserInfo";

const drawerWidth = 240;


function DrawerAppBar(props) {

	const [mobileOpen, setMobileOpen] = React.useState(false);

	const isAuth = useSelector(selectIsAuth);
	const authUserInfo = useSelector((state) => state.auth.data);
	const dispatch = useDispatch();

	const onLogout = async () => {
		if (window.confirm('Ви дійсно хочете вийти з акаунта?')) {
			await dispatch(logout());
			window.localStorage.removeItem('token');

		}
	}


	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box className={styles.userInfo} onClick={handleDrawerToggle} >

			{isAuth ?
				<ul>
					<li>
						<Avatar
							className={styles.avatar}
							src={authUserInfo.avatarURL}
						/>
						<p className={styles.fullname} >{authUserInfo.fullname}</p>
					</li>

					<li>
						<Link to='/add-post'><button className="btn btn-primary mx-1">Create post</button></Link>
					</li>
					<li>
						<Link to='/'><button onClick={() => onLogout()} className="btn btn-danger px-4 mx-1">Log out</button></Link>
					</li>
				</ul> :
				<ul>
					<li>
						<Link to='/login'><button className="btn btn-outline-success mx-1">Sign in</button></Link>
					</li>
					<li>
						<Link to='/registration' ><button className="btn btn-primary px-4 mx-1">Sign up</button></Link>
					</li>
				</ul>
			}

		</Box>
	);


	return (
		<Box sx={{ display: "flex" }}>

			<AppBar sx={{ backgroundColor: 'rgb(90, 90, 90)' }} component="nav">
				<Toolbar >


					<Box sx={{ width: '100%' }} className='d-flex  justify-content-between align-items-center' >

						<Box  >
							<Link to='/' className=' btn btn-light px-5 py-1.5 text-decoration-none text-dark' href="#">BLOG</Link>
						</Box>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { md: "none" } }}>
							<MenuIcon />
						</IconButton>

						<Box sx={{ display: { xs: "none", md: "block" } }}>
							<UserInfo isAuth={isAuth} authUserInfo={authUserInfo} onLogout={onLogout} />
						</Box>
					</Box>

				</Toolbar>
			</AppBar>

			<Box component="nav">
				<Drawer
					anchor={'right'}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							backgroundColor: '#333'
						}
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}

export default DrawerAppBar;
