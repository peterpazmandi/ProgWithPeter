import { Avatar, Box, makeStyles, SpeedDial, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


const actions = [
	{ icon: <FileCopyIcon />, name: 'Copy' },
	{ icon: <SaveIcon />, name: 'Save' },
	{ icon: <PrintIcon />, name: 'Print' },
	{ icon: <ShareIcon />, name: 'Share' },
  ];

const ProfilePage = () => {
	const { currentUser } = useContext(AuthContext) as AuthContextType;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
  

	return (
		<Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
			<SpeedDial
				ariaLabel="SpeedDial controlled open example"
				sx={{ position: 'absolute', bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={handleClose}
					/>
				))}
			</SpeedDial>
		</Box>
	)
}

export default ProfilePage