import jsonfile from 'jsonfile';
import { IPricingRule } from '../../entities/PricingRule';
import {IItem} from "../../entities/Item";
import {ICustomer} from "../../entities/Customer";


interface IDatabase {
    pricingRules: IPricingRule[];
    items: IItem[];
    customers: ICustomer[];
}


class MockDaoMock {

    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';


    protected openDb(): Promise<IDatabase> {
        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    }


    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default MockDaoMock;
