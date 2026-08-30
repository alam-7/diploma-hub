// ============================================================
// MSBTE K-SCHEME COMPLETE CURRICULUM DATABASE
// ============================================================
// Source: MSBTE Official Website (msbte.ac.in)
// Scheme: K Scheme
// Board: Maharashtra State Board of Technical Education
// Duration: 3 Years (6 Semesters)
// Verification Status: Needs Verification
// Last Updated: 2024
// ============================================================

var MSBTE_K_SCHEME = {
    // ============================================================
    // 1. COMPUTER ENGINEERING (CO)
    // ============================================================
    'computer-engineering': {
        code: 'CO',
        name: 'Computer Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Computer Engineering focuses on software development, hardware systems, networking, and emerging technologies.',
        careerOpportunities: [
            'Software Developer',
            'Web Developer',
            'Network Administrator',
            'Database Administrator',
            'System Analyst',
            'IT Support Specialist',
            'Cloud Engineer',
            'Data Scientist'
        ],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'CO1K',
                description: 'Foundation courses for Computer Engineering',
                subjects: [
                    {
                        code: '311302',
                        name: 'Basic Mathematics',
                        shortName: 'BMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 },
                        assessment: { fa: 30, sa: 70, practical: 0 }
                    },
                    {
                        code: '311303',
                        name: 'Communication Skills (English)',
                        shortName: 'CSE',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 0 }
                    },
                    {
                        code: '311305',
                        name: 'Basic Science',
                        shortName: 'BSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 0 }
                    },
                    {
                        code: '311001',
                        name: 'Fundamentals of ICT',
                        shortName: 'FICT',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 25 }
                    },
                    {
                        code: '311003',
                        name: 'Yoga and Meditation',
                        shortName: 'YM',
                        type: 'Practical',
                        credits: 1,
                        marks: 25,
                        hours: { theory: 0, practical: 16, tutorial: 0 },
                        assessment: { fa: 25, sa: 0, practical: 0 }
                    },
                    {
                        code: '311006',
                        name: 'Engineering Graphics',
                        shortName: 'EG',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'CO2K',
                description: 'Introduction to programming and core concepts',
                subjects: [
                    {
                        code: '312301',
                        name: 'Applied Mathematics',
                        shortName: 'AMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 },
                        assessment: { fa: 30, sa: 70, practical: 0 }
                    },
                    {
                        code: '312303',
                        name: 'Programming in C',
                        shortName: 'C Programming',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '312302',
                        name: 'Digital Electronics',
                        shortName: 'DE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '312304',
                        name: 'Web Page Designing',
                        shortName: 'WPD',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 16, practical: 32, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 25 }
                    },
                    {
                        code: '312002',
                        name: 'Professional Communication',
                        shortName: 'PC',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 0 }
                    }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'CO3K',
                description: 'Core programming and database concepts',
                subjects: [
                    {
                        code: '313301',
                        name: 'Data Structure Using C',
                        shortName: 'DSU',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '313302',
                        name: 'Database Management System',
                        shortName: 'DBMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '313304',
                        name: 'Object Oriented Programming Using C++',
                        shortName: 'OOP',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '313303',
                        name: 'Digital Techniques',
                        shortName: 'DT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'CO4K',
                description: 'Advanced programming and networking',
                subjects: [
                    {
                        code: '314317',
                        name: 'Java Programming',
                        shortName: 'JAVA',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '314318',
                        name: 'Data Communication and Computer Network',
                        shortName: 'DCCN',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '314319',
                        name: 'Information Security',
                        shortName: 'IS',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 },
                        assessment: { fa: 25, sa: 50, practical: 0 }
                    },
                    {
                        code: '314301',
                        name: 'Environmental Education and Sustainability',
                        shortName: 'EES',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 0 }
                    }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'CO5K',
                description: 'Advanced concepts and specialization',
                subjects: [
                    {
                        code: '315319',
                        name: 'Operating System',
                        shortName: 'OS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '315323',
                        name: 'Software Engineering',
                        shortName: 'SE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '315324',
                        name: 'Advance Database Management',
                        shortName: 'ADBMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '315325',
                        name: 'Cloud Computing',
                        shortName: 'CC',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 16, tutorial: 0 },
                        assessment: { fa: 25, sa: 50, practical: 25 }
                    },
                    {
                        code: '315301',
                        name: 'Management',
                        shortName: 'MGT',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 },
                        assessment: { fa: 25, sa: 25, practical: 0 }
                    }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'CO6K',
                description: 'Emerging technologies and project work',
                subjects: [
                    {
                        code: '316313',
                        name: 'Emerging Trends in Computer Engineering',
                        shortName: 'ETCE',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 },
                        assessment: { fa: 25, sa: 50, practical: 0 }
                    },
                    {
                        code: '316316',
                        name: 'Machine Learning',
                        shortName: 'ML',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '316318',
                        name: 'Big Data Analytics',
                        shortName: 'BDA',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 },
                        assessment: { fa: 30, sa: 70, practical: 30 }
                    },
                    {
                        code: '316320',
                        name: 'Capstone Project',
                        shortName: 'Project',
                        type: 'Project',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 96, tutorial: 0 },
                        assessment: { fa: 50, sa: 100, practical: 50 }
                    }
                ]
            }
        }
    },

    // ============================================================
    // 2. CIVIL ENGINEERING (CE)
    // ============================================================
    'civil-engineering': {
        code: 'CE',
        name: 'Civil Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Civil Engineering deals with construction, infrastructure, surveying, and structural design.',
        careerOpportunities: [
            'Site Engineer',
            'Structural Engineer',
            'Surveyor',
            'Construction Manager',
            'Quality Control Engineer',
            'Infrastructure Developer'
        ],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'CE1K',
                description: 'Foundation courses for Civil Engineering',
                subjects: [
                    {
                        code: '311302',
                        name: 'Basic Mathematics',
                        shortName: 'BMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '311303',
                        name: 'Communication Skills (English)',
                        shortName: 'CSE',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311305',
                        name: 'Basic Science',
                        shortName: 'BSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311001',
                        name: 'Fundamentals of ICT',
                        shortName: 'FICT',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '311003',
                        name: 'Yoga and Meditation',
                        shortName: 'YM',
                        type: 'Practical',
                        credits: 1,
                        marks: 25,
                        hours: { theory: 0, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311006',
                        name: 'Engineering Graphics',
                        shortName: 'EG',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    },
                    {
                        code: '311010',
                        name: 'Civil Engineering Workshop',
                        shortName: 'CEW',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 }
                    }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'CE2K',
                description: 'Core Civil Engineering fundamentals',
                subjects: [
                    {
                        code: '312301',
                        name: 'Applied Mathematics',
                        shortName: 'AMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '312308',
                        name: 'Applied Science',
                        shortName: 'ASC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312312',
                        name: 'Engineering Mechanics',
                        shortName: 'EM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312338',
                        name: 'Building Material and Construction',
                        shortName: 'BMC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312339',
                        name: 'Surveying',
                        shortName: 'SUR',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 32, practical: 48, tutorial: 0 }
                    },
                    {
                        code: '312002',
                        name: 'Professional Communication',
                        shortName: 'PC',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312003',
                        name: 'Social and Life Skills',
                        shortName: 'SLS',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'CE3K',
                description: 'Advanced Civil Engineering concepts',
                subjects: [
                    {
                        code: '313308',
                        name: 'Strength of Materials',
                        shortName: 'SOM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313321',
                        name: 'Advanced Surveying',
                        shortName: 'ASUR',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 32, practical: 48, tutorial: 0 }
                    },
                    {
                        code: '313322',
                        name: 'Concrete Technology',
                        shortName: 'CT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313323',
                        name: 'Highway Engineering',
                        shortName: 'HE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '313002',
                        name: 'Essence of Indian Constitution',
                        shortName: 'EIC',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '313009',
                        name: 'Building Planning and Drawing with CAD',
                        shortName: 'BPDC',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'CE4K',
                description: 'Specialized Civil Engineering subjects',
                subjects: [
                    {
                        code: '314301',
                        name: 'Environmental Education and Sustainability',
                        shortName: 'EES',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '314303',
                        name: 'Hydraulics',
                        shortName: 'HYD',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314312',
                        name: 'Railway, Bridge and Tunnel Engineering',
                        shortName: 'RBTE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '314313',
                        name: 'Estimating, Costing and Valuation',
                        shortName: 'ECV',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314314',
                        name: 'Water and Wastewater Engineering',
                        shortName: 'WWE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314315',
                        name: 'Geotechnical Engineering',
                        shortName: 'GTE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'CE5K',
                description: 'Advanced Civil Engineering with specialization',
                subjects: [
                    {
                        code: '315313',
                        name: 'Theory of Structure',
                        shortName: 'TOS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '315314',
                        name: 'Water Resource Engineering',
                        shortName: 'WRE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315315',
                        name: 'Emerging Trends in Civil Engineering',
                        shortName: 'ETCE',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315316',
                        name: 'Energy Conservation & Green Building',
                        shortName: 'ECGB',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315301',
                        name: 'Management',
                        shortName: 'MGT',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315004',
                        name: 'Internship - 12 Weeks',
                        shortName: 'INT',
                        type: 'Internship',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 192, tutorial: 0 }
                    }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'CE6K',
                description: 'Final year with advanced topics and project',
                subjects: [
                    {
                        code: '316307',
                        name: 'Contracts and Billing',
                        shortName: 'CB',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316308',
                        name: 'Design of RCC and Steel Structures',
                        shortName: 'DRSS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '316309',
                        name: 'Maintenance and Repairs of Structures',
                        shortName: 'MRS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316312',
                        name: 'Solid Waste Management',
                        shortName: 'SWM',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316004',
                        name: 'Capstone Project',
                        shortName: 'Project',
                        type: 'Project',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 96, tutorial: 0 }
                    }
                ]
            }
        }
    },

    // ============================================================
    // 3. ELECTRICAL ENGINEERING (EE)
    // ============================================================
    'electrical-engineering': {
        code: 'EE',
        name: 'Electrical Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Electrical Engineering deals with power systems, machines, control systems, and electrical infrastructure.',
        careerOpportunities: [
            'Electrical Engineer',
            'Power Systems Engineer',
            'Control Systems Engineer',
            'Maintenance Engineer',
            'Automation Engineer',
            'Energy Auditor'
        ],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'EE1K',
                description: 'Foundation courses for Electrical Engineering',
                subjects: [
                    {
                        code: '311302',
                        name: 'Basic Mathematics',
                        shortName: 'BMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '311303',
                        name: 'Communication Skills (English)',
                        shortName: 'CSE',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311305',
                        name: 'Basic Science',
                        shortName: 'BSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311001',
                        name: 'Fundamentals of ICT',
                        shortName: 'FICT',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '311003',
                        name: 'Yoga and Meditation',
                        shortName: 'YM',
                        type: 'Practical',
                        credits: 1,
                        marks: 25,
                        hours: { theory: 0, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311006',
                        name: 'Engineering Graphics',
                        shortName: 'EG',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'EE2K',
                description: 'Electrical fundamentals',
                subjects: [
                    {
                        code: '312301',
                        name: 'Applied Mathematics',
                        shortName: 'AMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '312310',
                        name: 'Fundamental of Electrical Engineering',
                        shortName: 'FEE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312309',
                        name: 'Elements of Electronics',
                        shortName: 'EE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312315',
                        name: 'Elements of Electrical Engineering',
                        shortName: 'EEE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'EE3K',
                description: 'Core Electrical Engineering subjects',
                subjects: [
                    {
                        code: '313332',
                        name: 'Electrical Circuits and Network',
                        shortName: 'ECN',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313334',
                        name: 'Electrical and Electronic Measurement',
                        shortName: 'EEM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313335',
                        name: 'Fundamentals of Power Electronics',
                        shortName: 'FPE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313333',
                        name: 'Electrical Power Generation, Transmission and Distribution',
                        shortName: 'EPGTD',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'EE4K',
                description: 'Advanced Electrical Engineering',
                subjects: [
                    {
                        code: '314322',
                        name: 'D.C. Machines and Transformers',
                        shortName: 'DCMT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '314324',
                        name: 'Digital Electronics and Microcontroller Applications',
                        shortName: 'DEMA',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314323',
                        name: 'Utilization of Electrical Energy',
                        shortName: 'UEE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '314325',
                        name: 'Electrical Estimating and Contracting',
                        shortName: 'EEC',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '314301',
                        name: 'Environmental Education and Sustainability',
                        shortName: 'EES',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'EE5K',
                description: 'Advanced Electrical with specialization',
                subjects: [
                    {
                        code: '315333',
                        name: 'A.C. Machines Performance',
                        shortName: 'ACMP',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '315334',
                        name: 'Switchgear and Protection',
                        shortName: 'SGP',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '315335',
                        name: 'Power System Operation and Control',
                        shortName: 'PSOC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315301',
                        name: 'Management',
                        shortName: 'MGT',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315004',
                        name: 'Internship - 12 Weeks',
                        shortName: 'INT',
                        type: 'Internship',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 192, tutorial: 0 }
                    }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'EE6K',
                description: 'Final year with emerging technologies',
                subjects: [
                    {
                        code: '316336',
                        name: 'Automation & PLC',
                        shortName: 'APLC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '316337',
                        name: 'Energy Conservation and Audit',
                        shortName: 'ECA',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316338',
                        name: 'Maintenance of Electrical Equipment',
                        shortName: 'MEE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '316004',
                        name: 'Capstone Project',
                        shortName: 'Project',
                        type: 'Project',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 96, tutorial: 0 }
                    }
                ]
            }
        }
    },

    // ============================================================
    // 4. MECHANICAL ENGINEERING (ME)
    // ============================================================
    'mechanical-engineering': {
        code: 'ME',
        name: 'Mechanical Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Mechanical Engineering deals with design, manufacturing, and maintenance of mechanical systems.',
        careerOpportunities: [
            'Design Engineer',
            'Manufacturing Engineer',
            'Quality Control Engineer',
            'Maintenance Engineer',
            'CAD/CAM Engineer',
            'Production Engineer'
        ],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'ME1K',
                description: 'Foundation courses for Mechanical Engineering',
                subjects: [
                    {
                        code: '311302',
                        name: 'Basic Mathematics',
                        shortName: 'BMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '311303',
                        name: 'Communication Skills (English)',
                        shortName: 'CSE',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311305',
                        name: 'Basic Science',
                        shortName: 'BSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311001',
                        name: 'Fundamentals of ICT',
                        shortName: 'FICT',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '311003',
                        name: 'Yoga and Meditation',
                        shortName: 'YM',
                        type: 'Practical',
                        credits: 1,
                        marks: 25,
                        hours: { theory: 0, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311006',
                        name: 'Engineering Graphics',
                        shortName: 'EG',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'ME2K',
                description: 'Mechanical Engineering fundamentals',
                subjects: [
                    {
                        code: '312301',
                        name: 'Applied Mathematics',
                        shortName: 'AMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '312308',
                        name: 'Applied Science',
                        shortName: 'ASC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312312',
                        name: 'Engineering Mechanics',
                        shortName: 'EM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312340',
                        name: 'Basic Workshop Practice',
                        shortName: 'BWP',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 0, practical: 64, tutorial: 0 }
                    }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'ME3K',
                description: 'Core Mechanical Engineering subjects',
                subjects: [
                    {
                        code: '313341',
                        name: 'Strength of Materials',
                        shortName: 'SOM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313342',
                        name: 'Manufacturing Processes',
                        shortName: 'MP',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313343',
                        name: 'Thermodynamics',
                        shortName: 'TD',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313344',
                        name: 'Engineering Drawing / CAD',
                        shortName: 'EDC',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'ME4K',
                description: 'Advanced Mechanical Engineering',
                subjects: [
                    {
                        code: '314345',
                        name: 'Fluid Mechanics',
                        shortName: 'FM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314346',
                        name: 'Heat Transfer',
                        shortName: 'HT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314347',
                        name: 'Manufacturing Technology',
                        shortName: 'MT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314348',
                        name: 'Machine Design',
                        shortName: 'MD',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314301',
                        name: 'Environmental Education and Sustainability',
                        shortName: 'EES',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'ME5K',
                description: 'Advanced Mechanical with specialization',
                subjects: [
                    {
                        code: '315349',
                        name: 'Advanced Manufacturing',
                        shortName: 'AM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '315350',
                        name: 'Industrial Engineering',
                        shortName: 'IE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315351',
                        name: 'Thermal Engineering',
                        shortName: 'TE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '315301',
                        name: 'Management',
                        shortName: 'MGT',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315004',
                        name: 'Internship - 12 Weeks',
                        shortName: 'INT',
                        type: 'Internship',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 192, tutorial: 0 }
                    }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'ME6K',
                description: 'Final year with emerging technologies',
                subjects: [
                    {
                        code: '316352',
                        name: 'Automation & Robotics',
                        shortName: 'AR',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '316353',
                        name: 'CNC / Advanced Manufacturing',
                        shortName: 'CNCAM',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '316354',
                        name: 'Maintenance Engineering',
                        shortName: 'ME',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316004',
                        name: 'Capstone Project',
                        shortName: 'Project',
                        type: 'Project',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 96, tutorial: 0 }
                    }
                ]
            }
        }
    },

    // ============================================================
    // 5. ELECTRONICS & TELECOMMUNICATION ENGINEERING (EJ)
    // ============================================================
    'electronics-telecommunication': {
        code: 'EJ',
        name: 'Electronics & Telecommunication Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Electronics & Telecommunication Engineering focuses on electronic circuits, communication systems, signal processing, and IoT.',
        careerOpportunities: [
            'Electronics Engineer',
            'Telecommunication Engineer',
            'Embedded Systems Engineer',
            'IoT Engineer',
            'Network Engineer',
            'RF Engineer'
        ],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'EJ1K',
                description: 'Foundation courses for Electronics & Telecommunication',
                subjects: [
                    {
                        code: '311302',
                        name: 'Basic Mathematics',
                        shortName: 'BMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '311303',
                        name: 'Communication Skills (English)',
                        shortName: 'CSE',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311305',
                        name: 'Basic Science',
                        shortName: 'BSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311001',
                        name: 'Fundamentals of ICT',
                        shortName: 'FICT',
                        type: 'Practical',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 0, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '311003',
                        name: 'Yoga and Meditation',
                        shortName: 'YM',
                        type: 'Practical',
                        credits: 1,
                        marks: 25,
                        hours: { theory: 0, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '311006',
                        name: 'Engineering Graphics',
                        shortName: 'EG',
                        type: 'Practical',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 16, practical: 48, tutorial: 0 }
                    }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'EJ2K',
                description: 'Electronics fundamentals',
                subjects: [
                    {
                        code: '312301',
                        name: 'Applied Mathematics',
                        shortName: 'AMS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 16 }
                    },
                    {
                        code: '312314',
                        name: 'Basic Electronics',
                        shortName: 'BE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '312309',
                        name: 'Elements of Electronics',
                        shortName: 'EE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'EJ3K',
                description: 'Core Electronics and Communication',
                subjects: [
                    {
                        code: '313324',
                        name: 'Analog Electronics',
                        shortName: 'AE',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313303',
                        name: 'Digital Techniques',
                        shortName: 'DT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313326',
                        name: 'Principles of Electronic Communication',
                        shortName: 'PEC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '313325',
                        name: 'Circuits & Networks',
                        shortName: 'CN',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'EJ4K',
                description: 'Advanced Electronics and Communication',
                subjects: [
                    {
                        code: '314326',
                        name: 'Digital Communication Systems',
                        shortName: 'DCS',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314327',
                        name: 'Consumer Electronic Systems',
                        shortName: 'CES',
                        type: 'Theory',
                        credits: 3,
                        marks: 75,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '314328',
                        name: 'Microcontroller & Applications',
                        shortName: 'MCA',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '314329',
                        name: 'Analog & Digital Communication',
                        shortName: 'ADC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '314301',
                        name: 'Environmental Education and Sustainability',
                        shortName: 'EES',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'EJ5K',
                description: 'Advanced Communication and IoT',
                subjects: [
                    {
                        code: '315355',
                        name: 'Mobile & Wireless Communication',
                        shortName: 'MWC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '315356',
                        name: 'Embedded System',
                        shortName: 'ES',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '315357',
                        name: 'IoT Applications',
                        shortName: 'IoT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '315301',
                        name: 'Management',
                        shortName: 'MGT',
                        type: 'Theory',
                        credits: 2,
                        marks: 50,
                        hours: { theory: 32, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '315004',
                        name: 'Internship - 12 Weeks',
                        shortName: 'INT',
                        type: 'Internship',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 192, tutorial: 0 }
                    }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'EJ6K',
                description: 'Final year with emerging technologies',
                subjects: [
                    {
                        code: '316358',
                        name: 'Optical Network and Satellite Communication',
                        shortName: 'ONSC',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 0, tutorial: 0 }
                    },
                    {
                        code: '316359',
                        name: 'Industrial Robotics and Applications',
                        shortName: 'IRA',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 16, tutorial: 0 }
                    },
                    {
                        code: '316360',
                        name: 'Industrial Internet of Things',
                        shortName: 'IIoT',
                        type: 'Theory',
                        credits: 4,
                        marks: 100,
                        hours: { theory: 48, practical: 32, tutorial: 0 }
                    },
                    {
                        code: '316004',
                        name: 'Capstone Project',
                        shortName: 'Project',
                        type: 'Project',
                        credits: 6,
                        marks: 150,
                        hours: { theory: 0, practical: 96, tutorial: 0 }
                    }
                ]
            }
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getTotalCredits(programmeSlug, semester) {
    try {
        var programme = MSBTE_K_SCHEME[programmeSlug];
        if (!programme || !programme.semesters[semester]) return 0;
        
        var subjects = programme.semesters[semester].subjects || [];
        return subjects.reduce(function(total, subject) {
            return total + (subject.credits || 0);
        }, 0);
    } catch (e) {
        console.error('Error calculating total credits:', e);
        return 0;
    }
}

function getTotalMarks(programmeSlug, semester) {
    try {
        var programme = MSBTE_K_SCHEME[programmeSlug];
        if (!programme || !programme.semesters[semester]) return 0;
        
        var subjects = programme.semesters[semester].subjects || [];
        return subjects.reduce(function(total, subject) {
            return total + (subject.marks || 0);
        }, 0);
    } catch (e) {
        console.error('Error calculating total marks:', e);
        return 0;
    }
}

// ============================================================
// SEARCH FUNCTION
// ============================================================
function searchCourses(query) {
    var results = [];
    query = query.toLowerCase().trim();
    
    if (!query) return results;
    
    Object.keys(MSBTE_K_SCHEME).forEach(function(programmeSlug) {
        var programme = MSBTE_K_SCHEME[programmeSlug];
        
        Object.keys(programme.semesters).forEach(function(semKey) {
            var semester = programme.semesters[semKey];
            
            semester.subjects.forEach(function(subject) {
                var searchableText = [
                    subject.code,
                    subject.name,
                    subject.shortName,
                    programme.name,
                    programme.code,
                    semester.year,
                    semester.name
                ].join(' ').toLowerCase();
                
                if (searchableText.includes(query)) {
                    results.push({
                        programmeSlug: programmeSlug,
                        programmeName: programme.name,
                        programmeCode: programme.code,
                        semester: parseInt(semKey),
                        semesterName: semester.name,
                        year: semester.year,
                        subject: subject
                    });
                }
            });
        });
    });
    
    return results;
}

// ============================================================
// EXPORT FOR USE IN OTHER FILES
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MSBTE_K_SCHEME: MSBTE_K_SCHEME,
        getTotalCredits: getTotalCredits,
        getTotalMarks: getTotalMarks,
        searchCourses: searchCourses
    };
}