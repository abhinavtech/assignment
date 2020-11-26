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

    constructor(id: number, name: string, description: string, retailPrice: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.retailPrice = retailPrice;
    }
}

export default Item;
