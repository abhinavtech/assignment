import PricingRule from "../../entities/PricingRule";

export interface IPricingRuleDao {
    getPricingByCode(code: string): Promise<PricingRule | null>;
}

export default class PricingRuleDao implements IPricingRuleDao {
    public getPricingByCode(code: string): Promise<PricingRule | null> {
        return Promise.resolve(null);
    }
}
