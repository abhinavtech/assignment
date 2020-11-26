import {Request, Response, Router} from 'express';
import {IPricingRuleDao} from "../daos/PricingRule/PricingRuleDao";
import PricingRuleDao from "../daos/PricingRule/PricingRuleDao.mock";

const router = Router();
const pricingDao: IPricingRuleDao = new PricingRuleDao();

router.post('/customers', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

router.post('/items', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
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
