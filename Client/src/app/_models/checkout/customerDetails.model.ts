import { Address } from "./address.model";

export interface CustomerDetails {
    address: Address;
    email: string;
    name: string;
    phone?: any;
}