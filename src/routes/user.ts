import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as AuthController from '../controllers/authController';
import { authenticateToken } from '../middleware/authentication';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.post('/login', authenticateToken, AuthController.authUser);

export default router;
