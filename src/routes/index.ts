import { Router } from 'express';
import type { Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ title: 'hello world!' });
});

export default router;
