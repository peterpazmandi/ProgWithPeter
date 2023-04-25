import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import AuthProvider from "./contexts/auth/authContext";
import TutorialsProvider from "./contexts/tutorials/tutorialsContext";
import { ColorModeContext, tokens, useMode } from "./theme";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import FabProvider from "./components/menu/fab/fabContext";
import { SnackbarProvider } from "notistack";
import { TranslationProvider } from "./utils/i18n/TranslationProvider";
import { useState } from "react";
import { SupportedLanguages } from "./utils/i18n/SupportedLanguages";

function App() {
	const [theme, colorMode] = useMode();
	const [langState, setLangState] = useState<SupportedLanguages>(
		SupportedLanguages.en
	);

	return (
		<ColorModeContext.Provider value={colorMode as any}>
			<ThemeProvider theme={theme as any}>
				<SnackbarProvider>
					<AuthProvider>
						<TutorialsProvider>
							<CssBaseline>
								<TranslationProvider langState={langState}>
									<Box className="app">
										<Navbar setLangState={setLangState} />
										<FabProvider>
											<Box m={2}>
												<AppRoutes />
												<ToastContainer />
											</Box>
										</FabProvider>
									</Box>
								</TranslationProvider>
							</CssBaseline>
						</TutorialsProvider>
					</AuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
