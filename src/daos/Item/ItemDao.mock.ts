import MockDaoMock from "../MockDb/MockDao.mock";
import {IItemDao} from "./ItemDao";
import Item, {IItem, ItemType} from "../../entities/Item";

export default class ItemDao extends MockDaoMock implements IItemDao {
    async saveItem(item: IItem): Promise<IItem | null> {
        const db = await super.openDb();
        let items = db.items;
        let id;
        if(items && items[0]) {
            id = items[items.length - 1].id + 1;
        } else {
            items = [];
            id = 1;
        }
        if(item.name && typeof item.name === "string"
            && item.description && typeof item.description === "string"
            && item.retailPrice && typeof item.retailPrice === "number"
            && item.type && typeof item.type === "string"
            && Object.values(ItemType).includes(item.type)) {
            const itemDb = new Item(id, item.name, item.description, item.retailPrice, item.type);
            items.push(itemDb);
            db.items = items;
            await super.saveDb(db);
            return Promise.resolve(itemDb);
        }
        return Promise.resolve(null);
    }

    async getItemByName(name: string): Promise<IItem | null> {
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

    async deleteAll(): Promise<string> {
        const db = await super.openDb();
        db.items = [];
        await super.saveDb(db);
        return Promise.resolve("Successfully deleted all items");
    }

    async getAllItems(): Promise<IItem[] | null> {
        const db = await super.openDb();
        return Promise.resolve(db.items);
    }
}
