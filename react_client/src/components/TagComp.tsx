import { Box, Chip } from '@mui/material';
import React from 'react'
import { Tag as TagEntity } from '../entities/tag.entity';

interface TagProps {
    tag: TagEntity;
}

const TagComp = (props: TagProps) => {
    const { tag } = props;

    const handleClick = () => {

    }

    return (
        <Box>
            <Chip
                label={tag.name} 
                color="primary" 
                size='small' 
                onClick={handleClick} />
        </Box>
    )
}

export default TagComp