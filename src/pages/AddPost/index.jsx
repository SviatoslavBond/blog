import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../Loggin/authSlice';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { serverUrl } from '../../utils/serverUrl';
import { addCreatedPost, updatePost } from '../../Components/Post/postSlice';
import compressFile from '../../utils/compressFile';

export const AddPost = () => {
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const [imageUrl, setImageUrl] = React.useState('');
	const [text, setText] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const inputFileRef = React.useRef(null);
	const [isEdit, setIsEdit] = useState(null);
	const { id } = useParams();
	const dispatch = useDispatch();

	const handleChangeFile = async (event) => {
		try {
			const file = event.target.files[0];
			const compressedFile = await compressFile(file, 'image');
			const { data } = await axios.post('/upload', compressedFile);
			setImageUrl(data.url)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id) {
			setIsEdit(true);
			axios.get(`/posts/${id}`)
				.then(res => {
					const { text, title, imgUrl, tags } = res.data;
					setText(text);
					setTitle(title);
					setImageUrl(imgUrl);
					setTags(tags.join(','))
				})
		}

	}, [id])

	const onClickRemoveImage = () => {
		axios.delete('/deleteImg', { data: { path: imageUrl } })
			.then(res => setImageUrl(''))
	};

	const onChange = React.useCallback((value) => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setLoading(true);
			const fields = {
				text,
				imgUrl: imageUrl,
				title,
				tags: tags.replace(/[.,]/g, '').replace(/\s+/g, ' ').trim().split(' ')
			}
			if (isEdit) {
				const { data } = await axios.patch(`/posts/${id}`, fields);
				dispatch(updatePost(data))
				console.log(data);
				navigate(`/posts/${id}`);
			} else {
				const { data } = await axios.post('/posts', fields);
				dispatch(addCreatedPost(data))
				navigate(`/posts/${data._id}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);
	if (!isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
				Завантажити фото
			</Button>

			<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
			{imageUrl && (
				<>
					<Button className='ms-3' variant="contained" color="error" onClick={onClickRemoveImage}>
						Видалити
					</Button>
					<div className={styles.previewImage}>
						<img className={styles.image} src={`${process.env.REACT_APP_API_URL || serverUrl}${imageUrl}`} alt="Uploaded" />
					</div>

				</>
			)}

			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Заголовок статьи..."
				fullWidth
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<TextField
				onChange={e => setTags(e.target.value)}
				classes={{ root: styles.tags }} variant="standard" value={tags} placeholder="Тэги" fullWidth />
			<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{isEdit ? "Зберегти" : 'Опублікувати'}
				</Button>
				<Link to='/'>
					<Button size="large">Відміна</Button>
				</Link>
			</div>
		</Paper>
	);
};
