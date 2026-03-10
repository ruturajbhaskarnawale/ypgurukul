import { Router } from 'express';
import { submitApplication } from '../controllers/public.controller';

const router = Router();

// POST /api/v1/career/apply
// Using public controller since this doesn't need auth, though we could make a career controller too.
router.post('/apply', submitApplication);

export default router;
