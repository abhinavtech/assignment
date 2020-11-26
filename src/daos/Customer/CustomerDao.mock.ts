import MockDaoMock from "../MockDb/MockDao.mock";
import {ICustomerDao} from "./CustomerDao";
import {ICustomer} from "../../entities/Customer";

export default class CustomerDao extends MockDaoMock implements ICustomerDao {
    async deleteAllCustomers(): Promise<string> {
        return Promise.resolve("");
    }

    async getAllCustomers(): Promise<ICustomer[] | null> {
        const db = await super.openDb();
        return Promise.resolve(db.customers);
    }

    async getCustomerByName(): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

    async saveCustomer(customer: ICustomer): Promise<ICustomer | null> {
        return Promise.resolve(null);
    }

}
