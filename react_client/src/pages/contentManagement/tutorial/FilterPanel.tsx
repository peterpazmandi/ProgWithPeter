import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { TutorialListFilter } from '../../../contexts/tutorials/models/tutorialListFilter.model';
import { Status } from '../../../utils/enums';
import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const modalStyle = {
    // position: 'absolute' as 'absolute',
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

const FilterPanel = () => {
    const [status, setStatus] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };


    const filterFormSchema = yup.object().shape({
        title: yup.string(),
        status: yup.string()
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TutorialListFilter>({
        resolver: yupResolver(filterFormSchema)
    })

    const onSubmit = (tutorialListFilter: TutorialListFilter) => {
        // console.log(tutorialListFilter);
    }

    return (
        <Box>
            <Card>
                <CardHeader title="Filter" />
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            variant="outlined">
                            <TextField
                                label="Title"
                                id='outlined-adornment-title'
                                type={'text'}
                                {...register('title')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label="Status"
                                id='outlined-adornment-status'
                                defaultValue=''
                                {...register('status')}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                    Object.entries(Status).map(([key, value]) => {
                                        return <MenuItem key={value} value={value}>{value}</MenuItem>
                                    })
                                }
                            </TextField>
                        </FormControl>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{
                                    marginTop: 3,
                                    marginBottom: 2
                                }}
                                startIcon={<FilterAltIcon />}>
                                Filter
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default FilterPanel