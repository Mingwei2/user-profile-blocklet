import { Request, Response, Router } from 'express';

import { updateUserSchema } from '../../../schemas/user-schema';
import UserService from '../services/user-service';

const userRouter = Router();

userRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const user = UserService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'server internal error' });
  }
});

userRouter.put('/:id', (req: Request, res: Response) => {
  try {
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: result.error?.issues,
      });
    }

    const user = UserService.update(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'server internal error' });
  }
});

export default userRouter;
