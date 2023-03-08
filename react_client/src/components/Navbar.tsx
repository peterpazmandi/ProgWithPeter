import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext } from '../theme';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Navbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    
    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                    Peter Pazmandi
                </Typography>
                <Box sx={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }} >
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {
                            theme.palette.mode === 'dark' ? (
                                <DarkModeOutlinedIcon />
                            ) : (
                                <LightModeOutlinedIcon sx={{ color: "yellow"}} />
                            )
                        }
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
  )
}

export default Navbar