import Item, {ItemType} from "./Item";

export interface IPricingRule {
    id: number;
    code: string;
    type: string;
    applyRule(items: Item[]): number;
}

class PricingRule implements IPricingRule {

    public id: number;
    public code: string;
    public type: PricingType;
    public description: string | undefined;
    public discount: number;
    public totalItems: number | undefined;
    public itemType: ItemType;

    constructor(id: number, code: string, type: PricingType, discount: number, itemType: ItemType, description?: string, totalItems?: number) {
        this.id = id;
        this.code = code;
        this.type = type;
        this.itemType = itemType;
        this.discount = discount;
        this.totalItems = totalItems;
        this.description = description;
    }

    public applyRule(items: Item[]): number {
        let discountAmount = 0;
        for(const item of items) {
            if (this.type === PricingType.flat && item.type === this.itemType)
                discountAmount += item.retailPrice - this.discount;
        }
        return discountAmount;
    }
}

export enum PricingType {
    flat = 'flat',
    percent = 'percent',
    quantity = 'quantity'
}

export default PricingRule;
