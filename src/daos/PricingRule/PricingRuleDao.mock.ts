import MockDaoMock from "../MockDb/MockDao.mock";
import {IPricingRuleDao} from "./PricingRuleDao";
import PricingRule from "../../entities/PricingRule";

export default class PricingRuleDao extends MockDaoMock implements IPricingRuleDao {
    async getPricingByCode(code: string): Promise<PricingRule | null> {
        const db = await super.openDb();
        for (const pricingRule of db.pricingRules) {
            if (pricingRule.code === code) {
                return Promise.resolve(new PricingRule(pricingRule.id,
                    pricingRule.code,
                    pricingRule.type,
                    pricingRule.discount,
                    pricingRule.itemType,
                    pricingRule.description,
                    pricingRule.totalItems));
            }
        }
        return Promise.resolve(null);
    }

}
