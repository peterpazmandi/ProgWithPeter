import { Box, Card, CardContent, Container, Fab, Grid, Menu, MenuItem, Pagination, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { TutorialsContext } from "../../../contexts/tutorials/tutorialsContext";
import { TutorialsContextType } from "../../../contexts/tutorials/tutorialsContext.type";
import { Status } from "../../../utils/enums";
import FilterPanel from "./FilterPanel";
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';


const TutorialList = () => {
    const { isLoading, getTutorialsAsync, tutorialsToEdit } = useContext(TutorialsContext) as TutorialsContextType;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "status",
            headerName: "STATUS",
            renderCell: (status: any) => {
                return (
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: getStatusColor(status.value)
                            }}>
                            {status.value}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            field: "post",
            headerName: "TITLE",
            minWidth: 400,
            valueFormatter: (post: any) => post.value.title
        }
    ]

    useEffect(() => {
        getTutorialsAsync(1, 20);
    }, [])

    const getStatusColor = (status: string) => {
        return status === Status.PUBLISHED
            ? '#32a852'
            : status === Status.DRAFT
                ? '#e8b75a'
                : '#ff0000'
    }

    const fabAactions = [
        { icon: <FilterAltIcon />, name: 'Filter' },
        { icon: <CreateIcon />, name: 'New' }
    ];

    return (
        !isLoading
            ? (
                <Box style={{ height: 600, width: '100%' }}>
                    <Grid container>
                        <Grid item
                            sm={3} md={3}
                            sx={{
                                width: "100%",
                                margin: "0 auto",
                                display: { xs: "none", sm: "flex" }
                            }}>
                            <Box mr={1}>
                                <Box
                                    mt={3} mb={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<CreateIcon />}
                                        sx={{
                                            padding: 3
                                        }}>
                                        New
                                    </Button>
                                </Box>
                                <FilterPanel />
                            </Box>
                        </Grid>
                        <Grid item
                            xs={12} sm={8} md={9}>
                            <Card>
                                <CardContent>
                                    {tutorialsToEdit &&
                                        <DataGrid
                                            style={{ width: '100%' }} autoHeight
                                            pagination
                                            rows={tutorialsToEdit}
                                            columns={columns}
                                            // slots={{
                                            //     toolbar: GridToolbar,
                                            // }}
                                            hideFooterSelectedRowCount
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10 }
                                                }
                                            }}
                                            pageSizeOptions={[10, 30, 50, 70, 100]}
                                            showCellVerticalBorder={true}
                                            showColumnVerticalBorder={true}
                                        // onPaginationModelChange = {((model: GridPaginationModel, details: GridCallbackDetails) => 
                                        //         console.log(model)
                                        // )}
                                        // onFilterModelChange = {((model: GridFilterModel, details: GridCallbackDetails<"filter">) => 
                                        //     console.log(model)
                                        // )}
                                        />
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box
                        mt={3} mb={3}
                        sx={{
                            position: 'absolute',
                            top: "70%", left: "45%"
                        }}>
                        <SpeedDial
                            ariaLabel=""
                            icon={<SpeedDialIcon icon={<KeyboardArrowUpIcon />} openIcon={<KeyboardArrowDownIcon />} />} >
                            {fabAactions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Container>
                        <Card>
                            <CardContent>
                                <Typography variant="h4">Loading...</Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </Box>
            )
    )
}

export default TutorialList