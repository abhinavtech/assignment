import MockDaoMock from "../MockDb/MockDao.mock";
import {ICustomerDao} from "./CustomerDao";
import Customer, {ICustomer} from "../../entities/Customer";
import {IPricingRuleDao} from "../PricingRule/PricingRuleDao";
import PricingRuleDao from "../PricingRule/PricingRuleDao.mock";

const pricingDao: IPricingRuleDao = new PricingRuleDao();

export default class CustomerDao extends MockDaoMock implements ICustomerDao {
    async deleteAllCustomers(): Promise<string> {
        const db = await super.openDb();
        db.customers = [];
        await super.saveDb(db);
        return Promise.resolve("Successfully deleted all customers");
    }

    async getAllCustomers(): Promise<ICustomer[] | null> {
        const db = await super.openDb();
        return Promise.resolve(db.customers);
    }

    async getCustomerByName(name: string): Promise<ICustomer | null> {
        const db = await super.openDb();
        let customers = db.customers;
        if(customers && customers[0]) {
            for (const customer of customers) {
                if (customer.name === name) {
                    return Promise.resolve(customer as ICustomer);
                }
            }
        }
        return Promise.resolve(null);
    }

    async saveCustomer(customer: any): Promise<ICustomer | null> {
        const db = await super.openDb();
        let customers = db.customers;
        let id;
        if(customers && customers[0]) {
            id = customers[customers.length - 1].id + 1;
        } else {
            customers = [];
            id = 1;
        }
        if (customer.name && typeof customer.name === "string") {
            for (const existingCustomer of customers) {
                if (existingCustomer.name === customer.name) {
                    return Promise.resolve(null);
                }
            }
            if (customer.pricingRules && customer.pricingRules[0]) {
                for (const code of customer.pricingRules) {
                    if (typeof code !== "string" || await pricingDao.getPricingByCode(code) === null) {
                        return Promise.resolve(null);
                    }
                }
            } else {
                customer.pricingRules = [];
            }
            const customerDb = new Customer(id, customer.name, customer.pricingRules);
            customers.push(customerDb);
            db.customers = customers;
            await super.saveDb(db);
            return Promise.resolve(customerDb);
        }
        return Promise.resolve(null);
    }

    async addPricingToCustomer(name: string, pricing: string[]): Promise<ICustomer | string> {
        const db = await super.openDb();
        let customers = db.customers;
        let customerIndex = -1;
        if(customers && customers[0]) {
            for (const index in customers) {
                if (customers[index].name === name) {
                    customerIndex = parseInt(index, 10);
                    break;
                }
            }

        }
        if(customerIndex >= 0) {
            let customer = customers[customerIndex];
            if(customer.pricingRules === undefined || customer.pricingRules[0] === undefined) {
                customer.pricingRules = [];
            }
            let pricingMap: any = {};
            for (const code of customer.pricingRules) {
                pricingMap[code] = true;
            }
            for (const code of pricing) {
                if (await pricingDao.getPricingByCode(code) === null) {
                    return Promise.resolve("Invalid Code: " + code);
                }
                if(pricingMap[code] === undefined) {
                    customer.pricingRules.push(code);
                }
            }
            db.customers[customerIndex] = customer;
            await super.saveDb(db);
            return Promise.resolve(customer);
        }
        return Promise.resolve("Customer not found");
    }

    async resetPricingForCustomer(name: string): Promise<ICustomer | string> {
        const db = await super.openDb();
        let customers = db.customers;
        let customerIndex = -1;
        if(customers && customers[0]) {
            for (const index in customers) {
                if (customers[index].name === name) {
                    customerIndex = parseInt(index, 10);
                    break;
                }
            }

        }
        if(customerIndex >= 0) {
            db.customers[customerIndex].pricingRules = [];
            await super.saveDb(db);
            return Promise.resolve(db.customers[customerIndex]);
        }
        return Promise.resolve("");
    }

}
