import React from "react";

import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import styles from './Coment.module.scss';
export const CommentsBlock = ({ items, children, isLoading = true }) => {


	const isComents = items.length === 0;

	return (
		<SideBlock title="Коментарі">
			<List>
				{isComents && <p className={styles.descr}>Поки що немає жодного коментаря..</p>}
				{(isLoading ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">

							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar alt={obj.user.fullName} src={obj.user.avatarURL} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<>
									<ListItemText
										primary={obj.user.fullname}
										secondary={obj.text}
									/>
								</>
							)}
							<ul className={styles.postDetails}>
								<li key={'heart'}>
									{
										isLoading ? null :
											<>
												<FavoriteRoundedIcon className={styles.icon} sx={{ color: obj.likeCount ? "#830c0c" : "grey" }} />
												<p>{obj.likeCount}</p>
											</>
									}
								</li>
							</ul>
						</ListItem>

						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};
