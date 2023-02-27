import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
// import { DeleteIcon, EditIcon, EyeIcon, CommentIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import axios from '../../utils/axios';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchDeletePostById } from './postSlice';

export const Post = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const dispatch = useDispatch()
	const theme = useTheme();
	const less900 = useMediaQuery(theme.breakpoints.down('md'));
	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = () => {
		axios.delete(`/posts/${id}`)
			.then(res => dispatch(fetchDeletePostById(id)))
	};




	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>

			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<div className={clsx(styles.boxImg, { 'd-none': less900 && !isFullPost })}>
					<img
						className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
						src={imageUrl}
						alt={title}
					/>
				</div>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
						{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((name) => (
							<li key={name}>
								<Link to={`/tag/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li key={'eye'}>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li key={'coment'}>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
