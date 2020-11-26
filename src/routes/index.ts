import {Request, Response, Router} from 'express';
import {IPricingRuleDao} from "../daos/PricingRule/PricingRuleDao";
import PricingRuleDao from "../daos/PricingRule/PricingRuleDao.mock";
import {IItemDao} from "../daos/Item/ItemDao";
import ItemDao from "../daos/Item/ItemDao.mock";
import {ICustomerDao} from "../daos/Customer/CustomerDao";
import CustomerDao from "../daos/Customer/CustomerDao.mock";

const router = Router();
const pricingDao: IPricingRuleDao = new PricingRuleDao();
const itemsDao: IItemDao = new ItemDao();
const customersDao: ICustomerDao = new CustomerDao();

router.post('/customers', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

router.get('/customers', async (req: Request, res: Response) => {
   const response = await customersDao.deleteAllCustomers();
   res.send({response});
});

router.delete('/customers/all', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

router.post('/items', async (req: Request, res: Response) => {
   const item = req.body;
   const response = await itemsDao.saveItem(item);
   res.send({response});
});

router.get('/items', async (req: Request, res: Response) => {
   const response = await itemsDao.getAllItems();
   res.send({response});
});

router.delete('/items/all', async (req: Request, res: Response) => {
   const response = await itemsDao.deleteAll();
   res.send({response});
});

router.post('/pricing', async (req: Request, res: Response) => {
   const pricingRule = req.body;
   const response = await pricingDao.save(pricingRule);
   res.send({response});
});

router.get('/pricing', async (req: Request, res: Response) => {
   const response = await pricingDao.getAll();
   res.send({response});
})

router.delete('/pricing/all', async (req: Request, res: Response) => {
   const response = await pricingDao.deleteAll();
   res.send({response});
})

router.post('/order', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

export default router;
