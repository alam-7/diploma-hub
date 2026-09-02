// ============================================
// COMPLETE MSBTE K-SCHEME DATABASE
// ============================================
console.log('✅ Loading MSBTE K-Scheme data...');

var MSBTE_K_SCHEME = {
    'computer-engineering': {
        code: 'CO',
        name: 'Computer Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Computer Engineering focuses on software development, hardware systems, networking, and emerging technologies.',
        careerOpportunities: ['Software Developer', 'Web Developer', 'Network Administrator', 'Database Administrator', 'System Analyst', 'IT Support Specialist'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'CO1K',
                description: 'Foundation courses for Computer Engineering',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', shortName: 'BMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '311303', name: 'Communication Skills', shortName: 'CS', type: 'Theory', credits: 2, marks: 50, hours: { theory: 32, practical: 16, tutorial: 0 } },
                    { code: '311305', name: 'Basic Science', shortName: 'BSC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '311001', name: 'Fundamentals of ICT', shortName: 'FICT', type: 'Practical', credits: 2, marks: 50, hours: { theory: 0, practical: 32, tutorial: 0 } }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'CO2K',
                description: 'Introduction to programming',
                subjects: [
                    { code: '312303', name: 'Programming in C', shortName: 'C', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '312301', name: 'Applied Mathematics', shortName: 'AM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '312302', name: 'Digital Electronics', shortName: 'DE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'CO3K',
                description: 'Core programming concepts',
                subjects: [
                    { code: '313301', name: 'Data Structure Using C', shortName: 'DSU', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '313302', name: 'Database Management System', shortName: 'DBMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '313304', name: 'Object Oriented Programming', shortName: 'OOP', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'CO4K',
                description: 'Advanced programming',
                subjects: [
                    { code: '314317', name: 'Java Programming', shortName: 'JAVA', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '314318', name: 'Data Communication', shortName: 'DC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '314319', name: 'Information Security', shortName: 'IS', type: 'Theory', credits: 3, marks: 75, hours: { theory: 48, practical: 0, tutorial: 0 } }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'CO5K',
                description: 'Specialization',
                subjects: [
                    { code: '315319', name: 'Operating System', shortName: 'OS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '315323', name: 'Software Engineering', shortName: 'SE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '315324', name: 'Advance Database Management', shortName: 'ADBMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'CO6K',
                description: 'Project work',
                subjects: [
                    { code: '316313', name: 'Emerging Trends', shortName: 'ET', type: 'Theory', credits: 3, marks: 75, hours: { theory: 48, practical: 0, tutorial: 0 } },
                    { code: '316316', name: 'Machine Learning', shortName: 'ML', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '316320', name: 'Capstone Project', shortName: 'CP', type: 'Project', credits: 6, marks: 150, hours: { theory: 0, practical: 96, tutorial: 0 } }
                ]
            }
        }
    },
    'mechanical-engineering': {
        code: 'ME',
        name: 'Mechanical Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Mechanical Engineering deals with design, manufacturing, and maintenance of mechanical systems.',
        careerOpportunities: ['Design Engineer', 'Manufacturing Engineer', 'Quality Control Engineer', 'Maintenance Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'ME1K',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', shortName: 'BMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '311006', name: 'Engineering Graphics', shortName: 'EG', type: 'Practical', credits: 4, marks: 100, hours: { theory: 16, practical: 48, tutorial: 0 } }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'ME2K',
                description: 'Mechanical fundamentals',
                subjects: [
                    { code: '312312', name: 'Engineering Mechanics', shortName: 'EM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '312340', name: 'Basic Workshop Practice', shortName: 'BWP', type: 'Practical', credits: 4, marks: 100, hours: { theory: 0, practical: 64, tutorial: 0 } }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'ME3K',
                description: 'Core Mechanical',
                subjects: [
                    { code: '313341', name: 'Strength of Materials', shortName: 'SOM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '313342', name: 'Manufacturing Processes', shortName: 'MP', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'ME4K',
                description: 'Advanced Mechanical',
                subjects: [
                    { code: '314345', name: 'Fluid Mechanics', shortName: 'FM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '314346', name: 'Heat Transfer', shortName: 'HT', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'ME5K',
                description: 'Specialization',
                subjects: [
                    { code: '315349', name: 'Advanced Manufacturing', shortName: 'AM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '315350', name: 'Industrial Engineering', shortName: 'IE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 0 } }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'ME6K',
                description: 'Project work',
                subjects: [
                    { code: '316352', name: 'Automation & Robotics', shortName: 'AR', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '316004', name: 'Capstone Project', shortName: 'CP', type: 'Project', credits: 6, marks: 150, hours: { theory: 0, practical: 96, tutorial: 0 } }
                ]
            }
        }
    },
    'civil-engineering': {
        code: 'CE',
        name: 'Civil Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Civil Engineering deals with construction, infrastructure, surveying, and structural design.',
        careerOpportunities: ['Site Engineer', 'Structural Engineer', 'Surveyor', 'Construction Manager'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'CE1K',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', shortName: 'BMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '311010', name: 'Civil Engineering Workshop', shortName: 'CEW', type: 'Practical', credits: 2, marks: 50, hours: { theory: 0, practical: 32, tutorial: 0 } }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'CE2K',
                description: 'Civil fundamentals',
                subjects: [
                    { code: '312312', name: 'Engineering Mechanics', shortName: 'EM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '312339', name: 'Surveying', shortName: 'SUR', type: 'Practical', credits: 4, marks: 100, hours: { theory: 32, practical: 48, tutorial: 0 } }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'CE3K',
                description: 'Core Civil',
                subjects: [
                    { code: '313308', name: 'Strength of Materials', shortName: 'SOM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '313322', name: 'Concrete Technology', shortName: 'CT', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'CE4K',
                description: 'Advanced Civil',
                subjects: [
                    { code: '314303', name: 'Hydraulics', shortName: 'HYD', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '314315', name: 'Geotechnical Engineering', shortName: 'GTE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'CE5K',
                description: 'Specialization',
                subjects: [
                    { code: '315313', name: 'Theory of Structure', shortName: 'TOS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '315314', name: 'Water Resource Engineering', shortName: 'WRE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 0 } }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'CE6K',
                description: 'Project work',
                subjects: [
                    { code: '316308', name: 'Design of RCC Structures', shortName: 'DRSS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '316004', name: 'Capstone Project', shortName: 'CP', type: 'Project', credits: 6, marks: 150, hours: { theory: 0, practical: 96, tutorial: 0 } }
                ]
            }
        }
    },
    'electrical-engineering': {
        code: 'EE',
        name: 'Electrical Engineering',
        duration: '3 Years',
        semesters: 6,
        overview: 'Electrical Engineering deals with power systems, machines, and control systems.',
        careerOpportunities: ['Electrical Engineer', 'Power Systems Engineer', 'Control Systems Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'EE1K',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', shortName: 'BMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '311006', name: 'Engineering Graphics', shortName: 'EG', type: 'Practical', credits: 4, marks: 100, hours: { theory: 16, practical: 48, tutorial: 0 } }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'EE2K',
                description: 'Electrical fundamentals',
                subjects: [
                    { code: '312310', name: 'Fundamental of Electrical Engineering', shortName: 'FEE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '312309', name: 'Elements of Electronics', shortName: 'EE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'EE3K',
                description: 'Core Electrical',
                subjects: [
                    { code: '313332', name: 'Electrical Circuits and Network', shortName: 'ECN', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '313334', name: 'Electrical Measurement', shortName: 'EM', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'EE4K',
                description: 'Advanced Electrical',
                subjects: [
                    { code: '314322', name: 'D.C. Machines and Transformers', shortName: 'DCMT', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '314323', name: 'Utilization of Electrical Energy', shortName: 'UEE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 0 } }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'EE5K',
                description: 'Specialization',
                subjects: [
                    { code: '315333', name: 'A.C. Machines Performance', shortName: 'ACMP', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '315334', name: 'Switchgear and Protection', shortName: 'SGP', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'EE6K',
                description: 'Project work',
                subjects: [
                    { code: '316336', name: 'Automation & PLC', shortName: 'APLC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } },
                    { code: '316004', name: 'Capstone Project', shortName: 'CP', type: 'Project', credits: 6, marks: 150, hours: { theory: 0, practical: 96, tutorial: 0 } }
                ]
            }
        }
    },
    'electronics-telecommunication': {
        code: 'EJ',
        name: 'Electronics & Telecommunication',
        duration: '3 Years',
        semesters: 6,
        overview: 'Electronics & Telecommunication focuses on electronic circuits and communication systems.',
        careerOpportunities: ['Electronics Engineer', 'Telecommunication Engineer', 'Embedded Systems Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                code: 'EJ1K',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', shortName: 'BMS', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 16 } },
                    { code: '311006', name: 'Engineering Graphics', shortName: 'EG', type: 'Practical', credits: 4, marks: 100, hours: { theory: 16, practical: 48, tutorial: 0 } }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                code: 'EJ2K',
                description: 'Electronics fundamentals',
                subjects: [
                    { code: '312314', name: 'Basic Electronics', shortName: 'BE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '312309', name: 'Elements of Electronics', shortName: 'EE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                code: 'EJ3K',
                description: 'Core Electronics',
                subjects: [
                    { code: '313324', name: 'Analog Electronics', shortName: 'AE', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '313326', name: 'Electronic Communication', shortName: 'EC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                code: 'EJ4K',
                description: 'Advanced Electronics',
                subjects: [
                    { code: '314326', name: 'Digital Communication', shortName: 'DC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '314328', name: 'Microcontroller Applications', shortName: 'MCA', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                code: 'EJ5K',
                description: 'Specialization',
                subjects: [
                    { code: '315355', name: 'Mobile Communication', shortName: 'MC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 16, tutorial: 0 } },
                    { code: '315356', name: 'Embedded System', shortName: 'ES', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 32, tutorial: 0 } }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                code: 'EJ6K',
                description: 'Project work',
                subjects: [
                    { code: '316358', name: 'Optical Communication', shortName: 'OC', type: 'Theory', credits: 4, marks: 100, hours: { theory: 48, practical: 0, tutorial: 0 } },
                    { code: '316004', name: 'Capstone Project', shortName: 'CP', type: 'Project', credits: 6, marks: 150, hours: { theory: 0, practical: 96, tutorial: 0 } }
                ]
            }
        }
    }
};

// Helper functions
function getTotalCredits(programmeSlug, semester) {
    var programme = MSBTE_K_SCHEME[programmeSlug];
    if (!programme || !programme.semesters[semester]) return 0;
    var subjects = programme.semesters[semester].subjects || [];
    return subjects.reduce(function(total, s) { return total + (s.credits || 0); }, 0);
}

function getTotalMarks(programmeSlug, semester) {
    var programme = MSBTE_K_SCHEME[programmeSlug];
    if (!programme || !programme.semesters[semester]) return 0;
    var subjects = programme.semesters[semester].subjects || [];
    return subjects.reduce(function(total, s) { return total + (s.marks || 0); }, 0);
}

console.log('✅ MSBTE K-Scheme data loaded successfully!');
console.log('📚 Available courses:', Object.keys(MSBTE_K_SCHEME).length);