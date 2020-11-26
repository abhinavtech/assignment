import {ICustomer} from "../../entities/Customer";

export interface ICustomerDao {
    saveCustomer(customer: ICustomer): Promise<ICustomer | null>;
    getAllCustomers(): Promise<ICustomer[] | null>;
    deleteAllCustomers(): Promise<string>;
    getCustomerByName(): Promise<ICustomer | null>;
}

export default class CustomerDao implements ICustomerDao {
    deleteAllCustomers(): Promise<string> {
        return Promise.resolve("");
    }

    getAllCustomers(): Promise<ICustomer[] | null> {
        return Promise.resolve(null);
    }

    getCustomerByName(): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

    saveCustomer(customer: ICustomer): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

}
