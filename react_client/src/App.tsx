import { PaletteMode, createTheme, ThemeProvider, Box } from '@mui/material';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { ColorModeContext, useMode } from './theme';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode as any}>
			<ThemeProvider theme={theme as any} >
				<Box bgcolor={"background.default"} color={"text.primary"} >
					<Navbar />
				</Box>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
