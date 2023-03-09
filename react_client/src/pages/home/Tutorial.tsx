import { Box, Button, Card, CardActions, CardContent, CardMedia, Link, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
import { Tutorial as TutorialEntity } from '../../entities/tutorial.entity'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { tokens } from '../../theme';
import TagComp from '../../components/TagComp';

type TutorialProps = {
    tutorialEntity: TutorialEntity;
}

const Tutorial = (props: TutorialProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { tutorialEntity } = props;

    return (
        <Box>
            <Card sx={{ display: { xs: "block", sm: "flex" } , margin: 5 }}>
                <CardMedia
                    sx={{ width: { sm: 250 } }}
                    component="img"
                    image={tutorialEntity.post.featuredImageUrl}
                    alt={tutorialEntity.post.title} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Button 
                            variant="text"
                            size="small"
                            sx={{ textAlign: "start", textTransform: "capitalize" }}>
                            <Typography 
                                variant='h5' 
                                sx={{ marginBottom: 1 }}>
                                {tutorialEntity.post.title}
                            </Typography>
                        </Button>
                        <Stack direction="row" gap={1} mb={3}>
                            <AccessTimeIcon sx={{ width: 20, height: 20, color: colors.grey[500] }} />
                            <Typography fontSize={14}>
                                { new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(tutorialEntity.publishDate)) }
                            </Typography>
                        </Stack>
                        <Typography variant='body1' color="text.secondary">
                            {tutorialEntity.post.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Stack direction="row" spacing={0.5} mt={1} mb={2} sx={{ flexWrap: "wrap" }}>
                            {
                                tutorialEntity.post.tags.map(tag => {
                                    return <TagComp key={tag.id} tag={tag} />
                                })
                            }
                        </Stack>
                    </CardActions>
                </Box>
            </Card>
        </Box>
    )
}

export default Tutorial