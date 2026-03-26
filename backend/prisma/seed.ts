import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old data (if tables exist)...');
    // Delete in reverse order of relationships. Ignore errors if a table doesn't exist.
    const deletions = [
        prisma.application,
        prisma.testResult,
        prisma.studyMaterial,
        prisma.enrollment,
        prisma.course,
        prisma.studentProfile,
        prisma.user,
    ];

    for (const model of deletions) {
        try {
            // @ts-ignore
            await model.deleteMany();
        } catch (e) {
            console.warn('Warning while deleting (may not exist):', (e as Error).message || e);
        }
    }

    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Create Users (20 users: 1 Admin, 3 Teachers, 16 Students)
    console.log('Creating users...');
    const usersData = [
        { name: 'Admin User', email: 'admin@ypgurukul.com', role: 'ADMIN', mobileNumber: '9876543210' },
        { name: 'Dr. Anand Kumar', email: 'anand.k@ypgurukul.com', role: 'TEACHER', mobileNumber: '9876543211' },
        { name: 'Priya Sharma', email: 'priya.s@ypgurukul.com', role: 'TEACHER', mobileNumber: '9876543212' },
        { name: 'Rajesh Verma', email: 'rajesh.v@ypgurukul.com', role: 'TEACHER', mobileNumber: '9876543213' },
        // 16 Students
        { name: 'Aarav Patel', email: 'aarav@test.com', role: 'STUDENT', mobileNumber: '9123456701' },
        { name: 'Vivaan Singh', email: 'vivaan@test.com', role: 'STUDENT', mobileNumber: '9123456702' },
        { name: 'Aditya Desai', email: 'aditya@test.com', role: 'STUDENT', mobileNumber: '9123456703' },
        { name: 'Vihaan Joshi', email: 'vihaan@test.com', role: 'STUDENT', mobileNumber: '9123456704' },
        { name: 'Arjun Reddy', email: 'arjun@test.com', role: 'STUDENT', mobileNumber: '9123456705' },
        { name: 'Sai Krishna', email: 'sai@test.com', role: 'STUDENT', mobileNumber: '9123456706' },
        { name: 'Ayaan Iyer', email: 'ayaan@test.com', role: 'STUDENT', mobileNumber: '9123456707' },
        { name: 'Krishna Nair', email: 'krishna@test.com', role: 'STUDENT', mobileNumber: '9123456708' },
        { name: 'Ishaan Gupta', email: 'ishaan@test.com', role: 'STUDENT', mobileNumber: '9123456709' },
        { name: 'Shaurya Mehta', email: 'shaurya@test.com', role: 'STUDENT', mobileNumber: '9123456710' },
        { name: 'Diya Kapoor', email: 'diya@test.com', role: 'STUDENT', mobileNumber: '9123456711' },
        { name: 'Avni Chauhan', email: 'avni@test.com', role: 'STUDENT', mobileNumber: '9123456712' },
        { name: 'Ananya Yadav', email: 'ananya@test.com', role: 'STUDENT', mobileNumber: '9123456713' },
        { name: 'Aadhya Mishra', email: 'aadhya@test.com', role: 'STUDENT', mobileNumber: '9123456714' },
        { name: 'Kiara Bhatia', email: 'kiara@test.com', role: 'STUDENT', mobileNumber: '9123456715' },
        { name: 'Saanvi Dubey', email: 'saanvi@test.com', role: 'STUDENT', mobileNumber: '9123456716' },
    ];

    const createdUsers = await Promise.all(
        usersData.map((data) =>
            prisma.user.create({
                data: {
                    ...data,
                    passwordHash,
                },
            })
        )
    );

    const students = createdUsers.filter((u) => u.role === 'STUDENT');

    // 2. Create StudentProfiles (16 records)
    console.log('Creating student profiles...');
    const parents = ['Rahul', 'Sanjay', 'Vikram', 'Amit', 'Sunil', 'Ashok', 'Prakash', 'Suresh', 'Ramesh', 'Rakesh', 'Anil', 'Rajeev', 'Mukesh', 'Vijay', 'Manoj', 'Deepak'];

    await Promise.all(
        students.map((student, index) =>
            prisma.studentProfile.create({
                data: {
                    userId: student.id,
                    parentName: parents[index],
                    parentMobile: `99887766${index.toString().padStart(2, '0')}`,
                    currentClass: index % 2 === 0 ? 'Class 11' : 'Class 12',
                },
            })
        )
    );

    const studentProfiles = await prisma.studentProfile.findMany();

    // 3. Create Courses (20 records)
    console.log('Creating courses...');
    const coursesData = [
        { title: 'JEE Main Foundation', slug: 'jee-main-foundation', category: 'Foundation', description: 'Strong foundation for JEE Main.', duration: '1 Year', feeStructure: '₹40,000', previewImage: '/images/courses/boards_prep_elite_cinematic_1773085257290.png' },
        { title: 'NEET Foundation', slug: 'neet-foundation', category: 'Foundation', description: 'Early preparation for NEET.', duration: '1 Year', feeStructure: '₹40,000', previewImage: '/images/courses/boards_prep_elite_cinematic_1773085257290.png' },
        { title: 'Class 11 Physics Mastery', slug: 'class-11-physics-mastery', category: '11-12 Science', description: 'In-depth Physics for Class 11.', duration: '1 Year', feeStructure: '₹20,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 11 Chemistry Expert', slug: 'class-11-chemistry-expert', category: '11-12 Science', description: 'Comprehensive Chemistry.', duration: '1 Year', feeStructure: '₹20,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 11 Math Advanced', slug: 'class-11-math-advanced', category: '11-12 Science', description: 'Mathematics for competitive exams.', duration: '1 Year', feeStructure: '₹20,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 11 Biology Pro', slug: 'class-11-biology-pro', category: '11-12 Science', description: 'Detailed Botany and Zoology.', duration: '1 Year', feeStructure: '₹20,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 12 Physics Crash Course', slug: 'class-12-physics-crash', category: '11-12 Science', description: 'Quick revision for boards.', duration: '3 Months', feeStructure: '₹10,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 12 Chemistry Crash Course', slug: 'class-12-chemistry-crash', category: '11-12 Science', description: 'Board focused chemistry.', duration: '3 Months', feeStructure: '₹10,000', previewImage: '/images/courses/class11.png' },
        { title: 'Class 12 Math Crash Course', slug: 'class-12-math-crash', category: '11-12 Science', description: 'Board focused mathematics.', duration: '3 Months', feeStructure: '₹10,000', previewImage: '/images/courses/class11.png' },
        { title: 'Target JEE Advanced', slug: 'target-jee-advanced', category: 'Target Batch', description: 'For droppers aiming for IITs.', duration: '1 Year', feeStructure: '₹80,000', previewImage: '/images/courses/class11.png' },
        { title: 'Target NEET AIIMS', slug: 'target-neet-aiims', category: 'Target Batch', description: 'For droppers aiming for top medical colleges.', duration: '1 Year', feeStructure: '₹80,000', previewImage: '/images/courses/neet_super_30_cinematic_1773085290079.png' },
        { title: 'MHT-CET Complete Guide', slug: 'mht-cet-complete', category: 'State Board', description: 'Maharashtra state engineering entrance.', duration: '6 Months', feeStructure: '₹25,000', previewImage: '/images/courses/mht_cet_guide_cinematic_1773085224064.png' },
        { title: 'GUJCET Special', slug: 'gujcet-special', category: 'State Board', description: 'Gujarat state entrance preparation.', duration: '6 Months', feeStructure: '₹25,000', previewImage: '/images/courses/mht_cet_guide_cinematic_1773085224064.png' },
        { title: 'BITSAT Mock Series', slug: 'bitsat-mock-series', category: 'Test Series', description: 'Online test series for BITSAT.', duration: '2 Months', feeStructure: '₹5,000', previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
        { title: 'NDA Mathematics', slug: 'nda-math', category: 'Defense', description: 'Math preparation for NDA.', duration: '6 Months', feeStructure: '₹15,000', previewImage: '/images/courses/nda_math_intensive_cinematic_1773085240254.png' },
        { title: 'NDA General Ability', slug: 'nda-gat', category: 'Defense', description: 'GAT preparation for NDA.', duration: '6 Months', feeStructure: '₹15,000', previewImage: '/images/courses/nda_math_intensive_cinematic_1773085240254.png' },
        { title: 'Class 10 Board Booster', slug: 'class-10-boards', category: 'Board Prep', description: 'Score 95+ in Class 10.', duration: '1 Year', feeStructure: '₹30,000', previewImage: '/images/courses/boards_prep_elite_cinematic_1773085257290.png' },
        { title: 'NTSE Stage 1', slug: 'ntse-stage-1', category: 'Scholarship', description: 'Preparation for NTSE scholarship.', duration: '6 Months', feeStructure: '₹10,000', previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
        { title: 'Olympiad Mathematics', slug: 'olympiad-math', category: 'Scholarship', description: 'PRMO and RMO preparation.', duration: '1 Year', feeStructure: '₹15,000', previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
        { title: 'KVPY Stream SA', slug: 'kvpy-sa', category: 'Scholarship', description: 'Science aptitude preparation.', duration: '6 Months', feeStructure: '₹12,000', previewImage: '/images/courses/scholarship_masterclass_cinematic_1773085273898.png' },
    ];

    const createdCourses = await Promise.all(
        coursesData.map((data) => prisma.course.create({ data }))
    );

    // 4. Create Enrollments (20 records)
    console.log('Creating enrollments...');
    await Promise.all(
        studentProfiles.map((profile, i) =>
            prisma.enrollment.create({
                data: {
                    studentId: profile.id,
                    // Assign a course sequentially, loop back if needed
                    courseId: createdCourses[i % createdCourses.length].id,
                },
            })
        )
    );
    // Add 4 more random enrollments to make it 20
    for (let i = 0; i < 4; i++) {
        await prisma.enrollment.create({
            data: {
                studentId: studentProfiles[i].id,
                courseId: createdCourses[(i + 5) % createdCourses.length].id,
            }
        });
    }

    // 5. Create Study Materials (20 records)
    console.log('Creating study materials...');
    const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
    const materials = [];
    for (let i = 0; i < 20; i++) {
        materials.push({
            title: `${subjects[i % 4]} Chapter ${i + 1} Notes`,
            fileUrl: `https://example-s3-bucket.com/materials/doc_${i}.pdf`,
            courseId: createdCourses[i % createdCourses.length].id,
        });
    }
    await Promise.all(materials.map(m => prisma.studyMaterial.create({ data: m })));

    // 6. Create Test Results (20 records)
    console.log('Creating test results...');
    const tests = [];
    for (let i = 0; i < 20; i++) {
        tests.push({
            userId: students[i % students.length].id,
            testName: `Weekly Unit Test ${i + 1}`,
            marksObtained: Math.floor(Math.random() * 40) + 60, // 60 to 100
            totalMarks: 100,
            testDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        });
    }
    await Promise.all(tests.map(t => prisma.testResult.create({ data: t })));

    // 7. Create Applications (20 records)
    console.log('Creating applications...');
    const applications = [];
    const appNames = ['Sita', 'Ravi', 'Gita', 'Mohan', 'Laxmi', 'Hari', 'Radha', 'Kishan', 'Meena', 'Raju', 'Kamal', 'Bhavna', 'Ganesh', 'Pooja', 'Nitin', 'Sneha', 'Mahesh', 'Kavita', 'Tarun', 'Nidhi'];
    for (let i = 0; i < 20; i++) {
        applications.push({
            position: i % 2 === 0 ? 'Senior Faculty - Physics' : 'Student Counselor',
            name: appNames[i] + ' ' + 'Deshmukh',
            email: `applicant${i}@gmail.com`,
            mobile: `98989898${i.toString().padStart(2, '0')}`,
            resumeUrl: `https://example-s3-bucket.com/resumes/resume_${i}.pdf`,
        });
    }
    await Promise.all(applications.map(a => prisma.application.create({ data: a })));

    console.log('Database seeded successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
