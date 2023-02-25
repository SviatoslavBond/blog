import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography, Paper } from "@mui/material";
import { Button } from "@mui/material";
import styles from './Login.module.scss';
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectIsAuth } from "./authSlice";
import { fetchAuth } from "./authSlice";

const Login = () => {
	const isAuth = useSelector(selectIsAuth)
	const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
		defaultValues: {
			email: 'test@mail.test',
			password: '12345'
		},
		mode: 'onSubmit',
	});
	const dispatch = useDispatch()


	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuth(values));
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
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
				className={`${styles.title} mb-1 mt-4`}>
				Вхід в акаунт
			</Typography>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles['loginForm']}>
				<TextField
					{...register('email', {
						required: 'Вкажіть вашу почту2',

						pattern: {
							value: /^\S+@\S+\.\S+$/,
							message: "Invalid email address",
						},
					})}
					helperText={errors.email?.message}
					error={Boolean(errors.email?.message)}
					label="Login"
					variant="outlined"
					margin="normal" />
				<TextField
					{...register('password', {
						required: 'Вкажіть ваш пароль	'
					})}
					onChange={(e) => {

					}}
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					label="Password"
					variant="outlined"
					margin="normal"
					type={'password'}
					className="mb-4" />
				<div className={styles.existAcc}>
					<span>
						Не маєте акаунта?
					</span>
					<Link to='/registration' className={styles.existAccLog} > Зарееструйтеся!</Link>
				</div>
				<Button type="submit" variant="contained" disableElevation>
					Log in
				</Button>
			</form>
		</Paper>
	)
}

export default Login