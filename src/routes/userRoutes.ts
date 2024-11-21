// src/routes/userRoutes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getProfile } from '../controllers/getProfile';
import { updateProfile } from '../controllers/updateProfile';
import { deleteProfile } from '../controllers/deleteProfile';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

// Rutas públicas
router.post('/api/users/register', [
  body('names').notEmpty().withMessage('El nombre es requerido'),
  body('lastNames').notEmpty().withMessage('El Apellido es requerido'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], register);

router.post('/api/users/login', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
], login);

// Rutas protegidas
router.get('/api/users/profile', authMiddleware, getProfile);
router.put('/api/users/profile/:userId', authMiddleware, updateProfile);
router.delete('/api/users/profile/:userId', authMiddleware, deleteProfile);
export default router;
