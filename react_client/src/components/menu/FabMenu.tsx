import { Box, SpeedDial, SpeedDialAction, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { tokens } from '../../theme';
import { useState } from 'react';

export interface FabAaction {
    icon: JSX.Element,
    name: string
}

interface FabMenuProps {
    top: string, left: string,
    actions: FabAaction[]
}

const FabMenu = (props: FabMenuProps) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    
    return (
        <Box
            mt={3} mb={3}
            sx={{
                display: { xs: "absolute", sm: "none" },
                position: 'absolute',
                top: props.top, left: props.left
            }}>
            <SpeedDial
                ariaLabel=""
                icon={<SpeedDialIcon icon={<KeyboardArrowUpIcon />} openIcon={<KeyboardArrowDownIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open} >
                {props.actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        sx={{ backgroundColor: colors.grey[400] }}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}

export default FabMenu