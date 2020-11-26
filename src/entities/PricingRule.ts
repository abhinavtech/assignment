import Item, {IItem, ItemType} from "./Item";

export interface IPricingRule {
    id: number;
    code: string;
    type: PricingType;
    description: string | undefined;
    discount: number;
    totalItems: number | undefined;
    itemType: ItemType;
    applyRule(items: IItem[]): number;
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
        let itemCount = 0;
        if (this.type === PricingType.quantity && this.totalItems && items.length >= this.totalItems) {
            for (const item of items) {
                if (item.type === this.itemType && itemCount < this.totalItems) {
                    itemCount++;
                    if (itemCount > this.totalItems - this.discount) {
                        discountAmount += item.retailPrice;
                    }
                }
            }
            if(itemCount < this.totalItems) discountAmount = 0;
        } else {
            for(const item of items) {
                if (item.type === this.itemType)  {
                    if (this.type === PricingType.flat)
                        discountAmount += this.discount;
                    if (this.type === PricingType.percent)
                        discountAmount += item.retailPrice * this.discount / 100;
                }
            }
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
