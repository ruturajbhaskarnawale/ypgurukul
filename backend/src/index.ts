import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './prisma';

import authRoutes from './routes/auth.routes';
import publicRoutes from './routes/public.routes';
import portalRoutes from './routes/portal.routes';
import adminRoutes from './routes/admin.routes';
import careerRoutes from './routes/career.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/portal', portalRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/career', careerRoutes);

// Basic health check route
app.get('/health', async (req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: 'OK', database: 'Connected' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
    }
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
