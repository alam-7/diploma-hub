/* ============================================================
   DIPLOMA HUB — MSBTE K-SCHEME COMPLETE DATA
   File: js/msbte-k-scheme-data.js
   Version: 2.0.0
   Updated: 2026-09
   
   ⚠️ IMPORTANT: Do NOT change the variable name.
   It MUST be `window.courseData` so all pages can read it.
   ============================================================ */

window.courseData = {

/* ============================================================
   💻 COMPUTER ENGINEERING (CO)
   ============================================================ */
'computer-engineering': {
    name: 'Computer Engineering',
    icon: '💻',
    code: 'CO',
    description: 'Study of computers, programming, software development, and modern computing systems.',

    semesters: {
    /* ---------- SEMESTER 1 ---------- */
    1: { name: 'Semester 1', subjects: [
        {
            code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100,
            units: [
                { unit: 1, title: 'Algebra', marks: 20, desc: 'Matrices, determinants, simultaneous equations.' },
                { unit: 2, title: 'Trigonometry', marks: 20, desc: 'Ratios, identities, compound angles.' },
                { unit: 3, title: 'Coordinate Geometry', marks: 20, desc: 'Straight lines, circles.' },
                { unit: 4, title: 'Differential Calculus', marks: 20, desc: 'Limits, differentiation, applications.' },
                { unit: 5, title: 'Integral Calculus', marks: 20, desc: 'Indefinite and definite integration.' }
            ],
            notes: [
                { id: 'n-311302-1', title: 'Unit 1 — Algebra Notes', unit: 1, desc: 'Matrices & determinants made simple.', size: 512000, type: 'pdf', url: '#', downloads: 210 },
                { id: 'n-311302-2', title: 'Unit 2 — Trigonometry Notes', unit: 2, desc: 'All formulas in one page.', size: 428000, type: 'pdf', url: '#', downloads: 180 }
            ],
            books: [
                { id: 'b-311302-1', title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', publisher: 'Khanna Publishers', edition: '44th', year: 2024, type: 'textbook', size: 8388608, url: '#', downloads: 950 }
            ],
            papers: [
                { id: 'p-311302-2024-w', title: 'Basic Mathematics — Winter 2024', year: 2024, exam: 'Winter', semester: 1, semesterName: 'Semester 1', type: 'Theory', marks: 100, solved: true, pages: 6, size: 512000, url: '#' },
                { id: 'p-311302-2024-s', title: 'Basic Mathematics — Summer 2024', year: 2024, exam: 'Summer', semester: 1, semesterName: 'Semester 1', type: 'Theory', marks: 100, solved: false, pages: 5, size: 480000, url: '#' }
            ],
            questions: [
                { id: 'q-311302-1', number: 1, text: 'Define matrices and explain their types with examples.', unit: 1, type: 'theory', marks: 4, difficulty: 'easy', answer: 'A matrix is a rectangular arrangement of numbers in rows and columns. Types: row, column, square, diagonal, identity, etc.' },
                { id: 'q-311302-2', number: 2, text: 'Solve the system: 2x + 3y = 8, x − y = 1.', unit: 1, type: 'numerical', marks: 4, difficulty: 'medium', answer: 'Using substitution: x = 1 + y. Then 2(1+y)+3y=8 → 2+5y=8 → y=1.2, x=2.2.' }
            ],
            answers: [
                { id: 'a-311302-1', number: 1, question: 'Define matrices and explain their types.', unit: 1, marks: 4, difficulty: 'easy', steps: ['A matrix is a rectangular arrangement of numbers in rows and columns.', 'Types: Row, Column, Square, Diagonal, Identity, Zero.', 'Example: [1 2; 3 4] is a 2×2 square matrix.'], formula: 'A = [aᵢⱼ]ₘₓₙ', example: 'If A = [1 2; 3 4], det(A) = (1×4) − (2×3) = −2', tip: 'Always write the order of the matrix (m×n).', pdf: '#' }
            ],
            practicals: [
                { id: 'pr-311302-1', number: 1, title: 'Solve quadratic equations using formula', aim: 'Solve given quadratic equations using the formula method.', unit: 1, difficulty: 'easy', marks: 25, apparatus: ['Scientific calculator', 'Formula chart'], procedure: ['Write the standard form ax² + bx + c = 0.', 'Identify a, b, c.', 'Apply x = (−b ± √(b² − 4ac)) / 2a.', 'Compute roots.', 'Verify using sum and product.'], observation: 'Both roots verified.', result: 'Successfully solved quadratic equations.', precautions: ['Use correct signs', 'Verify discriminant'], pdf: '#' }
            ],
            quizzes: [
                { id: 'quiz-311302-1', title: 'Matrices — Basic Quiz', desc: 'Test basics of matrices.', unit: 1, difficulty: 'easy', questions: 10, time: 10, marks: 10,
                  questionList: [
                    { q: 'What is a matrix?', options: ['Rectangular arrangement of numbers', 'Set of equations', 'Type of graph', 'None'], correct: 0, explanation: 'A matrix is a rectangular arrangement of numbers in rows and columns.' },
                    { q: 'Order of matrix [1 2; 3 4]?', options: ['1×4', '2×2', '4×1', '3×2'], correct: 1, explanation: 'It has 2 rows and 2 columns.' }
                  ]
                }
            ]
        },
        {
            code: '311303', name: 'Communication Skills (English)', type: 'Theory', credits: 2, marks: 50,
            units: [
                { unit: 1, title: 'Communication Process', marks: 12 },
                { unit: 2, title: 'Grammar', marks: 12 },
                { unit: 3, title: 'Vocabulary', marks: 12 },
                { unit: 4, title: 'Writing Skills', marks: 14 }
            ]
        },
        {
            code: '311305', name: 'Basic Science (Physics & Chemistry)', type: 'Theory', credits: 4, marks: 100,
            units: [
                { unit: 1, title: 'Units, Motion & Force', marks: 20 },
                { unit: 2, title: 'Work, Energy & Power', marks: 20 },
                { unit: 3, title: 'Properties of Matter', marks: 20 },
                { unit: 4, title: 'Atomic Structure & Bonding', marks: 20 },
                { unit: 5, title: 'Acids, Bases & Salts', marks: 20 }
            ]
        },
        { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50,
          units: [
              { unit: 1, title: 'Computer Fundamentals', marks: 15 },
              { unit: 2, title: 'Operating Systems & Files', marks: 15 },
              { unit: 3, title: 'Internet & Email', marks: 10 },
              { unit: 4, title: 'Basic Troubleshooting', marks: 10 }
          ]
        },
        { code: '311002', name: 'Engineering Workshop Practice', type: 'Practical', credits: 2, marks: 50,
          units: [
              { unit: 1, title: 'Workshop Safety', marks: 10 },
              { unit: 2, title: 'Computer Hardware Identification', marks: 15 },
              { unit: 3, title: 'Assembly & Disassembly', marks: 15 },
              { unit: 4, title: 'Basic Troubleshooting', marks: 10 }
          ]
        },
        { code: '311003', name: 'Yoga and Meditation', type: 'Practical', credits: 1, marks: 25,
          units: [
              { unit: 1, title: 'Introduction to Yoga', marks: 8 },
              { unit: 2, title: 'Breathing Exercises', marks: 8 },
              { unit: 3, title: 'Meditation & Relaxation', marks: 9 }
          ]
        },
        { code: '311008', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'Drawing Instruments & Lettering', marks: 20 },
              { unit: 2, title: 'Orthographic Projection', marks: 20 },
              { unit: 3, title: 'Projection of Points & Lines', marks: 20 },
              { unit: 4, title: 'Projection of Solids', marks: 20 },
              { unit: 5, title: 'Sectional Views & CAD Basics', marks: 20 }
          ]
        }
    ]},

    /* ---------- SEMESTER 2 ---------- */
    2: { name: 'Semester 2', subjects: [
        {
            code: '312303', name: 'Programming in C', type: 'Theory', credits: 4, marks: 100,
            units: [
                { unit: 1, title: 'Basics of C', marks: 12, desc: 'Algorithms, flowcharts, structure, keywords, identifiers.' },
                { unit: 2, title: 'Control Structures', marks: 16, desc: 'if, if-else, switch, loops.' },
                { unit: 3, title: 'Arrays & Structures', marks: 16, desc: '1D/2D arrays, strings, structs.' },
                { unit: 4, title: 'Functions', marks: 14, desc: 'Definition, declaration, recursion.' },
                { unit: 5, title: 'Pointers & File Handling', marks: 12, desc: 'Pointers, file I/O.' }
            ],
            notes: [
                { id: 'n-312303-1', title: 'Unit 1 — C Basics Notes', unit: 1, desc: 'Intro to C with examples.', size: 620000, type: 'pdf', url: '#', downloads: 420 },
                { id: 'n-312303-2', title: 'Unit 4 — Functions Notes', unit: 4, desc: 'All about functions and recursion.', size: 540000, type: 'pdf', url: '#', downloads: 380 }
            ],
            books: [
                { id: 'b-312303-1', title: 'Let Us C', author: 'Yashavant Kanetkar', publisher: 'BPB', edition: '19th', year: 2024, type: 'textbook', size: 7340032, url: '#', downloads: 1450 }
            ],
            papers: [
                { id: 'p-312303-2024-w', title: 'Programming in C — Winter 2024', year: 2024, exam: 'Winter', semester: 2, semesterName: 'Semester 2', type: 'Theory', marks: 100, solved: true, pages: 6, size: 620000, url: '#' }
            ],
            practicals: [
                { id: 'pr-312303-1', number: 1, title: 'Write a program to print "Hello World"', aim: 'Understand compilation and execution of a C program.', unit: 1, difficulty: 'easy', marks: 25, apparatus: ['Computer', 'GCC / Turbo C'], procedure: ['Open editor', 'Write program', 'Save as .c', 'Compile', 'Run', 'Verify output'], observation: 'Program prints Hello World', result: 'Executed successfully', precautions: ['Check syntax', 'Save before compile'], pdf: '#' }
            ],
            quizzes: [
                { id: 'quiz-312303-1', title: 'C Basics Quiz', desc: 'Test basics of C.', unit: 1, difficulty: 'easy', questions: 10, time: 10, marks: 10,
                  questionList: [
                    { q: 'Which is the correct way to declare int?', options: ['int x;', 'x int;', 'declare x;', 'None'], correct: 0, explanation: 'int x; is the correct syntax.' }
                  ]
                }
            ]
        },
        { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'Complex Numbers', marks: 20 },
              { unit: 2, title: 'Differential Equations', marks: 20 },
              { unit: 3, title: 'Partial Differentiation', marks: 20 },
              { unit: 4, title: 'Probability', marks: 20 },
              { unit: 5, title: 'Statistics', marks: 20 }
          ]
        },
        { code: '312302', name: 'Basic Electrical & Electronics Engineering', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'DC Circuits', marks: 20 },
              { unit: 2, title: 'AC Fundamentals', marks: 20 },
              { unit: 3, title: 'Semiconductors & Diodes', marks: 20 },
              { unit: 4, title: 'Transistors & Amplifiers', marks: 20 },
              { unit: 5, title: 'Electrical Safety', marks: 20 }
          ]
        },
        { code: '312304', name: 'Linux Basics', type: 'Practical', credits: 2, marks: 50,
          units: [
              { unit: 1, title: 'Linux Introduction', marks: 15 },
              { unit: 2, title: 'Files & Permissions', marks: 15 },
              { unit: 3, title: 'Commands & Shell', marks: 20 }
          ]
        },
        { code: '312305', name: 'Professional Communication', type: 'Theory', credits: 2, marks: 50,
          units: [
              { unit: 1, title: 'Presentation Skills', marks: 15 },
              { unit: 2, title: 'Group Discussion & Interview', marks: 15 },
              { unit: 3, title: 'Formal Writing', marks: 20 }
          ]
        },
        { code: '312306', name: 'Social and Life Skills', type: 'Practical', credits: 1, marks: 25,
          units: [
              { unit: 1, title: 'Personality Development', marks: 8 },
              { unit: 2, title: 'Time Management & Teamwork', marks: 8 },
              { unit: 3, title: 'Ethics & Behaviour', marks: 9 }
          ]
        },
        { code: '312307', name: 'Web Page Designing', type: 'Practical', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'HTML Basics', marks: 25 },
              { unit: 2, title: 'CSS Basics', marks: 25 },
              { unit: 3, title: 'Layout & Responsive', marks: 25 },
              { unit: 4, title: 'JavaScript Basics', marks: 25 }
          ]
        }
    ]},

    /* ---------- SEMESTER 3 ---------- */
    3: { name: 'Semester 3', subjects: [
        { code: '313301', name: 'Data Structure Using C', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'Intro to Data Structures', marks: 14 },
              { unit: 2, title: 'Linked Lists', marks: 16 },
              { unit: 3, title: 'Stacks & Queues', marks: 16 },
              { unit: 4, title: 'Trees & Graphs', marks: 14 },
              { unit: 5, title: 'Searching & Sorting', marks: 12 }
          ],
          quizzes: [
              { id: 'quiz-313301-1', title: 'Linked Lists Quiz', unit: 2, difficulty: 'medium', questions: 10, time: 10, marks: 10, desc: 'Test linked list concepts.' }
          ]
        },
        { code: '313306', name: 'Data Structure Using Python', type: 'Practical', credits: 2, marks: 50,
          units: [
              { unit: 1, title: 'Python Review', marks: 10 },
              { unit: 2, title: 'Lists, Tuples, Sets, Dicts', marks: 15 },
              { unit: 3, title: 'Searching & Sorting', marks: 15 },
              { unit: 4, title: 'Trees & Graphs', marks: 10 }
          ]
        },
        { code: '313303', name: 'Digital Techniques', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'Number Systems', marks: 16 },
              { unit: 2, title: 'Boolean Algebra & Logic Gates', marks: 18 },
              { unit: 3, title: 'Combinational Circuits', marks: 18 },
              { unit: 4, title: 'Sequential Circuits', marks: 18 }
          ]
        },
        { code: '313307', name: 'Statistical Modelling for Machine Learning', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'Intro to Statistics', marks: 20 },
              { unit: 2, title: 'Central Tendency & Dispersion', marks: 20 },
              { unit: 3, title: 'Probability & Distributions', marks: 20 },
              { unit: 4, title: 'Correlation & Regression', marks: 20 },
              { unit: 5, title: 'Intro to ML Models', marks: 20 }
          ]
        },
        { code: '313302', name: 'Database Management System', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'DBMS Fundamentals', marks: 16 },
              { unit: 2, title: 'ER Model & Relational Model', marks: 18 },
              { unit: 3, title: 'SQL', marks: 18 },
              { unit: 4, title: 'Normalization & Transactions', marks: 18 }
          ]
        },
        { code: '313304', name: 'Object Oriented Programming Using C++', type: 'Theory', credits: 4, marks: 100,
          units: [
              { unit: 1, title: 'OOP Concepts', marks: 14 },
              { unit: 2, title: 'Classes & Objects', marks: 16 },
              { unit: 3, title: 'Inheritance', marks: 16 },
              { unit: 4, title: 'Polymorphism', marks: 14 },
              { unit: 5, title: 'Templates & Exception Handling', marks: 10 }
          ]
        }
    ]},

    /* ---------- SEMESTER 4 ---------- */
    4: { name: 'Semester 4', subjects: [
        { code: '314316', name: 'Probability and Statistics', type: 'Theory', credits: 4, marks: 100 },
        { code: '314320', name: 'Mathematics for Machine Learning', type: 'Theory', credits: 4, marks: 100 },
        { code: '314318', name: 'Data Communication and Computer Network', type: 'Theory', credits: 4, marks: 100 },
        { code: '314321', name: 'Microprocessor Programming', type: 'Theory', credits: 4, marks: 100 },
        { code: '314317', name: 'Java Programming', type: 'Theory', credits: 4, marks: 100 },
        { code: '314319', name: 'Information Security', type: 'Theory', credits: 4, marks: 100 },
        { code: '314301', name: 'Environmental Education & Sustainability', type: 'Theory', credits: 2, marks: 50 }
    ]},

    /* ---------- SEMESTER 5 ---------- */
    5: { name: 'Semester 5', subjects: [
        { code: '315319', name: 'Operating System', type: 'Theory', credits: 4, marks: 100 },
        { code: '315323', name: 'Software Engineering', type: 'Theory', credits: 4, marks: 100 },
        { code: '315324', name: 'Advanced Database Management', type: 'Theory', credits: 4, marks: 100 },
        { code: '315325', name: 'Cloud Computing', type: 'Theory', credits: 4, marks: 100 },
        { code: '315326', name: 'Data Analytics', type: 'Theory', credits: 4, marks: 100 },
        { code: '315321', name: 'Advance Computer Network', type: 'Theory', credits: 4, marks: 100 },
        { code: '315330', name: 'AI & ML Algorithm', type: 'Theory', credits: 4, marks: 100 },
        { code: '315329', name: 'Natural Language Processing', type: 'Theory', credits: 4, marks: 100 },
        { code: '315327', name: 'Cloud Computing for Data Science', type: 'Theory', credits: 4, marks: 100 },
        { code: '315332', name: 'Software Engineering and Testing', type: 'Theory', credits: 4, marks: 100 },
        { code: '315301', name: 'Management', type: 'Theory', credits: 2, marks: 50 }
    ]},

    /* ---------- SEMESTER 6 ---------- */
    6: { name: 'Semester 6', subjects: [
        { code: '316313', name: 'Emerging Trends in CE & IT', type: 'Theory', credits: 4, marks: 100 },
        { code: '316314', name: 'Software Testing', type: 'Theory', credits: 4, marks: 100 },
        { code: '316004', name: 'Capstone Project', type: 'Practical', credits: 8, marks: 200 },
        { code: '316315', name: 'Digital Forensic & Hacking Techniques', type: 'Theory', credits: 4, marks: 100 },
        { code: '316316', name: 'Machine Learning', type: 'Theory', credits: 4, marks: 100 },
        { code: '316317', name: 'Network and Information Security', type: 'Theory', credits: 4, marks: 100 },
        { code: '316318', name: 'Big Data Analytics', type: 'Theory', credits: 4, marks: 100 },
        { code: '316319', name: 'Principles of Image Processing', type: 'Theory', credits: 4, marks: 100 },
        { code: '316320', name: 'Advanced Algorithm in AI & ML', type: 'Theory', credits: 4, marks: 100 },
        { code: '316321', name: 'Data Warehousing with Mining Techniques', type: 'Theory', credits: 4, marks: 100 },
        { code: '316322', name: 'Image Processing', type: 'Theory', credits: 4, marks: 100 },
        { code: '316323', name: 'Reinforcement Learning', type: 'Theory', credits: 4, marks: 100 },
        { code: '316324', name: 'Software Engineering & Testing for Big Data', type: 'Theory', credits: 4, marks: 100 },
        { code: '316325', name: 'Wireless and Mobile Network', type: 'Theory', credits: 4, marks: 100 }
    ]}
    }
},

