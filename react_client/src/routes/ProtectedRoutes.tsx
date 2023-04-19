import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/authContext'
import { AuthContextType } from '../contexts/auth/authContext.type'
import { toast } from "react-toastify";

const errorToast = (message: string) => toast.error(message);

const useAuth = () => {
    const { currentUser } = useContext(AuthContext) as AuthContextType;

    if (currentUser) {
        return {
            auth: true,
            role: currentUser.userRole
        }
    } else {
        return {
            auth: false,
            role: null
        }
    }
}

type ProtectedRouteType = {
    adminRoleRequired?: "Admin"
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
    const { auth, role } = useAuth();

    if (props.adminRoleRequired) {
        if (auth) {
            if (props.adminRoleRequired === role) {
                return <Outlet />
            } else {
                errorToast('You are not authorized to view this page.');
                return <Navigate to="denied" />
            }
        } else {
            errorToast('You are not authorized to view this page.');
            return <Navigate to="/" />
        }
    } else {
        if (!auth) {
            errorToast('You are not authorized to view this page.');
            return <Navigate to="/" />
        } else {
            return <Outlet />
        }
    }
}

export default ProtectedRoutes