import { Router } from 'express';
import {
    createCourse, deleteCourse, uploadMaterial, addTestResult,
    getAllCourses, getAllMaterials, getAllTestResults, getAllApplications, getAdminStats, getAllStudents
} from '../controllers/admin.controller';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Protect ALL admin routes
router.use(verifyToken, requireAdmin);

router.post('/courses', createCourse);
router.delete('/courses/:id', deleteCourse);
router.get('/courses', getAllCourses);

router.post('/materials', uploadMaterial);
router.get('/materials', getAllMaterials);

router.post('/tests', addTestResult);
router.get('/tests', getAllTestResults);

router.get('/applications', getAllApplications);
router.get('/stats', getAdminStats);
router.get('/students', getAllStudents);

export default router;
