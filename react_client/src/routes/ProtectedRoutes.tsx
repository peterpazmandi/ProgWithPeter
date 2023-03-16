import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/authContext'
import { AuthContextType } from '../contexts/auth/authContext.type'

const useAuth = () => {
    const { currentUser } = useContext(AuthContext) as AuthContextType;

    if (currentUser) {
        return {
            auth: true,
            role: currentUser.roles
        }
    } else {
        return {
            auth: false,
            role: null
        }
    }
}

type ProtectedRouteType = {
    adminRoleRequired?: "ADMIN"
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
    const { auth, role } = useAuth();

    if (props.adminRoleRequired) {
        return auth ? (
            props.adminRoleRequired === role ? <Outlet /> : <Navigate to="denied" />
        ) : (
            <Navigate to="/" />
        )
    } else {
        if (!auth) {
            return <Navigate to="/" />
        } else {
            return <Outlet />
        }
    }
}

export default ProtectedRoutes