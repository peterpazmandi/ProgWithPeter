import { Plan } from "./plan.model";
import { Price } from "./price.model";

export interface Item {
    id: string;
    object: string;
    billingThresholds?: any;
    created: Date;
    deleted?: any;
    plan: Plan;
    price: Price;
    quantity: number;
    subscription: string;
}