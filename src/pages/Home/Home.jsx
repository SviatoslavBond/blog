import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Post } from '../../Components/Post';
import { TagsBlock } from '../../Components/TagsBlock/TagsBlock'
import { CommentsBlock } from '../../Components/ComentsBlock/CommentsBlock';
import { selectUserIdAuth } from '../Loggin/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../Components/Post/postSlice';
import { fetchTags } from '../../Components/TagsBlock/tagsSlice';
import axios from '../../utils/axios';
import { serverUrl } from '../../utils/serverUrl';
const imgUrl = "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"

export const Home = () => {

	const [tagsLabel, setTagsLabel] = useState(0);
	const { posts } = useSelector((state) => {
		return state.posts
	});
	const { tags } = useSelector((state) => {
		return state.tags
	});
	const [coments, setComents] = useState([]);

	const [comentsLoading, setComentsLoading] = useState(true);

	const userId = useSelector(selectUserIdAuth)

	const isLoading = posts.postsLoadingStatus === 'loading';

	const isTagsLoding = tags.tagsLoadingStatus === "loading";

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
		axios.get('/coment')
			.then(res => {

				setComents(res.data);
				setComentsLoading(false);
			})
			.catch((err) => console.log(err))
	}, []);

	useEffect(() => {
		console.log(posts.items, coments);

	}, [posts, coments])

	// console.log(coments);
	const reg = new RegExp(/\/[^\/]*[^\/]*/);
	const postsItems = (isLoading ? [...Array(5)] : posts.items).map((obj, index) => (


		isLoading ? <Post key={index} isLoading={isLoading} /> :
			<Post
				key={index}
				id={obj._id}
				title={obj.title}
				imageUrl={reg.test(obj.imgUrl) ? `${process.env.API_URL || serverUrl}${obj.imgUrl}` : imgUrl}
				user={obj.user}
				createdAt={obj.createdAt}
				viewsCount={obj.viewsCount}
				commentsCount={obj.comentsCount}
				tags={obj.tags}
				isEditable={obj.user._id === userId}
				isLoading={false}
			/>
	))

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={tagsLabel} aria-label="basic tabs example">

				<Tab onClick={() => setTagsLabel(0)} label="Нові" />
				<Tab onClick={() => setTagsLabel(1)} label="Популярні" />


			</Tabs>
			<Grid container spacing={4}>

				<Grid xs={12} md={8} item>
					{postsItems}
				</Grid>

				<Grid xs={12} md={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoding} />
					<CommentsBlock
						likecount
						items={coments}
						isLoading={comentsLoading}
					/>
				</Grid>
			</Grid>
		</>
	);
};
