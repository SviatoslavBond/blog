import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarURL, fullname, additionalText }) => {
	return (
		<div className={styles.root}>
			<img className={styles.avatar} src={avatarURL || '/noavatar.png'} alt={fullname} />
			<div className={styles.userDetails}>
				<span className={styles.userName}>{fullname}</span>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	);
};
