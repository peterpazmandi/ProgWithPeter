import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { ColorModeContext, DARK, tokens } from '../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Search } from './Search';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountMenu from './menu/AccountMenu';
import { useNavigate } from 'react-router-dom';
import { HideOnScroll } from './HideOnScroll';
import { Divider } from '@mui/material';
import { AuthContext } from '../contexts/auth/authContext';
import { AuthContextType } from '../contexts/auth/authContext.type';
import { UserRoles } from '../utils/enums';
import ContentManagementMenu from './menu/ContentManagementMenu';


const Navbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext) as AuthContextType;


    const [openLoginModal, setOpenLoginModal] = useState(false);
    const onOpenLoginModal = () => {
        setOpenLoginModal(true);
    }

    return (
        <HideOnScroll>
            <AppBar position='sticky'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            textAlign: "start",
                            textTransform: "capitalize",
                            display: { xs: "none", sm: "block" },
                            color: "white"
                        }}
                        onClick={() => navigate("/")}>
                        <Typography
                            variant='h6' >
                            Peter Pazmandi
                        </Typography>
                    </Button>
                    <VideogameAssetIcon
                        onClick={() => navigate("/")}
                        sx={{ display: { xs: "block", sm: "none" } }} />
                    <Search />
                    <Box sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center"
                    }} >
                        {currentUser && currentUser.userRole === UserRoles.ADMIN &&
                            <Box sx={{
                                display: "flex",
                                gap: "20px",
                                alignItems: "center"
                            }}>
                                <ContentManagementMenu />
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                    sx={{ backgroundColor: 'white', height: '20px' }} />
                            </Box>
                        }
                        <Tooltip title={`${theme.palette.mode} Mode`} inputMode="text" placement="bottom">
                            <IconButton onClick={colorMode.toggleColorMode}>
                                {
                                    theme.palette.mode === DARK ? (
                                        <DarkModeOutlinedIcon />
                                    ) : (
                                        <LightModeOutlinedIcon sx={{ color: "yellow" }} />
                                    )
                                }
                            </IconButton>
                        </Tooltip>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

export default Navbar