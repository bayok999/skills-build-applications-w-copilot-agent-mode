import { Router } from 'express';
import { ActivityController, UserController } from '../controllers';

const router = Router();

// User routes
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

// Activity routes
router.get('/activities', ActivityController.getAllActivities);
router.post('/activities', ActivityController.createActivity);

export default router;