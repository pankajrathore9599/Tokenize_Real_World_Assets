import express from 'express';
import { mintToken } from '../controllers/mintController.js';

const router = express.Router();

router.post('/mint-token', mintToken);

export default router;
