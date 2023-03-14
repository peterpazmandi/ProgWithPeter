import { Box, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/auth/authContext';
import TutorialsProvider from './contexts/tutorials/tutorialsContext';
import Home from './pages/home/Home';
import ProfilePage from './pages/profile/ProfilePage';
import TutorialPage from './pages/tutorial/TutorialPage';
import { ColorModeContext, tokens, useMode } from './theme';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const currentTheme = useTheme();
	const colors = tokens(currentTheme.palette.mode);
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode as any}>
			<ThemeProvider theme={theme as any} >
				<AuthProvider>
					<TutorialsProvider>
						<CssBaseline />
						<Box className="app">
							<Navbar />
							<Box m={2}>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/tutorial/:slug' element={<TutorialPage />} />
									<Route path='/profile' element={<ProfilePage />} />
								</Routes>
								<ToastContainer />
							</Box>
						</Box>
					</TutorialsProvider>
				</AuthProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
