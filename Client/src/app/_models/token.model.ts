export interface Token {
    nameid: number;
    unique_name: string;
    role: string[];
    nbf: number;
    exp: number;
    iat: number;
}