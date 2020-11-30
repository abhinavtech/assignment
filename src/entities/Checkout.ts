import {ICustomer} from "./Customer";
import {IItem} from "./Item";
import {IPricingRule} from "./PricingRule";

export interface ICheckout {
    customer: ICustomer | undefined;
    items: IItem[];
    pricingRules: IPricingRule[];
    add(item: IItem): void;
    total(): number;
}

export default class Checkout implements ICheckout{
    customer: ICustomer | undefined;
    items: IItem[];
    pricingRules: IPricingRule[];

    constructor(pricingRules: IPricingRule[], customer?: ICustomer) {
        this.customer = customer;
        this.items = [] as IItem[];
        this.pricingRules = pricingRules;
    }

    add(item: IItem): void {
        this.items.push(item);
    }

    total(): number {
        let totalAmount = 0;
        let discountAmount = 0;
        for (const item of this.items) {
            totalAmount += item.retailPrice * (item.quantity ? item.quantity : 1);
        }
        for (const pricingRule of this.pricingRules) {
            discountAmount += pricingRule.applyRule(this.items);
        }
        totalAmount -= discountAmount;
        return totalAmount;
    }
}

