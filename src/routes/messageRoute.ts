import express from 'express';
import messageController from '../controllers/messageController';

const router = express.Router();

router.route('/:message')
    .get(messageController);

export default router;
