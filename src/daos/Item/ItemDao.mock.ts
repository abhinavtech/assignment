import MockDaoMock from "../MockDb/MockDao.mock";
import {IItemDao} from "./ItemDao";
import Item from "../../entities/Item";

export default class ItemDao extends MockDaoMock implements IItemDao {
    async saveItem(item: Item): Promise<string> {
        const db = await super.openDb();
        db.items = [] as Item[];
        db.items.push(item);
        await super.saveDb(db);
        return Promise.resolve("success");
    }

    async getItemByName(name: string): Promise<Item | null> {
        const db = await super.openDb();
        for (const item of db.items) {
            if (item.name === name) {
                return Promise.resolve(new Item(
                    item.id,
                    item.name,
                    item.description,
                    item.retailPrice,
                    item.type
                ));
            }
        }
        return Promise.resolve(null);
    }
}
