import PricingRule from "../../entities/PricingRule";

export interface IPricingRuleDao {
    getPricingByCode(code: string): Promise<PricingRule | null>;
    deleteAll(): Promise<string>;
    getAll(): Promise<PricingRule[] | null>;
    save(pricing: any): Promise<PricingRule | null>;
}

export default class PricingRuleDao implements IPricingRuleDao {
    public getPricingByCode(code: string): Promise<PricingRule | null> {
        return Promise.resolve(null);
    }

    deleteAll(): Promise<string> {
        return Promise.resolve("");
    }

    getAll(): Promise<PricingRule[] | null> {
        return Promise.resolve(null);
    }

    save(pricing: any): Promise<PricingRule | null> {
        return Promise.resolve(null);
    }
}
