import PricingRule, {PricingType} from "../../src/entities/PricingRule";
import Item, {ItemType} from "../../src/entities/Item";

describe('Tests Pricing Rules', () => {
    it('Should give a flat discount on small pizzas', (done) => {
        const pricingRule: PricingRule = new PricingRule(1, 'SMALL', PricingType.flat, 'Flat discount on small pizzas', ItemType.small);
        const items: Item[] = [] as Item[];
        items.push(new Item(1, 'Small Pizza', 'Small Pizza', 100, ItemType.small));
        items.push(new Item(1, 'Small Pizza', 'Small Pizza', 100, ItemType.small));
        const discountAmount = pricingRule.applyRule(items);
        expect(discountAmount).toBe(100);
        done();
    });
});