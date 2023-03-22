import React from "react";
import TagIcon from "@mui/icons-material/Tag";
import { Skeleton, ListItemText, ListItemIcon, ListItemButton, ListItem, List } from "@mui/material";
import { SideBlock } from "../SideBlock";
import { Link } from "react-router-dom";

export const TagsBlock = ({ items, isLoading = true }) => {
	return (
		<SideBlock title="Теги">
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<Link key={i}
						style={{ textDecoration: "none", color: "black" }}
						to={`/tags/${name}`}>

						<ListItem key={i} disablePadding>
							<ListItemButton>

								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>

								{isLoading ? (<Skeleton width={100} />) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	);
};
