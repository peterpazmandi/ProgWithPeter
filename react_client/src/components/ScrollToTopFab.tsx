import { Fab, Link, Zoom } from '@mui/material'
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

const ScrollToTopFab = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {

            const handleScroll = () => {
                const position = window.scrollY;
                setScrollPosition(position);
            }

            window.addEventListener("scroll", handleScroll);

            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <Zoom in={scrollPosition !== 0}>
            <Fab
                color='primary'
                sx={fabStyle}
                onClick={() => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }}>
                <UpIcon />
            </Fab>
        </Zoom>
    )
}

export default ScrollToTopFab