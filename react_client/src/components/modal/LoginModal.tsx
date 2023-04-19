import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Divider, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginRequest } from '../../contexts/auth/models/loginRequest.model';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth/authContext';
import { AuthContextType } from '../../contexts/auth/authContext.type';
import { toast } from "react-toastify";
import { User } from '../../entities/user.entity';
import { enqueueSnackbar } from 'notistack';

const successToast = (message: string) => toast.success(message);

interface LoginModalProps {
    setOpenLoginModal: (value: React.SetStateAction<boolean>) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

const LoginModal = (props: LoginModalProps) => {
    const { setOpenLoginModal } = props;

    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, loginAsync } = useContext(AuthContext) as AuthContextType;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginRequest>({
        resolver: yupResolver(formSchema)
    })

    const onSubmit = async (loginRequest: LoginRequest) => {
        loginAsync(loginRequest).then(user => {
            if (user) {
                successToast(`Welcome back, ${(user as User).firstName}`);
                enqueueSnackbar(`Welcome back, ${(user as User).firstName}`, {
                    variant: 'success'
                })
                setOpenLoginModal(false);
            }
        });
    }

    return (
        <Box sx={style}>
            <Box alignItems={"center"}>
                <Typography variant='h4' align="center">
                    Sign In
                </Typography>
                <Divider
                    orientation='horizontal'
                    sx={{ marginTop: 4, marginBottom: 4 }}></Divider>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl 
                    sx={{ width: '100%', marginBottom: 2 }} 
                    variant="outlined">
                    <TextField
                        label="Username"
                        error={errors.username !== undefined}
                        id="outlined-adornment-username"
                        type={'text'}
                        helperText={errors.username?.message}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>

                        }}
                        {...register('username')}
                    />
                </FormControl>
                <FormControl sx={{ width: '100%', marginBottom: 6 }} variant="outlined">
                    <TextField
                        label="Password"
                        error={errors.password !== undefined}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end" >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            )
                        }}
                        {...register('password')}
                    />
                </FormControl>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <LoadingButton
                        type='submit'
                        color='primary'
                        loading={isLoading}
                        variant="contained">
                        Submit
                    </LoadingButton>
                </Box>
            </form>
        </Box>

    )
}

export default LoginModal