export interface Plan {
    id: string;
    object: string;
    active: boolean;
    amount: number;
    amountDecimal: number;
    billingScheme: string;
    created: Date;
    currency: string;
    deleted?: any;
    interval: string;
    intervalCount: number;
    livemode: boolean;
    productId: string;
}