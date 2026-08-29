// ============================================================
// MSBTE K-SCHEME - COMPLETE CURRICULUM DATABASE
// 5 Branches × 3 Years × 6 Semesters
// Source: Official MSBTE Curriculum Search + E-Content
// ============================================================

const MSBTE_DATA = {
    scheme: 'K-Scheme',
    board: 'Maharashtra State Board of Technical Education',
    duration: '3 Years',
    totalSemesters: 6,

    // ============================================================
    // 1. COMPUTER ENGINEERING (CO)
    // ============================================================
    'computer-engineering': {
        code: 'CO',
        name: 'Computer Engineering',
        years: {
            '1st Year': {
                semesters: {
                    1: {
                        name: 'Semester 1',
                        subjects: [
                            { code: '311001', name: 'Basic Mathematics', shortName: 'Maths-I', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '311002', name: 'Engineering Physics', shortName: 'Physics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311003', name: 'Engineering Chemistry', shortName: 'Chemistry', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311004', name: 'Engineering Graphics', shortName: 'Graphics', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' },
                            { code: '311005', name: 'Basic Electronics', shortName: 'Electronics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311006', name: 'Communication Skills', shortName: 'Comm Skills', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    2: {
                        name: 'Semester 2',
                        subjects: [
                            { code: '312001', name: 'Applied Mathematics', shortName: 'Maths-II', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '312002', name: 'Engineering Mechanics', shortName: 'Mechanics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312003', name: 'Basic Electrical Engineering', shortName: 'Electrical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312004', name: 'Environmental Science', shortName: 'Env Sci', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '312005', name: 'Programming in C', shortName: 'C Programming', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    }
                }
            },
            '2nd Year': {
                semesters: {
                    3: {
                        name: 'Semester 3',
                        subjects: [
                            { code: '313001', name: 'Engineering Mathematics III', shortName: 'Maths-III', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '313002', name: 'Data Structure Using C', shortName: 'DSUC', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313003', name: 'Database Management System', shortName: 'DBMS', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313004', name: 'Object Oriented Programming Using C++', shortName: 'OOP C++', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313005', name: 'Digital Techniques and Microprocessors', shortName: 'DTMP', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    4: {
                        name: 'Semester 4',
                        subjects: [
                            { code: '314001', name: 'Engineering Mathematics IV', shortName: 'Maths-IV', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '314002', name: 'Java Programming', shortName: 'Java', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314003', name: 'Data Communication and Computer Network', shortName: 'DCCN', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314004', name: 'Information Security', shortName: 'Info Security', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314005', name: 'Environmental Education and Sustainability', shortName: 'EES', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' }
                        ]
                    },
                    5: {
                        name: 'Semester 5',
                        subjects: [
                            { code: '315001', name: 'Engineering Mathematics V', shortName: 'Maths-V', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '315002', name: 'Operating System', shortName: 'OS', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315003', name: 'Software Engineering', shortName: 'SE', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315004', name: 'Cloud Computing', shortName: 'Cloud', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315005', name: 'Data Analytics', shortName: 'DA', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    6: {
                        name: 'Semester 6',
                        subjects: [
                            { code: '316001', name: 'Engineering Mathematics VI', shortName: 'Maths-VI', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '316002', name: 'Machine Learning', shortName: 'ML', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316003', name: 'Network and Information Security', shortName: 'NIS', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316004', name: 'Big Data Analytics', shortName: 'BDA', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316005', name: 'Capstone Project', shortName: 'Project', type: 'Practical', theory: 0, practical: 6, tutorial: 0, credits: 6, marks: 200, assessment: 'FA + Practical' }
                        ]
                    }
                }
            }
        }
    },

    // ============================================================
    // 2. CIVIL ENGINEERING (CE)
    // ============================================================
    'civil-engineering': {
        code: 'CE',
        name: 'Civil Engineering',
        years: {
            '1st Year': {
                semesters: {
                    1: {
                        name: 'Semester 1',
                        subjects: [
                            { code: '311001', name: 'Basic Mathematics', shortName: 'Maths-I', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '311002', name: 'Engineering Physics', shortName: 'Physics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311003', name: 'Engineering Chemistry', shortName: 'Chemistry', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311004', name: 'Engineering Graphics', shortName: 'Graphics', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' },
                            { code: '311005', name: 'Basic Civil Engineering', shortName: 'Civil Basics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    2: {
                        name: 'Semester 2',
                        subjects: [
                            { code: '312001', name: 'Applied Mathematics', shortName: 'Maths-II', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '312002', name: 'Engineering Mechanics', shortName: 'Mechanics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312003', name: 'Basic Electrical Engineering', shortName: 'Electrical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312004', name: 'Environmental Science', shortName: 'Env Sci', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '312015', name: 'Building Materials', shortName: 'Bldg Materials', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    }
                }
            },
            '2nd Year': {
                semesters: {
                    3: {
                        name: 'Semester 3',
                        subjects: [
                            { code: '313001', name: 'Engineering Mathematics III', shortName: 'Maths-III', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '313002', name: 'Strength of Materials', shortName: 'SOM', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313003', name: 'Fluid Mechanics', shortName: 'Fluid Mech', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313004', name: 'Surveying', shortName: 'Surveying', type: 'Theory + Practical', theory: 2, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313005', name: 'Building Construction', shortName: 'Bldg Const', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    4: {
                        name: 'Semester 4',
                        subjects: [
                            { code: '314001', name: 'Engineering Mathematics IV', shortName: 'Maths-IV', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '314002', name: 'Structural Analysis', shortName: 'SA', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314003', name: 'Geotechnical Engineering', shortName: 'Geotech', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314004', name: 'Transportation Engineering', shortName: 'Transport', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314005', name: 'Concrete Technology', shortName: 'Concrete', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    5: {
                        name: 'Semester 5',
                        subjects: [
                            { code: '315001', name: 'Engineering Mathematics V', shortName: 'Maths-V', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '315002', name: 'Design of Steel Structures', shortName: 'Steel Design', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315003', name: 'Design of RCC Structures', shortName: 'RCC Design', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315004', name: 'Water Resources Engineering', shortName: 'Water Res', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    6: {
                        name: 'Semester 6',
                        subjects: [
                            { code: '316001', name: 'Engineering Mathematics VI', shortName: 'Maths-VI', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '316002', name: 'Construction Management', shortName: 'Const Mgmt', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316003', name: 'Earthquake Engineering', shortName: 'Earthquake', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316004', name: 'Major Project', shortName: 'Project', type: 'Practical', theory: 0, practical: 6, tutorial: 0, credits: 6, marks: 200, assessment: 'FA + Practical' }
                        ]
                    }
                }
            }
        }
    },

    // ============================================================
    // 3. ELECTRICAL ENGINEERING (EE)
    // ============================================================
    'electrical-engineering': {
        code: 'EE',
        name: 'Electrical Engineering',
        years: {
            '1st Year': {
                semesters: {
                    1: {
                        name: 'Semester 1',
                        subjects: [
                            { code: '311001', name: 'Basic Mathematics', shortName: 'Maths-I', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '311002', name: 'Engineering Physics', shortName: 'Physics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311003', name: 'Engineering Chemistry', shortName: 'Chemistry', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311004', name: 'Engineering Graphics', shortName: 'Graphics', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' },
                            { code: '311005', name: 'Basic Electrical Engineering', shortName: 'Basic Electrical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    2: {
                        name: 'Semester 2',
                        subjects: [
                            { code: '312001', name: 'Applied Mathematics', shortName: 'Maths-II', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '312002', name: 'Engineering Mechanics', shortName: 'Mechanics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312310', name: 'Fundamental of Electrical Engineering', shortName: 'FEE', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312004', name: 'Environmental Science', shortName: 'Env Sci', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '312009', name: 'Elements of Electronics', shortName: 'Electronics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    }
                }
            },
            '2nd Year': {
                semesters: {
                    3: {
                        name: 'Semester 3',
                        subjects: [
                            { code: '313001', name: 'Engineering Mathematics III', shortName: 'Maths-III', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '313324', name: 'Analog Electronics', shortName: 'Analog', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313325', name: 'Circuits & Networks', shortName: 'C&N', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313333', name: 'Electrical Power Generation, Transmission and Distribution', shortName: 'Power System', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313334', name: 'Electrical and Electronic Measurement', shortName: 'Measurement', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    4: {
                        name: 'Semester 4',
                        subjects: [
                            { code: '314001', name: 'Engineering Mathematics IV', shortName: 'Maths-IV', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '314322', name: 'D.C. Machines and Transformers', shortName: 'DC Machines', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314324', name: 'Digital Electronics and Microcontroller Applications', shortName: 'Digital', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314301', name: 'Environmental Education and Sustainability', shortName: 'EES', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '314323', name: 'Utilization of Electrical Energy', shortName: 'Utilization', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    5: {
                        name: 'Semester 5',
                        subjects: [
                            { code: '315001', name: 'Engineering Mathematics V', shortName: 'Maths-V', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '315301', name: 'Management', shortName: 'Mgmt', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '315302', name: 'A.C. Machines Performance', shortName: 'AC Machines', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315303', name: 'Switchgear and Protection', shortName: 'Switchgear', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315304', name: 'Power System Operation and Control', shortName: 'Power Sys', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    6: {
                        name: 'Semester 6',
                        subjects: [
                            { code: '316001', name: 'Engineering Mathematics VI', shortName: 'Maths-VI', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '316302', name: 'Automation & PLC', shortName: 'PLC', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316303', name: 'Solar Technology and Maintenance', shortName: 'Solar', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316304', name: 'Energy Conservation and Audit', shortName: 'Energy Audit', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316305', name: 'Major Project', shortName: 'Project', type: 'Practical', theory: 0, practical: 6, tutorial: 0, credits: 6, marks: 200, assessment: 'FA + Practical' }
                        ]
                    }
                }
            }
        }
    },

    // ============================================================
    // 4. MECHANICAL ENGINEERING (ME)
    // ============================================================
    'mechanical-engineering': {
        code: 'ME',
        name: 'Mechanical Engineering',
        years: {
            '1st Year': {
                semesters: {
                    1: {
                        name: 'Semester 1',
                        subjects: [
                            { code: '311001', name: 'Basic Mathematics', shortName: 'Maths-I', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '311002', name: 'Engineering Physics', shortName: 'Physics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311003', name: 'Engineering Chemistry', shortName: 'Chemistry', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311004', name: 'Engineering Graphics', shortName: 'Graphics', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' },
                            { code: '311005', name: 'Workshop Technology', shortName: 'Workshop', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' }
                        ]
                    },
                    2: {
                        name: 'Semester 2',
                        subjects: [
                            { code: '312001', name: 'Applied Mathematics', shortName: 'Maths-II', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '312002', name: 'Engineering Mechanics', shortName: 'Mechanics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312003', name: 'Basic Electrical Engineering', shortName: 'Electrical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312004', name: 'Environmental Science', shortName: 'Env Sci', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '312015', name: 'Material Science', shortName: 'Materials', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    }
                }
            },
            '2nd Year': {
                semesters: {
                    3: {
                        name: 'Semester 3',
                        subjects: [
                            { code: '313001', name: 'Engineering Mathematics III', shortName: 'Maths-III', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '313002', name: 'Strength of Materials', shortName: 'SOM', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313003', name: 'Fluid Mechanics', shortName: 'Fluid Mech', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313004', name: 'Thermodynamics', shortName: 'Thermo', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313005', name: 'Machine Drawing', shortName: 'Machine Draw', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' }
                        ]
                    },
                    4: {
                        name: 'Semester 4',
                        subjects: [
                            { code: '314001', name: 'Engineering Mathematics IV', shortName: 'Maths-IV', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '314002', name: 'Theory of Machines', shortName: 'TOM', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314003', name: 'Manufacturing Processes', shortName: 'Manufacturing', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314004', name: 'Electrical Machines', shortName: 'Elec Machines', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314005', name: 'Industrial Electronics', shortName: 'Ind Electronics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    5: {
                        name: 'Semester 5',
                        subjects: [
                            { code: '315001', name: 'Engineering Mathematics V', shortName: 'Maths-V', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '315301', name: 'Management', shortName: 'Mgmt', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '315302', name: 'Machine Design', shortName: 'Machine Design', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315303', name: 'Control Systems', shortName: 'Control', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315304', name: 'Power Electronics', shortName: 'Power Elec', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    6: {
                        name: 'Semester 6',
                        subjects: [
                            { code: '316001', name: 'Engineering Mathematics VI', shortName: 'Maths-VI', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '316302', name: 'Automobile Engineering', shortName: 'Auto', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316303', name: 'Renewable Energy Systems', shortName: 'Renewable', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316304', name: 'Thermal Engineering', shortName: 'Thermal', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316305', name: 'Major Project', shortName: 'Project', type: 'Practical', theory: 0, practical: 6, tutorial: 0, credits: 6, marks: 200, assessment: 'FA + Practical' }
                        ]
                    }
                }
            }
        }
    },

    // ============================================================
    // 5. ELECTRONICS & TELECOMMUNICATION ENGINEERING (EJ)
    // ============================================================
    'electronics-telecommunication': {
        code: 'EJ',
        name: 'Electronics & Telecommunication Engineering',
        years: {
            '1st Year': {
                semesters: {
                    1: {
                        name: 'Semester 1',
                        subjects: [
                            { code: '311001', name: 'Basic Mathematics', shortName: 'Maths-I', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '311002', name: 'Engineering Physics', shortName: 'Physics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311003', name: 'Engineering Chemistry', shortName: 'Chemistry', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '311004', name: 'Engineering Graphics', shortName: 'Graphics', type: 'Practical', theory: 0, practical: 4, tutorial: 0, credits: 4, marks: 100, assessment: 'FA + Practical' },
                            { code: '312314', name: 'Basic Electronics', shortName: 'Basic Elec', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    2: {
                        name: 'Semester 2',
                        subjects: [
                            { code: '312001', name: 'Applied Mathematics', shortName: 'Maths-II', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '312002', name: 'Engineering Mechanics', shortName: 'Mechanics', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312003', name: 'Basic Electrical Engineering', shortName: 'Electrical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '312004', name: 'Environmental Science', shortName: 'Env Sci', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '312009', name: 'Elements of Electronics', shortName: 'Elec Elements', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    }
                }
            },
            '2nd Year': {
                semesters: {
                    3: {
                        name: 'Semester 3',
                        subjects: [
                            { code: '313001', name: 'Engineering Mathematics III', shortName: 'Maths-III', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '313324', name: 'Analog Electronics', shortName: 'Analog', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313325', name: 'Circuits & Networks', shortName: 'C&N', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313326', name: 'Principles of Electronic Communication', shortName: 'Comm', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '313304', name: 'Object Oriented Programming Using C++', shortName: 'OOP C++', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    4: {
                        name: 'Semester 4',
                        subjects: [
                            { code: '314001', name: 'Engineering Mathematics IV', shortName: 'Maths-IV', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '314326', name: 'Digital Communication Systems', shortName: 'Digital Comm', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314328', name: 'Microcontroller & Applications', shortName: 'MCU', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '314301', name: 'Environmental Education and Sustainability', shortName: 'EES', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '314329', name: 'Analog & Digital Communication', shortName: 'A&D Comm', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    5: {
                        name: 'Semester 5',
                        subjects: [
                            { code: '315001', name: 'Engineering Mathematics V', shortName: 'Maths-V', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '315301', name: 'Management', shortName: 'Mgmt', type: 'Theory', theory: 3, practical: 0, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA' },
                            { code: '315302', name: 'Wireless Communication', shortName: 'Wireless', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315303', name: 'Microwave Engineering & Radar System', shortName: 'Microwave', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '315304', name: 'IoT Applications', shortName: 'IoT', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' }
                        ]
                    },
                    6: {
                        name: 'Semester 6',
                        subjects: [
                            { code: '316001', name: 'Engineering Mathematics VI', shortName: 'Maths-VI', type: 'Theory', theory: 3, practical: 0, tutorial: 1, credits: 4, marks: 100, assessment: 'FA + SA' },
                            { code: '316302', name: 'Optical Network and Satellite Communication', shortName: 'Optical', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316303', name: 'Wireless & Mobile Communication', shortName: 'Mobile Comm', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316304', name: 'VLSI Applications', shortName: 'VLSI', type: 'Theory + Practical', theory: 2, practical: 2, tutorial: 0, credits: 3, marks: 100, assessment: 'FA + SA + Practical' },
                            { code: '316305', name: 'Major Project', shortName: 'Project', type: 'Practical', theory: 0, practical: 6, tutorial: 0, credits: 6, marks: 200, assessment: 'FA + Practical' }
                        ]
                    }
                }
            }
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getMSBTECourseData(programmeSlug, year, semester) {
    var programme = MSBTE_DATA[programmeSlug];
    if (!programme) return null;
    var yearData = programme.years[year];
    if (!yearData) return null;
    return yearData.semesters[semester] || null;
}

function getMSBTESubject(programmeSlug, year, semester, subjectCode) {
    var semesterData = getMSBTECourseData(programmeSlug, year, semester);
    if (!semesterData) return null;
    return semesterData.subjects.find(function(s) { return s.code === subjectCode; }) || null;
}

function searchMSBTECourses(query) {
    var results = [];
    var q = query.toLowerCase();
    
    for (var progSlug in MSBTE_DATA) {
        if (progSlug === 'scheme' || progSlug === 'board' || progSlug === 'duration' || progSlug === 'totalSemesters') continue;
        var programme = MSBTE_DATA[progSlug];
        for (var year in programme.years) {
            var yearData = programme.years[year];
            for (var sem in yearData.semesters) {
                var semesterData = yearData.semesters[sem];
                semesterData.subjects.forEach(function(subject) {
                    if (subject.name.toLowerCase().indexOf(q) !== -1 ||
                        subject.code.toLowerCase().indexOf(q) !== -1 ||
                        subject.shortName.toLowerCase().indexOf(q) !== -1) {
                        results.push({
                            programme: programme.name,
                            programmeCode: programme.code,
                            year: year,
                            semester: sem,
                            semesterName: semesterData.name,
                            subject: subject
                        });
                    }
                });
            }
        }
    }
    return results;
}

function getAllSemesters(programmeSlug) {
    var programme = MSBTE_DATA[programmeSlug];
    if (!programme) return [];
    var semesters = [];
    for (var year in programme.years) {
        var yearData = programme.years[year];
        for (var sem in yearData.semesters) {
            semesters.push({
                year: year,
                semester: parseInt(sem),
                name: yearData.semesters[sem].name,
                subjectCount: yearData.semesters[sem].subjects.length
            });
        }
    }
    return semesters.sort(function(a, b) { return a.semester - b.semester; });
}

// Export to global
window.MSBTE_DATA = MSBTE_DATA;
window.getMSBTECourseData = getMSBTECourseData;
window.getMSBTESubject = getMSBTESubject;
window.searchMSBTECourses = searchMSBTECourses;
window.getAllSemesters = getAllSemesters;

console.log('✅ MSBTE K-Scheme data loaded!');
console.log('📚 Programmes:', Object.keys(MSBTE_DATA).filter(function(k) { return k !== 'scheme' && k !== 'board' && k !== 'duration' && k !== 'totalSemesters'; }).length);