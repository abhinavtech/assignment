import {IItem} from "../../entities/Item";

export interface IItemDao {
    saveItem(item: IItem): Promise<IItem | null>;
    getAllItems(): Promise<IItem[] | null>;
    deleteAll(): Promise<string>;
    getItemByName(name: string): Promise<IItem | null>
}

export default class ItemDao implements IItemDao {
    saveItem(item: IItem): Promise<IItem | null> {
        return Promise.resolve(null);
    }

    deleteAll(): Promise<string> {
        return Promise.resolve("");
    }

    getAllItems(): Promise<IItem[] | null> {
        return Promise.resolve(null);
    }

    getItemByName(name: string): Promise<IItem | null> {
        return Promise.resolve(null);
    }
}
