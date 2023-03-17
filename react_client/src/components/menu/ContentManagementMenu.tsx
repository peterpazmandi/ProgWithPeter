import { Box, IconButton, ListItemIcon, MenuItem, Tooltip, Typography } from '@mui/material'
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import RttIcon from '@mui/icons-material/Rtt';

const ContentManagementMenu = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseMenu = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Content Management" placement="bottom">
                    <IconButton
                        onClick={onOpenMenu}
                        size="small"
                        aria-controls={open ? 'content-management-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <FormatShapesIcon sx={{ color: 'white'}} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="content-management-menu"
                open={open}
                onClose={onCloseMenu}
                onClick={onCloseMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }} >
                <MenuItem onClick={onCloseMenu}>
                    <ListItemIcon>
                        <RttIcon />
                    </ListItemIcon>
                    <Typography
                        variant='body1' >
                        Tutorials
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ContentManagementMenu