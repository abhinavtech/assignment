import MockDaoMock from "../MockDb/MockDao.mock";
import {IPricingRuleDao} from "./PricingRuleDao";
import PricingRule, {PricingType} from "../../entities/PricingRule";
import {ItemType} from "../../entities/Item";

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

    async deleteAll(): Promise<string> {
        const db = await super.openDb();
        db.pricingRules = [];
        await super.saveDb(db);
        return Promise.resolve("Successfully deleted all pricing rules");
    }

    async getAll(): Promise<PricingRule[] | null> {
        const db = await super.openDb();
        return Promise.resolve(db.pricingRules as PricingRule[]);
    }

    async save(pricing: any): Promise<PricingRule | null> {
        const db = await super.openDb();
        let pricingRules = db.pricingRules;
        let id;
        if(pricingRules === undefined) {
            pricingRules = [];
        }
        for (const pricingRule of pricingRules) {
            if (pricing.code === pricingRule.code)
                return Promise.resolve(null);
        }
        if (pricingRules.length === 0) {
            id = 1;
        } else {
           id = pricingRules[pricingRules.length - 1].id + 1;
        }
        if (pricing.code && typeof pricing.code === "string"
            && pricing.type && typeof pricing.type === "string"
            && Object.values(PricingType).includes(pricing.type)
            && pricing.discount && typeof pricing.discount === "number"
            && pricing.itemType && typeof pricing.itemType === "string"
            && Object.values(ItemType).includes(pricing.itemType)) {
            if(pricing.totalItems && typeof pricing.totalItems !== "number") {
                pricing.totalItems = parseInt(pricing.totalItems, 10);
                if(isNaN(pricing.totalItems)) pricing.totalItems = undefined;
            }
            let pricingRule = new PricingRule(
                id,
                pricing.code,
                pricing.type,
                pricing.discount,
                pricing.itemType,
                pricing.description,
                pricing.totalItems
            );
            db.pricingRules.push(pricingRule);
            await super.saveDb(db);
            return Promise.resolve(pricingRule);
        }
        return Promise.resolve(null);
    }

}
