// ============================================================
// MSBTE K-SCHEME - COMPLETE COURSE DATABASE
// VERIFIED FROM OFFICIAL MSBTE E-CONTENT LISTING
// 5 BRANCHES × 6 SEMESTERS × 200+ SUBJECTS
// ============================================================

const MSBTE_K_SCHEME = {
    scheme: 'K-Scheme',
    board: 'Maharashtra State Board of Technical Education',
    duration: '3 Years',
    totalSemesters: 6,
    lastUpdated: 'August 2024',

    // ============================================================
    // 1. COMPUTER ENGINEERING (CO)
    // ============================================================
    'computer-engineering': {
        code: 'CO',
        name: 'Computer Engineering',
        icon: '💻',
        description: 'Study of computers, programming, networks, and software development.',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills (English)', credits: 3, marks: 100 },
                    { code: '311305', name: 'Basic Science', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', credits: 3, marks: 100 },
                    { code: '311002', name: 'Engineering Workshop Practice (Computer Group)', credits: 2, marks: 50 },
                    { code: '311003', name: 'Yoga and Meditation', credits: 1, marks: 50 },
                    { code: '311008', name: 'Engineering Graphics (Electronics, Computer and Allied Branches)', credits: 3, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics', credits: 4, marks: 100 },
                    { code: '312302', name: 'Basic Electrical and Electronics Engineering', credits: 4, marks: 100 },
                    { code: '312303', name: 'Programming in C', credits: 4, marks: 100 },
                    { code: '312001', name: 'Linux Basics', credits: 3, marks: 100 },
                    { code: '312002', name: 'Professional Communication', credits: 3, marks: 100 },
                    { code: '312003', name: 'Social and Life Skills', credits: 2, marks: 50 },
                    { code: '312004', name: 'Web Page Designing', credits: 3, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313301', name: 'Data Structure Using C', credits: 4, marks: 100 },
                    { code: '313302', name: 'Database Management System', credits: 4, marks: 100 },
                    { code: '313303', name: 'Digital Techniques', credits: 3, marks: 100 },
                    { code: '313304', name: 'Object Oriented Programming Using C++', credits: 4, marks: 100 },
                    { code: '313305', name: 'Digital Techniques and Microprocessors', credits: 3, marks: 100 },
                    { code: '313306', name: 'Data Structure Using Python', credits: 3, marks: 100 },
                    { code: '313307', name: 'Statistical Modelling for Machine Learning', credits: 3, marks: 100 },
                    { code: '313002', name: 'Essence of Indian Constitution', credits: 2, marks: 50 },
                    { code: '313003', name: 'Applied Multimedia Techniques', credits: 3, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability', credits: 3, marks: 100 },
                    { code: '314316', name: 'Probability and Statistics', credits: 3, marks: 100 },
                    { code: '314317', name: 'Java Programming', credits: 4, marks: 100 },
                    { code: '314318', name: 'Data Communication and Computer Network', credits: 4, marks: 100 },
                    { code: '314319', name: 'Information Security', credits: 3, marks: 100 },
                    { code: '314320', name: 'Mathematics for Machine Learning', credits: 3, marks: 100 },
                    { code: '314321', name: 'Microprocessor Programming', credits: 3, marks: 100 },
                    { code: '314004', name: 'Python Programming', credits: 3, marks: 100 },
                    { code: '314006', name: 'Internet of Things', credits: 3, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management', credits: 3, marks: 100 },
                    { code: '315319', name: 'Operating System', credits: 4, marks: 100 },
                    { code: '315321', name: 'Advance Computer Network', credits: 4, marks: 100 },
                    { code: '315323', name: 'Software Engineering', credits: 4, marks: 100 },
                    { code: '315324', name: 'Advance Database Management', credits: 4, marks: 100 },
                    { code: '315325', name: 'Cloud Computing', credits: 3, marks: 100 },
                    { code: '315326', name: 'Data Analytics', credits: 3, marks: 100 },
                    { code: '315327', name: 'Cloud Computing for Data Science', credits: 3, marks: 100 },
                    { code: '315329', name: 'Natural Language Processing', credits: 3, marks: 100 },
                    { code: '315330', name: 'AI & ML Algorithm', credits: 3, marks: 100 },
                    { code: '315332', name: 'Software Engineering and Testing', credits: 3, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316313', name: 'Emerging Trends in Computer Engineering and Information Technology', credits: 3, marks: 100 },
                    { code: '316314', name: 'Software Testing', credits: 3, marks: 100 },
                    { code: '316315', name: 'Digital Forensic and Hacking Techniques', credits: 3, marks: 100 },
                    { code: '316316', name: 'Machine Learning', credits: 4, marks: 100 },
                    { code: '316317', name: 'Network and Information Security', credits: 3, marks: 100 },
                    { code: '316318', name: 'Big Data Analytics', credits: 3, marks: 100 },
                    { code: '316319', name: 'Principles of Image Processing', credits: 3, marks: 100 },
                    { code: '316320', name: 'Advanced Algorithm in AI & ML', credits: 3, marks: 100 },
                    { code: '316321', name: 'Data Warehousing with Mining Techniques', credits: 3, marks: 100 },
                    { code: '316322', name: 'Image Processing', credits: 3, marks: 100 },
                    { code: '316323', name: 'Reinforcement Learning', credits: 3, marks: 100 },
                    { code: '316324', name: 'Software Engineering and Testing for Big Data', credits: 3, marks: 100 },
                    { code: '316325', name: 'Wireless and Mobile Network', credits: 3, marks: 100 }
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
        icon: '⚙️',
        description: 'Study of machines, manufacturing, thermodynamics, and mechanical systems.',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills (English)', credits: 3, marks: 100 },
                    { code: '311305', name: 'Basic Science', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', credits: 3, marks: 100 },
                    { code: '311003', name: 'Yoga and Meditation', credits: 1, marks: 50 },
                    { code: '311005', name: 'Engineering Workshop Practice', credits: 2, marks: 50 },
                    { code: '311006', name: 'Engineering Graphics', credits: 3, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics', credits: 4, marks: 100 },
                    { code: '312308', name: 'Applied Science', credits: 4, marks: 100 },
                    { code: '312311', name: 'Engineering Drawing', credits: 3, marks: 100 },
                    { code: '312312', name: 'Engineering Mechanics', credits: 4, marks: 100 },
                    { code: '312313', name: 'Manufacturing Technology', credits: 4, marks: 100 },
                    { code: '312002', name: 'Professional Communication', credits: 3, marks: 100 },
                    { code: '312003', name: 'Social and Life Skills', credits: 2, marks: 50 }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313308', name: 'Strength of Materials', credits: 4, marks: 100 },
                    { code: '313309', name: 'Fluid Mechanics and Machinery', credits: 4, marks: 100 },
                    { code: '313310', name: 'Thermal Engineering', credits: 4, marks: 100 },
                    { code: '313317', name: 'Mechanical Engineering Materials', credits: 3, marks: 100 },
                    { code: '313311', name: 'Production Drawing', credits: 3, marks: 100 },
                    { code: '312020', name: 'Basic Electrical and Electronics', credits: 3, marks: 100 },
                    { code: '313007', name: 'Fundamentals of Python Programming', credits: 3, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability', credits: 3, marks: 100 },
                    { code: '313313', name: 'Theory of Machines', credits: 4, marks: 100 },
                    { code: '313316', name: 'Metrology and Measurement', credits: 3, marks: 100 },
                    { code: '313317', name: 'Mechanical Engineering Materials', credits: 3, marks: 100 },
                    { code: '314337', name: 'Control Systems', credits: 3, marks: 100 },
                    { code: '314338', name: 'Embedded System Using C', credits: 3, marks: 100 },
                    { code: '314339', name: 'Fluid Power and Industrial Automation', credits: 3, marks: 100 },
                    { code: '314340', name: 'Production Processes', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management', credits: 3, marks: 100 },
                    { code: '315363', name: 'Emerging Trends in Mechanical Engineering', credits: 3, marks: 100 },
                    { code: '315364', name: 'Industrial Robotics', credits: 3, marks: 100 },
                    { code: '315365', name: 'Mechatronics Systems Using IoT', credits: 3, marks: 100 },
                    { code: '315366', name: 'Process Engineering', credits: 3, marks: 100 },
                    { code: '315367', name: 'Product Design and Development', credits: 3, marks: 100 },
                    { code: '315368', name: 'Production and Operation Management', credits: 3, marks: 100 },
                    { code: '315370', name: 'Material Handling Systems', credits: 3, marks: 100 },
                    { code: '315371', name: 'Power Engineering', credits: 3, marks: 100 },
                    { code: '315372', name: 'Automobile Engineering', credits: 3, marks: 100 },
                    { code: '315373', name: 'Heating Ventilation Air Conditioning', credits: 3, marks: 100 },
                    { code: '315374', name: 'Power Plant Engineering', credits: 3, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316351', name: 'Automotive Mechatronics', credits: 3, marks: 100 },
                    { code: '316352', name: 'PLC Programming and SCADA', credits: 3, marks: 100 },
                    { code: '316353', name: 'Micro-Electro Mechanical System', credits: 3, marks: 100 },
                    { code: '316354', name: 'Computer Aided Inspection and Quality Assurance', credits: 3, marks: 100 },
                    { code: '316355', name: 'Mechatronics in Health Services', credits: 3, marks: 100 },
                    { code: '316356', name: 'Smart Manufacturing Systems', credits: 3, marks: 100 },
                    { code: '316357', name: 'Design of Machine Elements', credits: 4, marks: 100 },
                    { code: '316359', name: 'Computer Integrated Manufacturing Systems', credits: 3, marks: 100 },
                    { code: '316362', name: 'Industrial Engineering and Quality Control', credits: 3, marks: 100 },
                    { code: '316363', name: 'Industrial Hydraulics and Pneumatics', credits: 3, marks: 100 },
                    { code: '316364', name: 'Alternative Energy Sources and Energy Management', credits: 3, marks: 100 },
                    { code: '316365', name: 'Cold Chain Management', credits: 3, marks: 100 }
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
        icon: '🏗️',
        description: 'Study of construction, infrastructure, surveying, and structural design.',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills (English)', credits: 3, marks: 100 },
                    { code: '311305', name: 'Basic Science', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', credits: 3, marks: 100 },
                    { code: '311003', name: 'Yoga and Meditation', credits: 1, marks: 50 },
                    { code: '311006', name: 'Engineering Graphics', credits: 3, marks: 100 },
                    { code: '311010', name: 'Civil Engineering Workshop', credits: 2, marks: 50 }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics', credits: 4, marks: 100 },
                    { code: '312308', name: 'Applied Science', credits: 4, marks: 100 },
                    { code: '312312', name: 'Engineering Mechanics', credits: 4, marks: 100 },
                    { code: '312338', name: 'Building Material and Construction', credits: 4, marks: 100 },
                    { code: '312339', name: 'Surveying', credits: 4, marks: 100 },
                    { code: '312002', name: 'Professional Communication', credits: 3, marks: 100 },
                    { code: '312003', name: 'Social and Life Skills', credits: 2, marks: 50 }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313308', name: 'Strength of Materials', credits: 4, marks: 100 },
                    { code: '313321', name: 'Advanced Surveying', credits: 4, marks: 100 },
                    { code: '313322', name: 'Concrete Technology', credits: 4, marks: 100 },
                    { code: '313323', name: 'Highway Engineering', credits: 4, marks: 100 },
                    { code: '313002', name: 'Essence of Indian Constitution', credits: 2, marks: 50 },
                    { code: '313009', name: 'Building Planning & Drawing with CAD', credits: 3, marks: 100 },
                    { code: '313010', name: 'Construction Management', credits: 3, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability', credits: 3, marks: 100 },
                    { code: '314303', name: 'Hydraulics', credits: 4, marks: 100 },
                    { code: '314312', name: 'Railway, Bridge and Tunnel Engineering', credits: 4, marks: 100 },
                    { code: '314313', name: 'Estimating, Costing and Valuation', credits: 4, marks: 100 },
                    { code: '314314', name: 'Water and Wastewater Engineering', credits: 4, marks: 100 },
                    { code: '314315', name: 'Geotechnical Engineering', credits: 4, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management', credits: 3, marks: 100 },
                    { code: '315313', name: 'Theory of Structure', credits: 4, marks: 100 },
                    { code: '315314', name: 'Water Resource Engineering', credits: 4, marks: 100 },
                    { code: '315315', name: 'Emerging Trends in Civil Engineering', credits: 3, marks: 100 },
                    { code: '315316', name: 'Energy Conservation & Green Building', credits: 3, marks: 100 },
                    { code: '315317', name: 'Precast & Prestressed Concrete Structures', credits: 3, marks: 100 },
                    { code: '315318', name: 'Road Traffic Engineering', credits: 3, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316307', name: 'Contracts and Billing', credits: 3, marks: 100 },
                    { code: '316308', name: 'Design of RCC and Steel Structures', credits: 4, marks: 100 },
                    { code: '316309', name: 'Maintenance and Repairs of Structures', credits: 3, marks: 100 },
                    { code: '316310', name: 'Building Services', credits: 3, marks: 100 },
                    { code: '316311', name: 'Earthquake Resistant Building', credits: 3, marks: 100 },
                    { code: '316312', name: 'Solid Waste Management', credits: 3, marks: 100 }
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
        icon: '⚡',
        description: 'Study of electrical systems, power generation, motors, and control systems.',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills (English)', credits: 3, marks: 100 },
                    { code: '311305', name: 'Basic Science', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', credits: 3, marks: 100 },
                    { code: '311003', name: 'Yoga and Meditation', credits: 1, marks: 50 },
                    { code: '311005', name: 'Engineering Workshop Practices', credits: 2, marks: 50 },
                    { code: '311006', name: 'Engineering Graphics', credits: 3, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics', credits: 4, marks: 100 },
                    { code: '312308', name: 'Applied Science', credits: 4, marks: 100 },
                    { code: '312309', name: 'Elements of Electronics', credits: 3, marks: 100 },
                    { code: '312310', name: 'Fundamental of Electrical Engineering', credits: 4, marks: 100 },
                    { code: '312002', name: 'Professional Communication', credits: 3, marks: 100 },
                    { code: '312003', name: 'Social and Life Skills', credits: 2, marks: 50 },
                    { code: '312006', name: 'Basic Mechanical Engineering', credits: 3, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313332', name: 'Electrical Circuits and Network', credits: 4, marks: 100 },
                    { code: '313333', name: 'Electrical Power Generation, Transmission and Distribution', credits: 4, marks: 100 },
                    { code: '313334', name: 'Electrical and Electronic Measurement', credits: 4, marks: 100 },
                    { code: '313335', name: 'Fundamentals of Power Electronics', credits: 3, marks: 100 },
                    { code: '313002', name: 'Essence of Indian Constitution', credits: 2, marks: 50 },
                    { code: '313015', name: 'Electrical Material and Wiring Practice', credits: 3, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability', credits: 3, marks: 100 },
                    { code: '314322', name: 'D.C. Machines and Transformers', credits: 4, marks: 100 },
                    { code: '314323', name: 'Utilization of Electrical Energy', credits: 3, marks: 100 },
                    { code: '314324', name: 'Digital Electronics and Microcontroller Applications', credits: 4, marks: 100 },
                    { code: '314325', name: 'Electrical Estimating and Contracting', credits: 3, marks: 100 },
                    { code: '314008', name: 'Computer Aided Drawing and Simulation', credits: 3, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management', credits: 3, marks: 100 },
                    { code: '315333', name: 'A.C. Machines Performance', credits: 4, marks: 100 },
                    { code: '315334', name: 'Switchgear and Protection', credits: 4, marks: 100 },
                    { code: '315335', name: 'Electric Vehicle Technology', credits: 3, marks: 100 },
                    { code: '315336', name: 'Power System Operation and Control', credits: 4, marks: 100 },
                    { code: '315337', name: 'Renewable Energy Technology', credits: 3, marks: 100 },
                    { code: '315338', name: 'Embedded System', credits: 3, marks: 100 },
                    { code: '315341', name: 'IoT Applications', credits: 3, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316327', name: 'Energy Conservation and Audit', credits: 3, marks: 100 },
                    { code: '316328', name: 'Maintenance of Electrical Equipments', credits: 3, marks: 100 },
                    { code: '316332', name: 'Optical Network and Satellite Communication', credits: 3, marks: 100 },
                    { code: '316334', name: 'Automation & PLC', credits: 3, marks: 100 },
                    { code: '316335', name: 'Drone Technology', credits: 3, marks: 100 },
                    { code: '316336', name: 'Wireless & Mobile Communication', credits: 3, marks: 100 }
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
        icon: '📡',
        description: 'Study of electronic circuits, communication systems, signal processing, and IoT.',
        semesters: {
            1: {
                name: 'Semester 1',
                subjects: [
                    { code: '311302', name: 'Basic Mathematics', credits: 4, marks: 100 },
                    { code: '311303', name: 'Communication Skills (English)', credits: 3, marks: 100 },
                    { code: '311305', name: 'Basic Science', credits: 4, marks: 100 },
                    { code: '311001', name: 'Fundamentals of ICT', credits: 3, marks: 100 },
                    { code: '311003', name: 'Yoga and Meditation', credits: 1, marks: 50 },
                    { code: '311007', name: 'Engineering Workshop Practice (Electronics Group)', credits: 2, marks: 50 },
                    { code: '311008', name: 'Engineering Graphics (Electronics, Computer and Allied Branches)', credits: 3, marks: 100 }
                ]
            },
            2: {
                name: 'Semester 2',
                subjects: [
                    { code: '312301', name: 'Applied Mathematics', credits: 4, marks: 100 },
                    { code: '312314', name: 'Basic Electronics', credits: 4, marks: 100 },
                    { code: '312315', name: 'Elements of Electrical Engineering', credits: 3, marks: 100 },
                    { code: '312316', name: 'Electronic Materials & Components', credits: 3, marks: 100 },
                    { code: '312002', name: 'Professional Communication', credits: 3, marks: 100 },
                    { code: '312003', name: 'Social and Life Skills', credits: 2, marks: 50 },
                    { code: '312008', name: 'Electronics Workshop Practice', credits: 2, marks: 50 },
                    { code: '312009', name: 'Programming in C Language', credits: 3, marks: 100 }
                ]
            },
            3: {
                name: 'Semester 3',
                subjects: [
                    { code: '313303', name: 'Digital Techniques', credits: 4, marks: 100 },
                    { code: '313324', name: 'Analog Electronics', credits: 4, marks: 100 },
                    { code: '313325', name: 'Circuits & Networks', credits: 4, marks: 100 },
                    { code: '313326', name: 'Principles of Electronic Communication', credits: 4, marks: 100 },
                    { code: '313002', name: 'Essence of Indian Constitution', credits: 2, marks: 50 },
                    { code: '313011', name: 'Basic Python Programming', credits: 3, marks: 100 },
                    { code: '313012', name: 'Electronic Measurements & Instrumentation', credits: 3, marks: 100 }
                ]
            },
            4: {
                name: 'Semester 4',
                subjects: [
                    { code: '314301', name: 'Environmental Education and Sustainability', credits: 3, marks: 100 },
                    { code: '314326', name: 'Digital Communication Systems', credits: 4, marks: 100 },
                    { code: '314327', name: 'Consumer Electronic Systems', credits: 3, marks: 100 },
                    { code: '314328', name: 'Microcontroller & Applications', credits: 4, marks: 100 },
                    { code: '314329', name: 'Analog & Digital Communication', credits: 4, marks: 100 },
                    { code: '314333', name: 'AI in Robotics', credits: 3, marks: 100 },
                    { code: '314334', name: 'Principles of Robotics', credits: 3, marks: 100 },
                    { code: '314335', name: 'Automation Tools & Systems', credits: 3, marks: 100 },
                    { code: '314363', name: 'Basic Power Electronics', credits: 3, marks: 100 },
                    { code: '314317', name: 'Java Programming', credits: 3, marks: 100 }
                ]
            },
            5: {
                name: 'Semester 5',
                subjects: [
                    { code: '315301', name: 'Management', credits: 3, marks: 100 },
                    { code: '315326', name: 'Data Analytics', credits: 3, marks: 100 },
                    { code: '315338', name: 'Embedded System', credits: 3, marks: 100 },
                    { code: '315339', name: 'Mobile & Wireless Communication', credits: 3, marks: 100 },
                    { code: '315341', name: 'IoT Applications', credits: 3, marks: 100 },
                    { code: '315342', name: 'Microwave Engineering & Radar System', credits: 3, marks: 100 },
                    { code: '315350', name: 'ML in Robotics', credits: 3, marks: 100 },
                    { code: '315351', name: '3D Printing', credits: 3, marks: 100 }
                ]
            },
            6: {
                name: 'Semester 6',
                subjects: [
                    { code: '316332', name: 'Optical Network and Satellite Communication', credits: 3, marks: 100 },
                    { code: '316334', name: 'Automation & PLC', credits: 3, marks: 100 },
                    { code: '316335', name: 'Drone Technology', credits: 3, marks: 100 },
                    { code: '316336', name: 'Wireless & Mobile Communication', credits: 3, marks: 100 },
                    { code: '316338', name: 'Computer Network & Data Communication', credits: 3, marks: 100 },
                    { code: '316340', name: 'VLSI Applications', credits: 3, marks: 100 },
                    { code: '316342', name: 'Industrial Internet of Things', credits: 3, marks: 100 },
                    { code: '316343', name: 'Industrial Robotics and Applications', credits: 3, marks: 100 },
                    { code: '316345', name: 'Computer Security and Network Management', credits: 3, marks: 100 }
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
        if (key !== 'scheme' && key !== 'board' && key !== 'duration' && key !== 'totalSemesters' && key !== 'lastUpdated') {
            programmes.push({
                slug: key,
                code: MSBTE_K_SCHEME[key].code,
                name: MSBTE_K_SCHEME[key].name,
                icon: MSBTE_K_SCHEME[key].icon,
                description: MSBTE_K_SCHEME[key].description
            });
        }
    }
    return programmes;
}

function getTotalSubjects(slug) {
    var programme = getMSBTEProgramme(slug);
    if (!programme) return 0;
    var count = 0;
    for (var s = 1; s <= 6; s++) {
        if (programme.semesters[s] && programme.semesters[s].subjects) {
            count += programme.semesters[s].subjects.length;
        }
    }
    return count;
}

// ============================================================
// EXPORT TO GLOBAL
// ============================================================

window.MSBTE_K_SCHEME = MSBTE_K_SCHEME;
window.getMSBTEProgramme = getMSBTEProgramme;
window.getMSBTESemester = getMSBTESemester;
window.getMSBTESubjects = getMSBTESubjects;
window.getAllMSBTEProgrammes = getAllMSBTEProgrammes;
window.getTotalSubjects = getTotalSubjects;

console.log('✅ MSBTE K-Scheme data loaded!');
console.log('📚 Programmes:', getAllMSBTEProgrammes().length);
console.log('📖 Last Updated:', MSBTE_K_SCHEME.lastUpdated);