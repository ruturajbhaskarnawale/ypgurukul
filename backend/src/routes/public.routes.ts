import { Router } from 'express';
import { getPublicCourses, getCourseBySlug, submitInquiry } from '../controllers/public.controller';

const router = Router();

router.get('/courses', getPublicCourses);
router.get('/courses/:slug', getCourseBySlug);
router.post('/inquiries', submitInquiry);

export default router;
