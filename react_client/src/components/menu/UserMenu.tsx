import { Avatar, Box, makeStyles, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';

const UserMenu = () => {
    const { currentUser } = useContext(AuthContext) as AuthContextType;
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: 200, height: 100
        }}>
            <Avatar
                alt={currentUser.firstName}
                src={currentUser.photoUrl}
                sizes="big" />
            <Typography variant='h6'>
                {currentUser.username}
            </Typography>
        </Box>
    )
}

export default UserMenu