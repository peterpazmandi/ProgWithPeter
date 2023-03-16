import { useContext, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/authContext'
import { AuthContextType } from '../contexts/auth/authContext.type'
import { toast } from "react-toastify";

const errorToast = (message: string) => toast.error(message);

const useAuth = () => {
    const { currentUser } = useContext(AuthContext) as AuthContextType;
    return currentUser !== null
}

const PublicRoutes = () => {
    const auth = useAuth();
    const lastRun = useRef(new Date());

    if (auth) {
        return <Outlet />
    } else {
        errorToast('You are not authorized to view this page.');
        return <Navigate to="/" />
    }
}

export default PublicRoutes