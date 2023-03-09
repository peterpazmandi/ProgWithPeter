import { Box, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TutorialsProvider from './contexts/tutorials/tutorialsContext';
import Home from './pages/home/Home';
import { ColorModeContext, tokens, useMode } from './theme';

function App() {
    const currentTheme = useTheme();
    const colors = tokens(currentTheme.palette.mode);
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode as any}>
			<ThemeProvider theme={theme as any} >
				<TutorialsProvider>
					<CssBaseline />
					<Box className="app">
						<Navbar />
						<Box m={2}>
							<Routes>
								<Route path='/' element={<Home />} />
							</Routes>
						</Box>
					</Box>
				</TutorialsProvider>        		
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
