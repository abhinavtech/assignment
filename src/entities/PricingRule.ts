import Item from "./Item";

export interface IPricingRule {
    id: number;
    code: string;
    type: string;
    applyRule(items: Item[]): number;
}

class PricingRule implements IPricingRule {

    public id: number;
    public code: string;
    public type: string;

    constructor(id: number, code: string, type: string) {
        this.id = id;
        this.code = code;
        this.type = type;
    }

    public applyRule(items: Item[]): number {
        return 1;
    }
}

export default PricingRule;
