import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Post } from "../../Components/Post";
import { FiledForComent } from "../../Components/AddComment/FiledForComent";
import { CommentsBlock } from "../../Components/ComentsBlock/CommentsBlock";
import axios from '../../utils/axios';
import { fetchComents } from "../../Components/ComentsBlock/comentSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { serverUrl } from "../../utils/serverUrl";
const imgUrl = "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"

export const FullPost = () => {
	const dispatch = useDispatch();
	const comentsItems = useSelector(state => {
		return state.coments.items
	})

	const { id } = useParams();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const authUserInfo = useSelector((state) => state.auth.data);
	useEffect(() => {
		dispatch(fetchComents(id));

		axios.get(`/posts/${id}`)
			.then((res) => {
				setData(res.data);
				setIsLoading(false);
			})
			.catch(err => console.log(err))

	}, []);

	console.log(comentsItems.length)
	if (isLoading) {
		return <Post isLoading={isLoading} />
	}
	const reg = new RegExp(/\/[^\/]*[^\/]*/);


	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				imageUrl={reg.test(data.imgUrl) ? `${serverUrl}${data.imgUrl}` : imgUrl}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={comentsItems.length}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>

			<CommentsBlock
				items={comentsItems}
				isLoading={isLoading}
			>
				{authUserInfo ?
					<FiledForComent userAvatar={authUserInfo.avatarURL} postId={id} /> :
					<Box className='py-3 text-center'>
						<Typography variant="h6">
							Щоб залишити коментар будь-ласка <Link to='/registration'>авторизуйтесь</Link>
						</Typography>
					</Box>
				}

			</CommentsBlock>
		</>
	);
};

