export interface IItem {
    id: number;
    name: string;
    description: string;
    retailPrice: number;
}

class Item implements IItem {
    public id: number;
    public name: string;
    public description: string;
    public retailPrice: number;
    public type: ItemType;

    constructor(id: number, name: string, description: string, retailPrice: number, type: ItemType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.retailPrice = retailPrice;
        this.type = type;
    }
}

export enum ItemType {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

export default Item;
