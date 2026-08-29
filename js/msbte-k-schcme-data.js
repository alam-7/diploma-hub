// ============================================================
// MSBTE K-SCHEME - COMPLETE COURSE DATABASE
// VERIFIED FROM OFFICIAL MSBTE E-CONTENT LISTING
// 5 BRANCHES × 6 SEMESTERS
// ============================================================

const MSBTE_K_SCHEME = {
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
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics' },
                    { code: '311303', name: 'Communication Skills (English)' },
                    { code: '311305', name: 'Basic Science' },
                    { code: '311001', name: 'Fundamentals of ICT' },
                    { code: '311002', name: 'Engineering Workshop Practice (Computer Group)' },
                    { code: '311003', name: 'Yoga and Meditation' },
                    { code: '311008', name: 'Engineering Graphics (Electronics, Computer and Allied Branches)' }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics' },
                    { code: '312302', name: 'Basic Electrical and Electronics Engineering' },
                    { code: '312303', name: 'Programming in C' },
                    { code: '312001', name: 'Linux Basics' },
                    { code: '312002', name: 'Professional Communication' },
                    { code: '312003', name: 'Social and Life Skills' },
                    { code: '312004', name: 'Web Page Designing' }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313301', name: 'Data Structure Using C' },
                    { code: '313302', name: 'Database Management System' },
                    { code: '313303', name: 'Digital Techniques' },
                    { code: '313304', name: 'Object Oriented Programming Using C++' },
                    { code: '313305', name: 'Digital Techniques and Microprocessors' },
                    { code: '313306', name: 'Data Structure Using Python' },
                    { code: '313307', name: 'Statistical Modelling for Machine Learning' },
                    { code: '313002', name: 'Essence of Indian Constitution' },
                    { code: '313003', name: 'Applied Multimedia Techniques' }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability' },
                    { code: '314316', name: 'Probability and Statistics' },
                    { code: '314317', name: 'Java Programming' },
                    { code: '314318', name: 'Data Communication and Computer Network' },
                    { code: '314319', name: 'Information Security' },
                    { code: '314320', name: 'Mathematics for Machine Learning' },
                    { code: '314321', name: 'Microprocessor Programming' },
                    { code: '314004', name: 'Python Programming' },
                    { code: '314006', name: 'Internet of Things' }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management' },
                    { code: '315319', name: 'Operating System' },
                    { code: '315321', name: 'Advance Computer Network' },
                    { code: '315323', name: 'Software Engineering' },
                    { code: '315324', name: 'Advance Database Management' },
                    { code: '315325', name: 'Cloud Computing' },
                    { code: '315326', name: 'Data Analytics' },
                    { code: '315327', name: 'Cloud Computing for Data Science' },
                    { code: '315329', name: 'Natural Language Processing' },
                    { code: '315330', name: 'AI & ML Algorithm' },
                    { code: '315332', name: 'Software Engineering and Testing' }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316313', name: 'Emerging Trends in Computer Engineering and Information Technology' },
                    { code: '316314', name: 'Software Testing' },
                    { code: '316315', name: 'Digital Forensic and Hacking Techniques' },
                    { code: '316316', name: 'Machine Learning' },
                    { code: '316317', name: 'Network and Information Security' },
                    { code: '316318', name: 'Big Data Analytics' },
                    { code: '316319', name: 'Principles of Image Processing' },
                    { code: '316320', name: 'Advanced Algorithm in AI & ML' },
                    { code: '316321', name: 'Data Warehousing with Mining Techniques' },
                    { code: '316322', name: 'Image Processing' },
                    { code: '316323', name: 'Reinforcement Learning' },
                    { code: '316324', name: 'Software Engineering and Testing for Big Data' },
                    { code: '316325', name: 'Wireless and Mobile Network' }
                ]
            }
        }
    },

    // ============================================================
    // 2. MECHANICAL ENGINEERING (ME)
    // ============================================================
    'mechanical-engineering': {
        code: 'ME',
        name: 'Mechanical Engineering',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics' },
                    { code: '311303', name: 'Communication Skills (English)' },
                    { code: '311305', name: 'Basic Science' },
                    { code: '311001', name: 'Fundamentals of ICT' },
                    { code: '311003', name: 'Yoga and Meditation' },
                    { code: '311005', name: 'Engineering Workshop Practice' },
                    { code: '311006', name: 'Engineering Graphics' }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics' },
                    { code: '312308', name: 'Applied Science' },
                    { code: '312311', name: 'Engineering Drawing' },
                    { code: '312312', name: 'Engineering Mechanics' },
                    { code: '312313', name: 'Manufacturing Technology' },
                    { code: '312002', name: 'Professional Communication' },
                    { code: '312003', name: 'Social and Life Skills' }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313308', name: 'Strength of Materials' },
                    { code: '313309', name: 'Fluid Mechanics and Machinery' },
                    { code: '313310', name: 'Thermal Engineering' },
                    { code: '313317', name: 'Mechanical Engineering Materials' },
                    { code: '313311', name: 'Production Drawing' },
                    { code: '312020', name: 'Basic Electrical and Electronics' },
                    { code: '313007', name: 'Fundamentals of Python Programming' }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability' },
                    { code: '313313', name: 'Theory of Machines' },
                    { code: '313316', name: 'Metrology and Measurement' },
                    { code: '313317', name: 'Mechanical Engineering Materials' },
                    { code: '314337', name: 'Control Systems' },
                    { code: '314338', name: 'Embedded System Using C' },
                    { code: '314339', name: 'Fluid Power and Industrial Automation' },
                    { code: '314340', name: 'Production Processes' }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management' },
                    { code: '315363', name: 'Emerging Trends in Mechanical Engineering' },
                    { code: '315364', name: 'Industrial Robotics' },
                    { code: '315365', name: 'Mechatronics Systems Using IoT' },
                    { code: '315366', name: 'Process Engineering' },
                    { code: '315367', name: 'Product Design and Development' },
                    { code: '315368', name: 'Production and Operation Management' },
                    { code: '315370', name: 'Material Handling Systems' },
                    { code: '315371', name: 'Power Engineering' },
                    { code: '315372', name: 'Automobile Engineering' },
                    { code: '315373', name: 'Heating Ventilation Air Conditioning' },
                    { code: '315374', name: 'Power Plant Engineering' }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316351', name: 'Automotive Mechatronics' },
                    { code: '316352', name: 'PLC Programming and SCADA' },
                    { code: '316353', name: 'Micro-Electro Mechanical System' },
                    { code: '316354', name: 'Computer Aided Inspection and Quality Assurance' },
                    { code: '316355', name: 'Mechatronics in Health Services' },
                    { code: '316356', name: 'Smart Manufacturing Systems' },
                    { code: '316357', name: 'Design of Machine Elements' },
                    { code: '316359', name: 'Computer Integrated Manufacturing Systems' },
                    { code: '316362', name: 'Industrial Engineering and Quality Control' },
                    { code: '316363', name: 'Industrial Hydraulics and Pneumatics' },
                    { code: '316364', name: 'Alternative Energy Sources and Energy Management' },
                    { code: '316365', name: 'Cold Chain Management' }
                ]
            }
        }
    },

    // ============================================================
    // 3. CIVIL ENGINEERING (CE)
    // ============================================================
    'civil-engineering': {
        code: 'CE',
        name: 'Civil Engineering',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics' },
                    { code: '311303', name: 'Communication Skills (English)' },
                    { code: '311305', name: 'Basic Science' },
                    { code: '311001', name: 'Fundamentals of ICT' },
                    { code: '311003', name: 'Yoga and Meditation' },
                    { code: '311006', name: 'Engineering Graphics' },
                    { code: '311010', name: 'Civil Engineering Workshop' }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics' },
                    { code: '312308', name: 'Applied Science' },
                    { code: '312312', name: 'Engineering Mechanics' },
                    { code: '312338', name: 'Building Material and Construction' },
                    { code: '312339', name: 'Surveying' },
                    { code: '312002', name: 'Professional Communication' },
                    { code: '312003', name: 'Social and Life Skills' }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313308', name: 'Strength of Materials' },
                    { code: '313321', name: 'Advanced Surveying' },
                    { code: '313322', name: 'Concrete Technology' },
                    { code: '313323', name: 'Highway Engineering' },
                    { code: '313002', name: 'Essence of Indian Constitution' },
                    { code: '313009', name: 'Building Planning & Drawing with CAD' },
                    { code: '313010', name: 'Construction Management' }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability' },
                    { code: '314303', name: 'Hydraulics' },
                    { code: '314312', name: 'Railway, Bridge and Tunnel Engineering' },
                    { code: '314313', name: 'Estimating, Costing and Valuation' },
                    { code: '314314', name: 'Water and Wastewater Engineering' },
                    { code: '314315', name: 'Geotechnical Engineering' }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management' },
                    { code: '315313', name: 'Theory of Structure' },
                    { code: '315314', name: 'Water Resource Engineering' },
                    { code: '315315', name: 'Emerging Trends in Civil Engineering' },
                    { code: '315316', name: 'Energy Conservation & Green Building' },
                    { code: '315317', name: 'Precast & Prestressed Concrete Structures' },
                    { code: '315318', name: 'Road Traffic Engineering' }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316307', name: 'Contracts and Billing' },
                    { code: '316308', name: 'Design of RCC and Steel Structures' },
                    { code: '316309', name: 'Maintenance and Repairs of Structures' },
                    { code: '316310', name: 'Building Services' },
                    { code: '316311', name: 'Earthquake Resistant Building' },
                    { code: '316312', name: 'Solid Waste Management' }
                ]
            }
        }
    },

    // ============================================================
    // 4. ELECTRICAL ENGINEERING (EE)
    // ============================================================
    'electrical-engineering': {
        code: 'EE',
        name: 'Electrical Engineering',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics' },
                    { code: '311303', name: 'Communication Skills (English)' },
                    { code: '311305', name: 'Basic Science' },
                    { code: '311001', name: 'Fundamentals of ICT' },
                    { code: '311003', name: 'Yoga and Meditation' },
                    { code: '311005', name: 'Engineering Workshop Practices' },
                    { code: '311006', name: 'Engineering Graphics' }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics' },
                    { code: '312308', name: 'Applied Science' },
                    { code: '312309', name: 'Elements of Electronics' },
                    { code: '312310', name: 'Fundamental of Electrical Engineering' },
                    { code: '312002', name: 'Professional Communication' },
                    { code: '312003', name: 'Social and Life Skills' },
                    { code: '312006', name: 'Basic Mechanical Engineering' }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313332', name: 'Electrical Circuits and Network' },
                    { code: '313333', name: 'Electrical Power Generation, Transmission and Distribution' },
                    { code: '313334', name: 'Electrical and Electronic Measurement' },
                    { code: '313335', name: 'Fundamentals of Power Electronics' },
                    { code: '313002', name: 'Essence of Indian Constitution' },
                    { code: '313015', name: 'Electrical Material and Wiring Practice' }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability' },
                    { code: '314322', name: 'D.C. Machines and Transformers' },
                    { code: '314323', name: 'Utilization of Electrical Energy' },
                    { code: '314324', name: 'Digital Electronics and Microcontroller Applications' },
                    { code: '314325', name: 'Electrical Estimating and Contracting' },
                    { code: '314008', name: 'Computer Aided Drawing and Simulation' }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management' },
                    { code: '315333', name: 'A.C. Machines Performance' },
                    { code: '315334', name: 'Switchgear and Protection' },
                    { code: '315335', name: 'Electric Vehicle Technology' },
                    { code: '315336', name: 'Power System Operation and Control' },
                    { code: '315337', name: 'Renewable Energy Technology' },
                    { code: '315338', name: 'Embedded System' },
                    { code: '315341', name: 'IoT Applications' }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316327', name: 'Energy Conservation and Audit' },
                    { code: '316328', name: 'Maintenance of Electrical Equipments' },
                    { code: '316332', name: 'Optical Network and Satellite Communication' },
                    { code: '316334', name: 'Automation & PLC' },
                    { code: '316335', name: 'Drone Technology' },
                    { code: '316336', name: 'Wireless & Mobile Communication' }
                ]
            }
        }
    },

    // ============================================================
    // 5. ELECTRONICS & TELECOMMUNICATION (EJ)
    // ============================================================
    'electronics-telecommunication': {
        code: 'EJ',
        name: 'Electronics & Telecommunication Engineering',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics' },
                    { code: '311303', name: 'Communication Skills (English)' },
                    { code: '311305', name: 'Basic Science' },
                    { code: '311001', name: 'Fundamentals of ICT' },
                    { code: '311003', name: 'Yoga and Meditation' },
                    { code: '311007', name: 'Engineering Workshop Practice (Electronics Group)' },
                    { code: '311008', name: 'Engineering Graphics (Electronics, Computer and Allied Branches)' }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics' },
                    { code: '312314', name: 'Basic Electronics' },
                    { code: '312315', name: 'Elements of Electrical Engineering' },
                    { code: '312316', name: 'Electronic Materials & Components' },
                    { code: '312002', name: 'Professional Communication' },
                    { code: '312003', name: 'Social and Life Skills' },
                    { code: '312008', name: 'Electronics Workshop Practice' },
                    { code: '312009', name: 'Programming in C Language' }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313303', name: 'Digital Techniques' },
                    { code: '313324', name: 'Analog Electronics' },
                    { code: '313325', name: 'Circuits & Networks' },
                    { code: '313326', name: 'Principles of Electronic Communication' },
                    { code: '313002', name: 'Essence of Indian Constitution' },
                    { code: '313011', name: 'Basic Python Programming' },
                    { code: '313012', name: 'Electronic Measurements & Instrumentation' }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability' },
                    { code: '314326', name: 'Digital Communication Systems' },
                    { code: '314327', name: 'Consumer Electronic Systems' },
                    { code: '314328', name: 'Microcontroller & Applications' },
                    { code: '314329', name: 'Analog & Digital Communication' },
                    { code: '314333', name: 'AI in Robotics' },
                    { code: '314334', name: 'Principles of Robotics' },
                    { code: '314335', name: 'Automation Tools & Systems' },
                    { code: '314363', name: 'Basic Power Electronics' },
                    { code: '314317', name: 'Java Programming' }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management' },
                    { code: '315326', name: 'Data Analytics' },
                    { code: '315338', name: 'Embedded System' },
                    { code: '315339', name: 'Mobile & Wireless Communication' },
                    { code: '315341', name: 'IoT Applications' },
                    { code: '315342', name: 'Microwave Engineering & Radar System' },
                    { code: '315350', name: 'ML in Robotics' },
                    { code: '315351', name: '3D Printing' }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316332', name: 'Optical Network and Satellite Communication' },
                    { code: '316334', name: 'Automation & PLC' },
                    { code: '316335', name: 'Drone Technology' },
                    { code: '316336', name: 'Wireless & Mobile Communication' },
                    { code: '316338', name: 'Computer Network & Data Communication' },
                    { code: '316340', name: 'VLSI Applications' },
                    { code: '316342', name: 'Industrial Internet of Things' },
                    { code: '316343', name: 'Industrial Robotics and Applications' },
                    { code: '316345', name: 'Computer Security and Network Management' }
                ]
            }
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getMSBTEProgramme(slug) {
    return MSBTE_K_SCHEME[slug] || null;
}

