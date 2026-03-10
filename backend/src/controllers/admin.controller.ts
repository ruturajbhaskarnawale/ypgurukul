import { Request, Response } from 'express';
import prisma from '../prisma';

// --- Courses ---

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, slug, category, description, duration, feeStructure, subjects, batchTimings } = req.body;

        // Validate slug uniqueness
        const existing = await prisma.course.findUnique({ where: { slug } });
        if (existing) {
            return res.status(400).json({ error: 'Slug already exists' });
        }

        const course = await prisma.course.create({
            data: { title, slug, category, description, duration, feeStructure, subjects, batchTimings }
        });

        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.course.delete({ where: { id } });
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// --- Materials ---

export const uploadMaterial = async (req: Request, res: Response) => {
    try {
        const { title, fileUrl, courseId } = req.body;

        // Ensure course exists
        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const material = await prisma.studyMaterial.create({
            data: { title, fileUrl, courseId }
        });

        res.status(201).json(material);
    } catch (error) {
        console.error('Error uploading material:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// --- Test Results ---

export const addTestResult = async (req: Request, res: Response) => {
    try {
        const { userId, testName, marksObtained, totalMarks, testDate } = req.body;

        const result = await prisma.testResult.create({
            data: { userId, testName, marksObtained, totalMarks, testDate: new Date(testDate) }
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding test result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// --- Readers (GET) ---

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllMaterials = async (req: Request, res: Response) => {
    try {
        const materials = await prisma.studyMaterial.findMany({
            include: { course: { select: { title: true } } },
            orderBy: { uploadedAt: 'desc' }
        });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllTestResults = async (req: Request, res: Response) => {
    try {
        const results = await prisma.testResult.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { testDate: 'desc' }
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { appliedAt: 'desc' }
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await prisma.user.findMany({
            where: { role: 'STUDENT' },
            select: { id: true, name: true, email: true },
            orderBy: { name: 'asc' }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const students = await prisma.user.count({ where: { role: 'STUDENT' } });
        const courses = await prisma.course.count();
        const materials = await prisma.studyMaterial.count();
        const applications = await prisma.application.count();

        res.json({ students, courses, materials, applications });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
