import PricingRule from "../../src/entities/PricingRule";
import PricingRuleDao from "../../src/daos/PricingRule/PricingRuleDao.mock";

describe('Tests pricing rules by fetching from db mock', () => {
    const pricingRuleDao: PricingRuleDao = new PricingRuleDao();
    it('Should fetch pricing rule by code and return total discount', async (done) => {
        const pricingRule: PricingRule | null = await pricingRuleDao.getPricingByCode('FIFTY');
        console.log(pricingRule);
        done();
    });
});
