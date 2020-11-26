import {ICustomer} from "../../entities/Customer";

export interface ICustomerDao {
    saveCustomer(customer: any): Promise<ICustomer | null>;
    getAllCustomers(): Promise<ICustomer[] | null>;
    deleteAllCustomers(): Promise<string>;
    getCustomerByName(name: string): Promise<ICustomer | null>;
    addPricingToCustomer(name: string, pricing: string[]): Promise<ICustomer | string>;
    resetPricingForCustomer(name: string): Promise<ICustomer | string>;
}

export default class CustomerDao implements ICustomerDao {
    deleteAllCustomers(): Promise<string> {
        return Promise.resolve("");
    }

    getAllCustomers(): Promise<ICustomer[] | null> {
        return Promise.resolve(null);
    }

    getCustomerByName(name: string): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

    saveCustomer(customer: any): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

    addPricingToCustomer(name: string, pricing: string[]): Promise<ICustomer | string> {
        return Promise.resolve("");
    }

    resetPricingForCustomer(name: string): Promise<ICustomer | string> {
        return Promise.resolve("");
    }

}
