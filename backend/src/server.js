
import express from 'express';
import cors from 'cors';

import { config } from './config/env.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'AI Playground API is running'
    });
});

app.use('/api/ai', aiRoutes);

app.listen(config.port, () => {
    console.log(
        `Server running at http://localhost:${config.port}`
    );
});