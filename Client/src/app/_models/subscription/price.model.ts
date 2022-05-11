import { Recurring } from "./recurring.model";

export interface Price {
    id: string;
    object: string;
    active: boolean;
    billingScheme: string;
    created: Date;
    currency: string;
    productId: string;
    recurring: Recurring;
    taxBehavior: string;
    type: string;
    unitAmount: number;
    unitAmountDecimal: number;
}