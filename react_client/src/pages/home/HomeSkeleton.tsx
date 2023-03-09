import { Box, Card, CardContent, Container, Skeleton, Stack } from '@mui/material'
import React from 'react'

const HomeSkeleton = () => {
    return (
        <Box>
            <Card sx={{ margin: 5 }}>
                <Stack direction="row" >
                    <Skeleton sx={{ height: 190, width: 300 }} animation="wave" variant="rectangular" />
                    <CardContent>
                        <Box sx={{ height: 150, width: 300 }}>
                            <Skeleton animation="wave" sx={{ height: 30, width: 200 }} />
                            <Skeleton animation="wave" sx={{ height: 10, width: 50, marginBottom: 2 }} />
                            <Skeleton animation="wave" sx={{ height: 70, width: 300 }} />
                            <Stack direction="row" spacing={1} marginTop={2}>
                                <Skeleton animation="wave" sx={{ height: 20, width: 40 }} />
                                <Skeleton animation="wave" sx={{ height: 20, width: 40 }} />
                                <Skeleton animation="wave" sx={{ height: 20, width: 40 }} />
                                <Skeleton animation="wave" sx={{ height: 20, width: 40 }} />
                            </Stack>
                        </Box>
                    </CardContent>
                </Stack>
            </Card>
        </Box>
    )
}

export default HomeSkeleton