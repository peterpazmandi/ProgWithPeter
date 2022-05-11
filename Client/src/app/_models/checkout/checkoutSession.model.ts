import { CustomerDetails } from "./customerDetails.model";

export interface CheckoutSession {
    id: string;
    amountTotal: number;
    currency: string;
    customerId: string;
    customerDetails: CustomerDetails;
    mode: string;
    paymentMethodTypes: string[];
    paymentStatus: string;
    status: string;
    subscriptionId: string;
    subscription?: any;
    successUrl: string;
}