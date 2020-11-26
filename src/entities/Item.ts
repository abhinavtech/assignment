export interface IItem {
    id: number;
    name: string;
    description: string;
    retailPrice: number;
    type: ItemType;
    quantity: number;
    setQuantity(quantity: number): void;
}

class Item implements IItem {
    public id: number;
    public name: string;
    public description: string;
    public retailPrice: number;
    public type: ItemType;
    public quantity: number;

    constructor(id: number, name: string, description: string, retailPrice: number, type: ItemType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.retailPrice = retailPrice;
        this.type = type;
        this.quantity = 0;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
}

export enum ItemType {
    small = 'small',
    medium = 'medium',
    large = 'large',
    all = 'all'
}

export default Item;
