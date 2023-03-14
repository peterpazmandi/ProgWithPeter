import { LoginRequest } from "../../contexts/auth/models/loginRequest.model";
import { User } from "../../entities/user.entity";
import { apiClient } from "../apiClient";



const tokenConfig = {
    headers: {
        Authorization: ''
    }
};

export const login = async (loginRequest: LoginRequest) => {
    return (await apiClient.post('/account/login', loginRequest)).data as User
}