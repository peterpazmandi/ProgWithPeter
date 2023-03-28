import { Box, Card, CardContent, Container, Grid, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { TutorialsContext } from "../../../contexts/tutorials/tutorialsContext";
import { TutorialsContextType } from "../../../contexts/tutorials/tutorialsContext.type";
import { Status } from "../../../utils/enums";
import FilterPanel from "./FilterPanel";
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FabMenu, { FabAaction as FabAction } from "../../../components/menu/FabMenu";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: 12,
    boxShadow: 24,
    p: 4,
};


const TutorialList = () => {
    const { isLoading, getTutorialsAsync, tutorialsToEdit } = useContext(TutorialsContext) as TutorialsContextType;

    const [openFilterModal, setOpenFilterModal] = useState(false);
    const handleCloseFilterModal = () => setOpenFilterModal(false);

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
        { icon: <FilterAltIcon sx={{ color: "white" }} />, name: 'Filter', onClick: () => setOpenFilterModal(true) },
        { icon: <CreateIcon sx={{ color: "white" }} />, name: 'New' }
    ] as FabAction[];

    return (
        !isLoading
            ? (
                <Box
                    style={{ height: 600, width: '100%' }}
                >
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
                    <FabMenu
                        actions={fabAactions}
                        top="70%"
                        left="45%" />
                    <Modal
                        open={openFilterModal}
                        onClose={handleCloseFilterModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description" >
                        <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <FilterPanel />
                        </Box>
                    </Modal>
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