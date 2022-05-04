import { PriceDto } from "./priceDto.model";

export interface MembershipDto {
    id: string,
    name: string,
    updated: Date,
    description: string,
    deleted: boolean,
    created: Date,
    active: boolean,
    object: string,
    images: string[],
    prices: PriceDto[]
}