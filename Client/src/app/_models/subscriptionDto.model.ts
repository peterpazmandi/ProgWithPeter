export interface SubscriptionDto {
    subscriptionId: string;
    membershipType: string;
    price: number;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    interval: string;
    mode: string;
}