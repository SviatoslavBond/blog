import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { addComent } from "../ComentsBlock/comentSlice";

export const FiledForComent = ({ userAvatar, postId }) => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		const coment = {
			text,
			postId
		}
		axios.post('/coment', coment)
			.then(res => {
				setText('');
				dispatch(addComent(res.data));

			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<div className={styles.root}>

				<Avatar
					classes={{ root: styles.avatar }}
					src={userAvatar}
				/>
				<div className={styles.form}>

					<TextField
						label="Написати коментар"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
					<Button onClick={handleSubmit} variant="contained">Відправити</Button>


				</div>
			</div>
		</>
	);
};
