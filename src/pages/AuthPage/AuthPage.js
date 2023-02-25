import React, { useRef, useState } from "react";
import { TextField, Typography, Paper, Avatar } from "@mui/material";
import { Button } from "@mui/material";
import styles from './AuthPage.module.scss';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchRegister } from "../Loggin/authSlice";
import { useForm } from "react-hook-form";
import compressFile from "../../utils/compressFile";
import axios from '../../utils/axios'
const AuthPage = () => {
	const isAuth = useSelector(selectIsAuth)
	const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
		defaultValues: {
			email: '',
			password: '',
			fullname: ''
		},
		mode: 'onChange',
	});
	const [imgUrl, setImgUrl] = useState('');

	const dispatch = useDispatch()
	const inputFile = useRef()

	const onSubmit = async (values) => {
		const userData = {
			...values,
			avatarURL: `http://localhost:4444${imgUrl}`
		}
		const data = await dispatch(fetchRegister(userData));
		// console.log(data.p)
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	const handleFileInput = async (e) => {
		try {
			const file = e.target.files[0];
			const compressedFile = await compressFile(file, 'userImg');

			const { data } = await axios.post('/auth/upload/user-avatar', compressedFile);

			setImgUrl(data.url)
		} catch (error) {
			console.warn(error)
		}

	}

	if (isAuth) {
		return <Navigate to='/' />
	}


	return (

		<Paper classes={{ root: styles.wrap }}>
			<Typography
				variant="h5"
				component='p'
				className={styles.title}
			>
				Створити акаунт
			</Typography>
			<div onClick={() => inputFile.current.click()} className={styles.avatar}>
				{
					imgUrl ? <img className={styles.image} src={`http://localhost:4444${imgUrl}`} alt='user-avatar' /> :
						<Avatar sx={{ width: 100, height: 100 }} />
				}

			</div>
			<input ref={inputFile} type="file" hidden onChange={handleFileInput} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.authForm}>
				<TextField
					{...register('fullname', {
						required: 'Вкажіть ваше імя',

					})}
					helperText={errors.fullname?.message}
					error={Boolean(errors.fullname?.message)}
					label="Fullname"
					variant="outlined"
					margin="normal"
				/>
				<TextField
					{...register('email', {
						required: 'Вкажіть вашу почту2',
						pattern: {
							value: /^\S+@\S+\.\S+$/,
							message: "Invalid email address",
						}
					})}
					helperText={errors.email?.message}
					error={Boolean(errors.email?.message)}
					label="Login"
					variant="outlined"
					margin="normal" />
				<TextField
					{...register('password', {
						required: 'Вкажіть вашу пароль',
						minLength: {
							value: 8,
							message: 'Пароль має містити мінімум 8 символів'
						}
					})}
					helperText={errors.password?.message}
					error={Boolean(errors.password?.message)}
					label="Password"
					variant="outlined"
					margin="normal"
					type={'password'}
					sx={{ mb: 3 }} />
				<div className={styles.existAcc}>
					<span>
						Ви вже маєте акаунт?
					</span>
					<Link to='/login' className={styles.existAccLog} > Увійти!</Link>
				</div>
				<Button disabled={!isValid} type="submit" variant="contained" disableElevation>
					Sign in
				</Button>
			</form>
		</Paper>

	)
}

export default AuthPage