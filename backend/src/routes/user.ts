import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);

export default router;