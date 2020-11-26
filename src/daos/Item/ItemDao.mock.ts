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
}
