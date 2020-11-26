import Item from "../../entities/Item";

export interface IItemDao {
    saveItem(item: Item): Promise<string>;
}

export default class ItemDao implements IItemDao {
    saveItem(item: Item): Promise<string> {
        return Promise.resolve("");
    }
}
