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
    public description: string;
    public itemType: ItemType;

    constructor(id: number, code: string, type: PricingType, description: string, itemType: ItemType) {
        this.id = id;
        this.code = code;
        this.type = type;
        this.description = description;
        this.itemType = itemType;
    }

    public applyRule(items: Item[]): number {
        return 1;
    }
}

export enum PricingType {
    flat = 'flat',
    quantity = 'quantity'
}

export default PricingRule;
