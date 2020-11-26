import {Request, Response, Router} from 'express';
import {IPricingRuleDao} from "../daos/PricingRule/PricingRuleDao";
import PricingRuleDao from "../daos/PricingRule/PricingRuleDao.mock";
import {IItemDao} from "../daos/Item/ItemDao";
import ItemDao from "../daos/Item/ItemDao.mock";
import {ICustomerDao} from "../daos/Customer/CustomerDao";
import CustomerDao from "../daos/Customer/CustomerDao.mock";
import {IPricingRule} from "../entities/PricingRule";
import {IItem} from "../entities/Item";
import Checkout, {ICheckout} from "../entities/Checkout";
import {ICustomer} from "../entities/Customer";

const router = Router();
const pricingDao: IPricingRuleDao = new PricingRuleDao();
const itemsDao: IItemDao = new ItemDao();
const customersDao: ICustomerDao = new CustomerDao();

router.post('/customers', async (req: Request, res: Response) => {
   const customer = req.body;
   const response = await customersDao.saveCustomer(customer);
   res.send({response});
});

router.get('/customers/:name', async (req: Request, res: Response) => {
   const name = req.params.name;
   const response = await customersDao.getCustomerByName(name);
   res.send({response});
});

router.post('/customers/addPricing', async (req: Request, res: Response) => {
   const name = req.body.name;
   const code = req.body.code;
   console.log(req.body);
   const response = await customersDao.addPricingToCustomer(name, code);
   res.send({response});
});

router.post('/customers/resetPricing', async (req: Request, res: Response) => {
   const name = req.body.name;
   const response = await customersDao.resetPricingForCustomer(name);
   res.send({response});
});

router.get('/customers', async (req: Request, res: Response) => {
   const response = await customersDao.getAllCustomers();
   res.send({response});
});

router.delete('/customers/all', async (req: Request, res: Response) => {
   const response = await customersDao.deleteAllCustomers();
   res.send({response});
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

router.post('/checkout', async (req: Request, res: Response) => {
   const name = req.body.name;
   const itemNames = req.body.items;
   const codes = req.body.codes;
   const pricingRules: IPricingRule[] = [] as IPricingRule[];
   const items: IItem[] = [] as IItem[];
   const customer = await customersDao.getCustomerByName(name);
   if(codes && codes[0]) {
      for (const code of codes) {
         const pricingRule = await pricingDao.getPricingByCode(code);
         if (pricingRule === null) {
            res.send("Invalid Code");
         }
         pricingRules.push(pricingRule as IPricingRule);
      }
   }
   if(itemNames && itemNames[0]) {
      for(const itemName of itemNames) {
         const item = await itemsDao.getItemByName(itemName);
         if (item === null) {
            res.send("Invalid Item");
         }
         items.push(item as IItem);
      }
   }
   if (customer === null)
      res.send('Invalid customer');
   const checkout: ICheckout = new Checkout(pricingRules, customer as ICustomer);
   for(const item of items) {
      checkout.add(item);
   }
   const response = {
      customer, items, pricingRules,
      totalPrice: checkout.total()
   }
   res.send({response});
});

export default router;
