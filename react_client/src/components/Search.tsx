import { Box, InputBase, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const Search = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{
            backgroundColor: colors.primary[400],
            padding: "0 10px",
            border: 2,
            width: "30%",
            minWidth: "100px",
            borderColor: colors.primary[300],
            borderRadius: "6px"
        }}>
            <InputBase sx={{ width: "100%" }} placeholder="Search..." />
        </Box>
    )
}