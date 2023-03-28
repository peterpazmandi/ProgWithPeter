import { Box, SpeedDial, SpeedDialAction, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { tokens } from '../../theme';
import { useEffect, useRef, useState } from 'react';

export interface FabAaction {
    icon: JSX.Element,
    name: string,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}

interface FabMenuProps {
    top: string, left: string,
    actions: FabAaction[]
}

const FabMenu = (props: FabMenuProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log(open);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log(open);
    }, [open])

    const onFabClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, action: FabAaction | null) => {
        handleClose();
        if (action?.onClick) {
            action?.onClick(e);
        }
    }


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
                onOpen={() => handleOpen()}
                open={open} >
                {props.actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        sx={{ backgroundColor: colors.grey[400] }}
                        onClick={(e) => onFabClick(e, action)}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}

export default FabMenu