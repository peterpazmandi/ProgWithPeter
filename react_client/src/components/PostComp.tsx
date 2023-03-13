import { Post } from '../entities/post.entity'
import { Box, Card, CardContent, Container, Typography } from '@mui/material';

interface PostProp {
	post: Post;
}

const PostComp = (props: PostProp) => {
	const { post } = props;

    return (
        <Box>
            <Container>
                <Card>
                    <CardContent>
						<Typography
							variant="body1"
							dangerouslySetInnerHTML={{
								__html: `${post.content}`
							}} />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default PostComp