/* ============================================================
   ⚙️ MECHANICAL ENGINEERING (ME)
   ============================================================ */
'mechanical-engineering': {
    name: 'Mechanical Engineering',
    icon: '⚙️',
    code: 'ME',
    description: 'Study of machines, manufacturing, thermal systems, and mechanical design.',

    semesters: {
    1: { name: 'Semester 1', subjects: [
        { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '311303', name: 'Communication Skills (English)', type: 'Theory', credits: 2, marks: 50 },
        { code: '311305', name: 'Basic Science (Physics & Chemistry)', type: 'Theory', credits: 4, marks: 100 },
        { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50 },
        { code: '311006', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 },
        { code: '311007', name: 'Workshop Practice', type: 'Practical', credits: 4, marks: 100 },
        { code: '311003', name: 'Yoga and Meditation', type: 'Practical', credits: 1, marks: 25 }
    ]},
    2: { name: 'Semester 2', subjects: [
        { code: '312312', name: 'Engineering Mechanics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312313', name: 'Basic Electrical & Electronics Engg.', type: 'Theory', credits: 4, marks: 100 },
        { code: '312340', name: 'Basic Workshop Practice', type: 'Practical', credits: 4, marks: 100 },
        { code: '312305', name: 'Professional Communication', type: 'Theory', credits: 2, marks: 50 },
        { code: '312306', name: 'Social and Life Skills', type: 'Practical', credits: 1, marks: 25 }
    ]},
    3: { name: 'Semester 3', subjects: [
        { code: '313311', name: 'Strength of Materials', type: 'Theory', credits: 4, marks: 100 },
        { code: '313312', name: 'Thermodynamics', type: 'Theory', credits: 4, marks: 100 },
        { code: '313313', name: 'Manufacturing Processes', type: 'Theory', credits: 4, marks: 100 },
        { code: '313314', name: 'Machine Drawing', type: 'Practical', credits: 4, marks: 100 },
        { code: '313315', name: 'Engineering Materials', type: 'Theory', credits: 4, marks: 100 }
    ]},
    4: { name: 'Semester 4', subjects: [
        { code: '314311', name: 'Fluid Mechanics & Machinery', type: 'Theory', credits: 4, marks: 100 },
        { code: '314312', name: 'Theory of Machines', type: 'Theory', credits: 4, marks: 100 },
        { code: '314313', name: 'Production Technology', type: 'Theory', credits: 4, marks: 100 },
        { code: '314314', name: 'Metrology & Measurements', type: 'Theory', credits: 4, marks: 100 },
        { code: '314301', name: 'Environmental Education', type: 'Theory', credits: 2, marks: 50 }
    ]},
    5: { name: 'Semester 5', subjects: [
        { code: '315311', name: 'Design of Machine Elements', type: 'Theory', credits: 4, marks: 100 },
        { code: '315312', name: 'Industrial Engineering & Management', type: 'Theory', credits: 4, marks: 100 },
        { code: '315313', name: 'CAD/CAM', type: 'Theory', credits: 4, marks: 100 },
        { code: '315314', name: 'Refrigeration & Air Conditioning', type: 'Theory', credits: 4, marks: 100 },
        { code: '315301', name: 'Management', type: 'Theory', credits: 2, marks: 50 }
    ]},
    6: { name: 'Semester 6', subjects: [
        { code: '316311', name: 'Industrial Automation', type: 'Theory', credits: 4, marks: 100 },
        { code: '316312', name: 'Power Plant Engineering', type: 'Theory', credits: 4, marks: 100 },
        { code: '316004', name: 'Capstone Project', type: 'Practical', credits: 8, marks: 200 },
        { code: '316313', name: 'Emerging Trends in ME', type: 'Theory', credits: 4, marks: 100 }
    ]}
    }
},

