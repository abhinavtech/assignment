import {Request, Response, Router} from 'express';
import Customer from "../entities/Customer";

const router = Router();

router.post('/customers', (req: Request, res: Response) => {
   const customer = new Customer(req.body)
   res.send('Hello Pizza!');
});

router.post('/items', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

router.post('/pricing', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

router.post('/order', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

export default router;
