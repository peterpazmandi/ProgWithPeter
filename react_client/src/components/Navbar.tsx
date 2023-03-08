import { AppBar, Box, IconButton, InputBase, Toolbar, Typography, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, DARK } from '../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Search } from './Search';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountMenu from './menu/AccountMenu';


const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    
    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography 
                    variant='h6'
                    sx={{ display: { xs: "none", sm: "block" }}}>
                    Peter Pazmandi
                </Typography>
                <VideogameAssetIcon sx={{ display: { xs: "block", sm: "none" }}} />
                <Search />
                <Box sx={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"}} >
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {
                            theme.palette.mode === DARK ? (
                                <DarkModeOutlinedIcon />
                            ) : (
                                <LightModeOutlinedIcon sx={{ color: "yellow"}} />
                            )
                        }
                    </IconButton>
                    <AccountMenu />
                </Box>
            </Toolbar>
        </AppBar>
  )
}

export default Navbar