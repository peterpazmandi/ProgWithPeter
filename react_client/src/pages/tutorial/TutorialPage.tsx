import { Box, Card, CardContent, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PostComp from '../../components/PostComp';
import TableOfContent from '../../components/tableOfContent/TableOfContent';
import { TutorialsContext } from '../../contexts/tutorials/tutorialsContext';
import { TutorialsContextType } from '../../contexts/tutorials/tutorialsContext.type';
import './tutorialPage.css';
import ScrollToTopFab from '../../components/ScrollToTopFab';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const TutorialPage = () => {
    const initialized = useRef(false);
    const { slug } = useParams();
    const { isLoading, openedTutorial, getTutorialByTitle } = useContext(TutorialsContext) as TutorialsContextType;

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            const title = slug?.replaceAll('_', ' ');
            getTutorialByTitle(title as string);
        }

    }, [])

    return (
        <Box>
            {!isLoading
                ? (openedTutorial &&
                    <Box sx={{
                        width: "100%",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "1000px",
                        marginBottom: "20px"
                    }}>
                        <Grid
                            container
                            spacing={{  }} >
                            <Grid
                                sm={3} md={3}
                                sx={{
                                    width: "100%",
                                    margin: "0 auto",
                                    maxWidth: "1000px",
                                    marginBottom: "20px",
                                    display:{ xs: "none", sm: "flex" }
                                }}>
                                <TableOfContent />
                            </Grid>
                            <Grid item 
                                xs={12} sm={8} md={9}>
                                <PostComp post={openedTutorial.post} />
                            </Grid>
                        </Grid>
                        <ScrollToTopFab />
                    </Box>

                ) : (
                    <Box>
                        <Typography variant='h2'>
                            Loading....
                        </Typography>
                    </Box>
                )
            }
        </Box>
    )
}

export default TutorialPage