import { createContext, FC, useState } from "react";
import { User } from "../../entities/user.entity";
import { login } from "../../services/auth/authService";
import { LoginRequest } from "./models/loginRequest.model";

export const USER = 'user';

type AuthContextProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({});

export const AuthProvider: FC<AuthContextProps> = (children: AuthContextProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(
        localStorage.getItem(USER)
            ? JSON.parse(localStorage.getItem(USER)!)
            : null);

    const loginAsync = (loginRequest: LoginRequest) => {
        setIsLoading(true);
        return login(loginRequest).then(user => {
            updateCurrentUser(user);
            setIsLoading(false);
            return user;
        }, error => {
            setIsLoading(false);
            return false;
        });
    }

    const logOut = () => {
        localStorage.removeItem(USER);
        setCurrentUser(null);
    }

    const updateCurrentUser = (user: User) => {
        localStorage.setItem(USER, JSON.stringify(user));
        setCurrentUser(user);
    }

    return <AuthContext.Provider value={{
        isLoading, currentUser,
        loginAsync, logOut
    }}>
        {children.children}
    </AuthContext.Provider>
}

export default AuthProvider;