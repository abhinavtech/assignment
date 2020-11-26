import PricingRule, {PricingType} from "../../src/entities/PricingRule";
import Item, {ItemType} from "../../src/entities/Item";

describe('Tests Pricing Rules', () => {
    it('Should give a flat discount on small pizzas', (done) => {
        const pricingRule: PricingRule = new PricingRule(1, 'SMALL', PricingType.flat, 50, ItemType.small, 'Flat discount on small pizzas');
        const items: Item[] = [] as Item[];
        items.push(new Item(1, 'Small Pizza', 'Small Pizza', 100, ItemType.small));
        items.push(new Item(1, 'Small Pizza', 'Small Pizza', 100, ItemType.small));
        items.push(new Item(1, 'Large Pizza', 'Large Pizza', 500, ItemType.large));
        const discountAmount = pricingRule.applyRule(items);
        expect(discountAmount).toBe(100);
        done();
    });
});
