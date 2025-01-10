import { Router } from 'express';

import userRouter from './user-routes';

const router = Router();

router.use('/user', userRouter);

router.use('*', (_, res) => {
  return res.status(404).json({ error: 'not found' });
});

export default router;
