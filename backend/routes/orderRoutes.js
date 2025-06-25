import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, placeOrder);
router.get('/user', authenticate, getUserOrders);
router.get('/', authenticate, isAdmin, getAllOrders);
router.put('/:id', authenticate, isAdmin, updateOrderStatus);

export default router;