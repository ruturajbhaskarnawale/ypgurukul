import { Router } from 'express';
import { getStudentProfile, updateStudentProfile, changePassword, getStudentTestResults, getStudentMaterials } from '../controllers/portal.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Protect all portal routes
router.use(verifyToken);

router.get('/me', getStudentProfile);
router.patch('/me', updateStudentProfile);
router.post('/change-password', changePassword);
router.get('/tests', getStudentTestResults);
router.get('/materials', getStudentMaterials);

export default router;

