import axios from "axios";
import { toast } from "react-toastify";
import { enqueueSnackbar } from 'notistack'

const errorToast = (message: string) => toast.error(message);
const BASE_URL = "https://localhost:5001/api/";

export const apiClient = axios.create({
    baseURL: BASE_URL
});

apiClient.interceptors.response.use((response) => {
    return response;
}, error => {
    errorToast(error.response.data);
    enqueueSnackbar(error.response.data, {
        variant: 'error'
    })
    throw error;
})