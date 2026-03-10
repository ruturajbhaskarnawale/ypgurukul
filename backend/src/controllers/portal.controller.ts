import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getStudentProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                mobileNumber: true,
                studentProfile: {
                    include: {
                        enrollments: {
                            include: {
                                course: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateStudentProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const { name, mobileNumber, parentName, parentMobile } = req.body;

        // Update User name and mobile
        await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(mobileNumber !== undefined && { mobileNumber }),
            },
        });

        // Update StudentProfile guardian details
        const studentProfile = await prisma.studentProfile.findUnique({ where: { userId } });
        if (studentProfile) {
            await prisma.studentProfile.update({
                where: { userId },
                data: {
                    ...(parentName !== undefined && { parentName }),
                    ...(parentMobile !== undefined && { parentMobile }),
                },
            });
        }

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required.' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters.' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Current password is incorrect.' });
        }

        const newHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({ where: { id: userId }, data: { passwordHash: newHash } });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStudentTestResults = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const results = await prisma.testResult.findMany({
            where: { userId },
            orderBy: { testDate: 'desc' }
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching test results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStudentMaterials = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        // First find which courses the student is enrolled in
        const student = await prisma.studentProfile.findUnique({
            where: { userId },
            include: { enrollments: true }
        });

        if (!student) {
            return res.status(404).json({ error: 'Student profile not found' });
        }

        const courseIds = student.enrollments.map((e: any) => e.courseId);

        // Get materials only for enrolled courses
        const materials = await prisma.studyMaterial.findMany({
            where: {
                courseId: { in: courseIds }
            },
            include: {
                course: { select: { title: true } }
            },
            orderBy: { uploadedAt: 'desc' }
        });

        res.json(materials);
    } catch (error) {
        console.error('Error fetching study materials:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
