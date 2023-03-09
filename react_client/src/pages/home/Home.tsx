import { Box, Card, CardContent, CardHeader, Container, InputBase, Skeleton, Stack, useTheme } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { TutorialsContext } from "../../contexts/tutorials/tutorialsContext";
import { TutorialsContextType } from "../../contexts/tutorials/tutorialsContext.type";
import { tokens } from "../../theme";
import HomeSkeleton from "./HomeSkeleton";
import Tutorial from "./Tutorial";

const Home = () => {
	const initialized = useRef(false);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { isLoading, tutorialsOnHome, getTutorialsForHomePage } = useContext(TutorialsContext) as TutorialsContextType;

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			getTutorialsForHomePage();
		}
	}, [])

	return (
		<Box display="flex" justifyContent="center">
			{isLoading ? (
				<Container>
					<HomeSkeleton />
					<HomeSkeleton />
					<HomeSkeleton />
				</Container>
			) : (
				<Container>
					{
						tutorialsOnHome.map(tutorial => {
							return (
								<Tutorial key={`${tutorial.post.id}`} tutorialEntity={tutorial} />
							)
						})
					}
				</Container>
			)
			}
		</Box>
	)
}

export default Home