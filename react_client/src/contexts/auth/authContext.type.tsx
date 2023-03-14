import { User } from "../../entities/user.entity";
import { LoginRequest } from "./models/loginRequest.model";

export type AuthContextType = {
    isLoading: boolean;
    currentUser: User;
    login: (loginRequest: LoginRequest) => Promise<boolean>;
}