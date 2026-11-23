
import { Router } from 'express';

import {
    generateResponse
} from '../controllers/ai.controller.js';

const router = Router();

router.post('/generate', generateResponse);

export default router;
