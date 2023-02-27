import React from 'react';
import styles from './UserInfo.module.scss';
import { formatDate } from '../../utils/formatDate';
import { Avatar } from '@mui/material';

export const UserInfo = ({ avatarURL, fullname, additionalText }) => {


	const [, numberOfMonth, month, year] = formatDate(additionalText).split(' ');


	return (
		<div className={styles.root}>
			<Avatar className={styles.avatar} src={avatarURL} />

			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullname}</span>
				<span className={styles.additional}>{`${numberOfMonth} ${month} ${year}`}</span>
			</div>
		</div>
	);
};
