import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';
import LoginModal from '../modal/LoginModal';
import { Modal, Typography } from '@mui/material';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
    const { currentUser, logOut } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = () => {
        setAnchorEl(null);
    };

    const onOpenLoginModal = () => {
        setOpenLoginModal(true);
        onCloseMenu();
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                    <IconButton
                        onClick={onOpenMenu}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined} >
                        <Avatar
                            sx={{ width: 32, height: 32 }}
                            src={currentUser !== null ? currentUser.photoUrl : ""} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={onCloseMenu}
                onClick={onCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                {currentUser ? (
                    <Box>
                        <MenuItem onClick={() => navigate("/profile")} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <UserMenu />
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={onCloseMenu}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <Typography
                                variant='body1'
                                onClick={() => logOut()} >
                                Log out
                            </Typography>
                        </MenuItem>
                    </Box>
                ) : (
                    <Box>
                        <MenuItem onClick={onCloseMenu}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            Sign up for free
                        </MenuItem>
                        <MenuItem onClick={onOpenLoginModal}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            Sign in
                        </MenuItem>
                    </Box>
                )
                }
            </Menu>
            <Modal
                open={openLoginModal}
                onClose={e => setOpenLoginModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box>
                    <LoginModal setOpenLoginModal={setOpenLoginModal} />
                </Box>
            </Modal>
        </React.Fragment>
    );
}