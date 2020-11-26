import Item, {ItemType} from "../../src/entities/Item";
import ItemDao from "../../src/daos/Item/ItemDao.mock";

describe('Item operations with mock db', () => {
   const itemDao: ItemDao = new ItemDao();
   it('Should save an item in the db', async (done) => {
       const item: Item = new Item(
           1,
           'Small Veg Pizza',
           'Delicious veg pizza',
           100,
           ItemType.small
       );
       const saved = await itemDao.saveItem(item);
       expect(saved).toBe('success');
       done();
   })
});