function getMSBTESemester(slug, semester) {
    var programme = getMSBTEProgramme(slug);
    if (!programme) return null;
    return programme.semesters[semester] || null;
}

function getMSBTESubjects(slug, semester) {
    var semesterData = getMSBTESemester(slug, semester);
    if (!semesterData) return [];
    return semesterData.subjects || [];
}

function getAllMSBTEProgrammes() {
    var programmes = [];
    for (var key in MSBTE_K_SCHEME) {
        if (key !== 'scheme' && key !== 'board' && key !== 'duration' && key !== 'totalSemesters') {
            programmes.push({
                slug: key,
                code: MSBTE_K_SCHEME[key].code,
                name: MSBTE_K_SCHEME[key].name
            });
        }
    }
    return programmes;
}

// ============================================================
// EXPORT TO GLOBAL
// ============================================================

window.MSBTE_K_SCHEME = MSBTE_K_SCHEME;
window.getMSBTEProgramme = getMSBTEProgramme;
window.getMSBTESemester = getMSBTESemester;
window.getMSBTESubjects = getMSBTESubjects;
window.getAllMSBTEProgrammes = getAllMSBTEProgrammes;

console.log('✅ MSBTE K-Scheme data loaded!');
console.log('📚 Programmes:', getAllMSBTEProgrammes().length);