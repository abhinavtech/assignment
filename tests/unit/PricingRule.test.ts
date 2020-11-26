import PricingRule from "../../src/entities/PricingRule";
import Item from "../../src/entities/Item";

describe('Tests Pricing Rules', () => {
    it('Should give a flat discount on small pizzas', (done) => {
        const pricingRule: PricingRule = new PricingRule(1, 'SMALL', 'flat');
        
    });
});
