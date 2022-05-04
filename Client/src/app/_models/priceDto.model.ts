import { PriceRecurringDto } from "./priceRecurringDto.model";

export interface PriceDto {
    id: string,
    type: string,
    recurring: PriceRecurringDto,
    nickname: string,
    currency: string,
    created: Date,
    billingScheme: string,
    active: boolean,
    unitAmount: number,
    unitAmountDecimal: number
}