import {Request, Response, Router} from 'express';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
   res.send('Hello Pizza!');
});

export default router;
