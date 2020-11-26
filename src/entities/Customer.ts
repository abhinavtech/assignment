export interface ICustomer {
    id: number;
    name: string;
    pricingRules: string[];
}

export default class Customer implements ICustomer {
    public id: number;
    public name: string;
    public pricingRules: string[];

    constructor(id: number, name: string, pricingRules: string[]) {
        this.id = id;
        this.name = name;
        this.pricingRules = pricingRules;
    }

    public addPricingRule(code: string) {
        this.pricingRules.push(code);
    }
}
