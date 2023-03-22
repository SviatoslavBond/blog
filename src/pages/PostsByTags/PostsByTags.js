import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Post } from '../../Components/Post'
import { selectUserIdAuth } from '../Loggin/authSlice'
import { serverUrl } from '../../utils/serverUrl'
const imgUrl = "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
const PostsByTags = () => {
	const { name } = useParams();
	const posts = useSelector(state => {
		return state.posts.posts.items.filter(post => post.tags.includes(name))
	});
	const userId = useSelector(selectUserIdAuth)

	console.log(posts);
	const reg = new RegExp(/\/[^\/]*[^\/]*/);
	return (
		<>
			{
				posts.map((obj, index) => {
					return (< Post
						key={index}
						id={obj._id}
						title={obj.title}
						imageUrl={reg.test(obj.imgUrl) ? `${process.env.REACT_APP_API_URL || serverUrl}${obj.imgUrl}` : imgUrl}
						user={obj.user}
						createdAt={obj.createdAt}
						viewsCount={obj.viewsCount}
						commentsCount={obj.comentsCount}
						tags={obj.tags}
						isEditable={obj.user._id === userId}
						isLoading={false}
					/>)
				})
			}
		</>
	)
}

export default PostsByTags