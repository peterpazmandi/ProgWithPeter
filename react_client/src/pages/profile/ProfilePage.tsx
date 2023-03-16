import { Avatar, Box, makeStyles, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';

const ProfilePage = () => {
	const { currentUser } = useContext(AuthContext) as AuthContextType;

	return (
		<Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
		<Avatar
			alt={currentUser.firstName}
			src={currentUser.photoUrl} />
		</Box>
	)
}

export default ProfilePage