// ============================================
// COMPLETE MSBTE K-SCHEME DATABASE
// ============================================
console.log('✅ Loading MSBTE K-Scheme data...');

var MSBTE_K_SCHEME = {
    'computer-engineering': {
        code: 'CO',
        name: 'Computer Engineering',
        overview: 'Computer Engineering focuses on software development, hardware systems, networking, and emerging technologies.',
        careerOpportunities: ['Software Developer', 'Web Developer', 'Network Administrator', 'Database Administrator'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                description: 'Foundation courses for Computer Engineering',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills', type: 'Theory', credits: 2, marks: 50 },
                    { code: '311305', name: 'Basic Science', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50 }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                description: 'Introduction to programming',
                subjects: [
                    { code: '312303', name: 'Programming in C', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312302', name: 'Digital Electronics', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                description: 'Core programming concepts',
                subjects: [
                    { code: '313301', name: 'Data Structure Using C', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313302', name: 'Database Management System', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313304', name: 'Object Oriented Programming', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                description: 'Advanced programming',
                subjects: [
                    { code: '314317', name: 'Java Programming', type: 'Theory', credits: 4, marks: 100 },
                    { code: '314318', name: 'Data Communication', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                description: 'Specialization',
                subjects: [
                    { code: '315319', name: 'Operating System', type: 'Theory', credits: 4, marks: 100 },
                    { code: '315323', name: 'Software Engineering', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                description: 'Project work',
                subjects: [
                    { code: '316313', name: 'Emerging Trends', type: 'Theory', credits: 3, marks: 75 },
                    { code: '316320', name: 'Capstone Project', type: 'Project', credits: 6, marks: 150 }
                ]
            }
        }
    },
    'mechanical-engineering': {
        code: 'ME',
        name: 'Mechanical Engineering',
        overview: 'Mechanical Engineering deals with design, manufacturing, and maintenance of mechanical systems.',
        careerOpportunities: ['Design Engineer', 'Manufacturing Engineer', 'Quality Control Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311006', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                description: 'Mechanical fundamentals',
                subjects: [
                    { code: '312312', name: 'Engineering Mechanics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312340', name: 'Basic Workshop Practice', type: 'Practical', credits: 4, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                description: 'Core Mechanical',
                subjects: [
                    { code: '313341', name: 'Strength of Materials', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313342', name: 'Manufacturing Processes', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                description: 'Advanced Mechanical',
                subjects: [
                    { code: '314345', name: 'Fluid Mechanics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '314346', name: 'Heat Transfer', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                description: 'Specialization',
                subjects: [
                    { code: '315349', name: 'Advanced Manufacturing', type: 'Theory', credits: 4, marks: 100 },
                    { code: '315350', name: 'Industrial Engineering', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                description: 'Project work',
                subjects: [
                    { code: '316352', name: 'Automation & Robotics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '316004', name: 'Capstone Project', type: 'Project', credits: 6, marks: 150 }
                ]
            }
        }
    },
    'civil-engineering': {
        code: 'CE',
        name: 'Civil Engineering',
        overview: 'Civil Engineering deals with construction, infrastructure, surveying, and structural design.',
        careerOpportunities: ['Site Engineer', 'Structural Engineer', 'Surveyor'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311010', name: 'Civil Engineering Workshop', type: 'Practical', credits: 2, marks: 50 }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                description: 'Civil fundamentals',
                subjects: [
                    { code: '312312', name: 'Engineering Mechanics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312339', name: 'Surveying', type: 'Practical', credits: 4, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                description: 'Core Civil',
                subjects: [
                    { code: '313308', name: 'Strength of Materials', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313322', name: 'Concrete Technology', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                description: 'Advanced Civil',
                subjects: [
                    { code: '314303', name: 'Hydraulics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '314315', name: 'Geotechnical Engineering', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                description: 'Specialization',
                subjects: [
                    { code: '315313', name: 'Theory of Structure', type: 'Theory', credits: 4, marks: 100 },
                    { code: '315314', name: 'Water Resource Engineering', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                description: 'Project work',
                subjects: [
                    { code: '316308', name: 'Design of RCC Structures', type: 'Theory', credits: 4, marks: 100 },
                    { code: '316004', name: 'Capstone Project', type: 'Project', credits: 6, marks: 150 }
                ]
            }
        }
    },
    'electrical-engineering': {
        code: 'EE',
        name: 'Electrical Engineering',
        overview: 'Electrical Engineering deals with power systems, machines, and control systems.',
        careerOpportunities: ['Electrical Engineer', 'Power Systems Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311006', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                description: 'Electrical fundamentals',
                subjects: [
                    { code: '312310', name: 'Fundamental of Electrical Engineering', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312309', name: 'Elements of Electronics', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                description: 'Core Electrical',
                subjects: [
                    { code: '313332', name: 'Electrical Circuits and Network', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313334', name: 'Electrical Measurement', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                description: 'Advanced Electrical',
                subjects: [
                    { code: '314322', name: 'D.C. Machines and Transformers', type: 'Theory', credits: 4, marks: 100 },
                    { code: '314323', name: 'Utilization of Electrical Energy', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                description: 'Specialization',
                subjects: [
                    { code: '315333', name: 'A.C. Machines Performance', type: 'Theory', credits: 4, marks: 100 },
                    { code: '315334', name: 'Switchgear and Protection', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                description: 'Project work',
                subjects: [
                    { code: '316336', name: 'Automation & PLC', type: 'Theory', credits: 4, marks: 100 },
                    { code: '316004', name: 'Capstone Project', type: 'Project', credits: 6, marks: 150 }
                ]
            }
        }
    },
    'electronics-telecommunication': {
        code: 'EJ',
        name: 'Electronics & Telecommunication',
        overview: 'Electronics & Telecommunication focuses on electronic circuits and communication systems.',
        careerOpportunities: ['Electronics Engineer', 'Telecommunication Engineer'],
        semesters: {
            1: {
                name: 'Semester 1',
                year: '1st Year',
                description: 'Foundation courses',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '311006', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                year: '1st Year',
                description: 'Electronics fundamentals',
                subjects: [
                    { code: '312314', name: 'Basic Electronics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '312309', name: 'Elements of Electronics', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                year: '2nd Year',
                description: 'Core Electronics',
                subjects: [
                    { code: '313324', name: 'Analog Electronics', type: 'Theory', credits: 4, marks: 100 },
                    { code: '313326', name: 'Electronic Communication', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                year: '2nd Year',
                description: 'Advanced Electronics',
                subjects: [
                    { code: '314326', name: 'Digital Communication', type: 'Theory', credits: 4, marks: 100 },
                    { code: '314328', name: 'Microcontroller Applications', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                year: '3rd Year',
                description: 'Specialization',
                subjects: [
                    { code: '315355', name: 'Mobile Communication', type: 'Theory', credits: 4, marks: 100 },
                    { code: '315356', name: 'Embedded System', type: 'Theory', credits: 4, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                year: '3rd Year',
                description: 'Project work',
                subjects: [
                    { code: '316358', name: 'Optical Communication', type: 'Theory', credits: 4, marks: 100 },
                    { code: '316004', name: 'Capstone Project', type: 'Project', credits: 6, marks: 150 }
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