/* ============================================================
   🏗️ CIVIL ENGINEERING (CE)
   ============================================================ */
'civil-engineering': {
    name: 'Civil Engineering',
    icon: '🏗️',
    code: 'CE',
    description: 'Study of construction, infrastructure, structural design, and surveying.',

    semesters: {
    1: { name: 'Semester 1', subjects: [
        { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '311303', name: 'Communication Skills (English)', type: 'Theory', credits: 2, marks: 50 },
        { code: '311305', name: 'Basic Science', type: 'Theory', credits: 4, marks: 100 },
        { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50 },
        { code: '311010', name: 'Civil Engineering Workshop', type: 'Practical', credits: 2, marks: 50 },
        { code: '311008', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
    ]},
    2: { name: 'Semester 2', subjects: [
        { code: '312312', name: 'Engineering Mechanics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312339', name: 'Surveying', type: 'Practical', credits: 4, marks: 100 },
        { code: '312305', name: 'Professional Communication', type: 'Theory', credits: 2, marks: 50 }
    ]},
    3: { name: 'Semester 3', subjects: [
        { code: '313321', name: 'Building Materials', type: 'Theory', credits: 4, marks: 100 },
        { code: '313322', name: 'Strength of Materials', type: 'Theory', credits: 4, marks: 100 },
        { code: '313323', name: 'Concrete Technology', type: 'Theory', credits: 4, marks: 100 },
        { code: '313324', name: 'Building Construction', type: 'Theory', credits: 4, marks: 100 }
    ]},
    4: { name: 'Semester 4', subjects: [
        { code: '314321', name: 'Structural Mechanics', type: 'Theory', credits: 4, marks: 100 },
        { code: '314322', name: 'Estimating & Costing', type: 'Theory', credits: 4, marks: 100 },
        { code: '314323', name: 'Water Supply & Sanitary Engg.', type: 'Theory', credits: 4, marks: 100 },
        { code: '314301', name: 'Environmental Education', type: 'Theory', credits: 2, marks: 50 }
    ]},
    5: { name: 'Semester 5', subjects: [
        { code: '315321', name: 'Design of Steel Structures', type: 'Theory', credits: 4, marks: 100 },
        { code: '315322', name: 'Design of RCC Structures', type: 'Theory', credits: 4, marks: 100 },
        { code: '315323', name: 'Transportation Engineering', type: 'Theory', credits: 4, marks: 100 }
    ]},
    6: { name: 'Semester 6', subjects: [
        { code: '316321', name: 'Construction Management', type: 'Theory', credits: 4, marks: 100 },
        { code: '316322', name: 'Earthquake Engineering', type: 'Theory', credits: 4, marks: 100 },
        { code: '316004', name: 'Capstone Project', type: 'Practical', credits: 8, marks: 200 }
    ]}
    }
},

/* ============================================================
   ⚡ ELECTRICAL ENGINEERING (EE)
   ============================================================ */
'electrical-engineering': {
    name: 'Electrical Engineering',
    icon: '⚡',
    code: 'EE',
    description: 'Study of electrical systems, power generation, machines, and control systems.',

    semesters: {
    1: { name: 'Semester 1', subjects: [
        { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '311303', name: 'Communication Skills (English)', type: 'Theory', credits: 2, marks: 50 },
        { code: '311305', name: 'Basic Science', type: 'Theory', credits: 4, marks: 100 },
        { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50 },
        { code: '311008', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
    ]},
    2: { name: 'Semester 2', subjects: [
        { code: '312310', name: 'Fundamental of Electrical Engineering', type: 'Theory', credits: 4, marks: 100 },
        { code: '312309', name: 'Elements of Electronics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100 }
    ]},
    3: { name: 'Semester 3', subjects: [
        { code: '313331', name: 'Electrical Circuits', type: 'Theory', credits: 4, marks: 100 },
        { code: '313332', name: 'Electrical Machines I', type: 'Theory', credits: 4, marks: 100 },
        { code: '313333', name: 'Electrical Measurements', type: 'Theory', credits: 4, marks: 100 },
        { code: '313334', name: 'Electrical Workshop', type: 'Practical', credits: 4, marks: 100 }
    ]},
    4: { name: 'Semester 4', subjects: [
        { code: '314331', name: 'Electrical Machines II', type: 'Theory', credits: 4, marks: 100 },
        { code: '314332', name: 'Power Systems I', type: 'Theory', credits: 4, marks: 100 },
        { code: '314333', name: 'Digital Electronics', type: 'Theory', credits: 4, marks: 100 },
        { code: '314301', name: 'Environmental Education', type: 'Theory', credits: 2, marks: 50 }
    ]},
    5: { name: 'Semester 5', subjects: [
        { code: '315331', name: 'Power Systems II', type: 'Theory', credits: 4, marks: 100 },
        { code: '315332', name: 'Utilization of Electrical Energy', type: 'Theory', credits: 4, marks: 100 },
        { code: '315333', name: 'Control Systems', type: 'Theory', credits: 4, marks: 100 }
    ]},
    6: { name: 'Semester 6', subjects: [
        { code: '316331', name: 'Switchgear & Protection', type: 'Theory', credits: 4, marks: 100 },
        { code: '316332', name: 'Industrial Drives', type: 'Theory', credits: 4, marks: 100 },
        { code: '316004', name: 'Capstone Project', type: 'Practical', credits: 8, marks: 200 }
    ]}
    }
},

/* ============================================================
   📡 ELECTRONICS & TELECOMMUNICATION (EJ)
   ============================================================ */
'electronics-telecommunication': {
    name: 'Electronics & Telecommunication',
    icon: '📡',
    code: 'EJ',
    description: 'Study of electronic circuits, communication systems, and embedded technology.',

    semesters: {
    1: { name: 'Semester 1', subjects: [
        { code: '311302', name: 'Basic Mathematics', type: 'Theory', credits: 4, marks: 100 },
        { code: '311303', name: 'Communication Skills (English)', type: 'Theory', credits: 2, marks: 50 },
        { code: '311305', name: 'Basic Science', type: 'Theory', credits: 4, marks: 100 },
        { code: '311001', name: 'Fundamentals of ICT', type: 'Practical', credits: 2, marks: 50 },
        { code: '311008', name: 'Engineering Graphics', type: 'Practical', credits: 4, marks: 100 }
    ]},
    2: { name: 'Semester 2', subjects: [
        { code: '312314', name: 'Basic Electronics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312309', name: 'Elements of Electronics', type: 'Theory', credits: 4, marks: 100 },
        { code: '312301', name: 'Applied Mathematics', type: 'Theory', credits: 4, marks: 100 }
    ]},
    3: { name: 'Semester 3', subjects: [
        { code: '313341', name: 'Electronic Devices & Circuits', type: 'Theory', credits: 4, marks: 100 },
        { code: '313342', name: 'Digital Techniques', type: 'Theory', credits: 4, marks: 100 },
        { code: '313343', name: 'Network Analysis', type: 'Theory', credits: 4, marks: 100 },
        { code: '313344', name: 'Electronics Workshop', type: 'Practical', credits: 4, marks: 100 }
    ]},
    4: { name: 'Semester 4', subjects: [
        { code: '314341', name: 'Analog Communication', type: 'Theory', credits: 4, marks: 100 },
        { code: '314342', name: 'Microcontrollers', type: 'Theory', credits: 4, marks: 100 },
        { code: '314343', name: 'Linear Integrated Circuits', type: 'Theory', credits: 4, marks: 100 },
        { code: '314301', name: 'Environmental Education', type: 'Theory', credits: 2, marks: 50 }
    ]},
    5: { name: 'Semester 5', subjects: [
        { code: '315341', name: 'Digital Communication', type: 'Theory', credits: 4, marks: 100 },
        { code: '315342', name: 'Embedded Systems', type: 'Theory', credits: 4, marks: 100 },
        { code: '315343', name: 'Consumer Electronics', type: 'Theory', credits: 4, marks: 100 }
    ]},
    6: { name: 'Semester 6', subjects: [
        { code: '316341', name: 'Mobile Communication', type: 'Theory', credits: 4, marks: 100 },
        { code: '316342', name: 'IoT Fundamentals', type: 'Theory', credits: 4, marks: 100 },
        { code: '316004', name: 'Capstone Project', type: 'Practical', credits: 8, marks: 200 }
    ]}
    }
}

};
/* ============================================================
   END OF DATA FILE
   ============================================================ */