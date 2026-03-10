import { Request, Response } from 'express';
import prisma from '../prisma';

export const getPublicCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                description: true,
                duration: true,
                feeStructure: true,
            }
        });
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCourseBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const course = await prisma.course.findUnique({
            where: { slug }
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const submitInquiry = async (req: Request, res: Response) => {
    try {
        // In a real scenario, you'd save this to `ContactMessage` table 
        // (which needs to be added to the schema, or handled by a 3rd party like Resend)
        const { name, email, mobile, message } = req.body;

        console.log('New Inquiry received:', { name, email, mobile, message });

        res.status(201).json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const { name, email, mobile, position, resumeUrl } = req.body;

        const application = await prisma.application.create({
            data: {
                name,
                email,
                mobile,
                position,
                resumeUrl: resumeUrl || 'local_upload' // In a real app we would upload & pass link
            }
        });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
