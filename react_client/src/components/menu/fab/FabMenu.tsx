import { Box, SpeedDial, SpeedDialAction, useTheme } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { tokens } from '../../../theme';
import { useContext, useEffect, useRef, useState } from 'react';
import { FabContextType } from './fabContext.type';
import { FabContext } from './fabContext';

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
    const { open, onOpen, onClose } = useContext(FabContext) as FabContextType;

    const onFabClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, action: FabAaction | null) => {
        if (action?.onClick) {
            action?.onClick(e);
        }
        onClose();
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
                onClose={onClose}
                onOpen={onOpen}
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