import { Avatar, Box, makeStyles, Stack, Typography } from '@mui/material';
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';

const UserMenuItem = () => {
    const { currentUser } = useContext(AuthContext) as AuthContextType;

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: 200, height: 180
        }}>
            {currentUser
                ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                        flexDirection: 'column',
                        width: 200, height: 100
                    }}>
                        <Avatar variant='circular'
                            alt={currentUser.firstName}
                            src={currentUser.photoUrl}
                            sx={{ 
                                marginLeft: '0px !important', marginRight: '0px !important',
                                width: '80px !important', height: '80px !important'
                            }} />
                        <Typography variant='h5' mt={2}>
                            {currentUser.username}
                        </Typography>
                        <Typography variant='body2' mt={2}>
                            {currentUser.userRole}
                        </Typography>
                    </Box>
                ) : (
                    <Box></Box>
                )

            }
        </Box>
    )
}

export default UserMenuItem