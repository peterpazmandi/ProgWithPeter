import { Item } from "./item.model";

export interface Subscription {
    id: string;
    object: string;
    collectionMethod: string;
    created: Date;
    currentPeriodEnd: Date;
    currentPeriodStart: Date;
    customerId: string;
    defaultPaymentMethodId: string;
    discount?: any;
    items: Item[];
    latestInvoiceId: string;
    status: string;
}