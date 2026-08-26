// ============================================
// COURSES DATA
// ============================================
const COURSES = [
    {
        id: 'computer-engineering',
        name: 'Computer Engineering',
        icon: '💻',
        description: 'Study of computers, programming, networks, and software development.',
        slug: 'computer-engineering'
    },
    {
        id: 'mechanical-engineering',
        name: 'Mechanical Engineering',
        icon: '⚙️',
        description: 'Study of machines, manufacturing, thermodynamics, and mechanical systems.',
        slug: 'mechanical-engineering'
    },
    {
        id: 'civil-engineering',
        name: 'Civil Engineering',
        icon: '🏗️',
        description: 'Study of construction, infrastructure, surveying, and structural design.',
        slug: 'civil-engineering'
    },
    {
        id: 'electrical-engineering',
        name: 'Electrical Engineering',
        icon: '⚡',
        description: 'Study of electrical systems, power generation, motors, and control systems.',
        slug: 'electrical-engineering'
    },
    {
        id: 'electronics-telecommunication',
        name: 'Electronics & Telecommunication',
        icon: '📡',
        description: 'Study of electronic circuits, communication systems, signal processing, and IoT.',
        slug: 'electronics-telecommunication'
    }
];

// ============================================
// EQUIPMENT DATA (200+ items)
// ============================================
const EQUIPMENT = [
    // Measuring Instruments
    {
        id: 1,
        name: 'Vernier Caliper',
        slug: 'vernier-caliper',
        category: 'Measuring Instruments',
        course: ['computer-engineering', 'mechanical-engineering', 'civil-engineering', 'electrical-engineering', 'electronics-telecommunication'],
        purpose: 'Precision measurement of length, depth, and internal/external dimensions',
        working_principle: 'Uses a main scale and sliding vernier scale for precise readings',
        main_parts: ['Main Scale', 'Vernier Scale', 'Jaws', 'Depth Probe', 'Locking Screw'],
        how_it_works: 'The vernier scale slides along the main scale, allowing readings to 0.02mm or 0.001 inches',
        how_used: 'Used for measuring external dimensions, internal dimensions, and depths of objects',
        applications: ['Engineering workshops', 'Quality control', 'Laboratory measurements', 'Manufacturing'],
        safety_precautions: ['Handle carefully', 'Avoid dropping', 'Clean after use', 'Store in protective case'],
        verification_status: 'pending'
    },
    {
        id: 2,
        name: 'Screw Gauge / Micrometer',
        slug: 'screw-gauge-micrometer',
        category: 'Measuring Instruments',
        course: ['computer-engineering', 'mechanical-engineering', 'civil-engineering', 'electrical-engineering'],
        purpose: 'Precision measurement of small dimensions up to 0.01mm accuracy',
        working_principle: 'Uses a calibrated screw mechanism to measure small distances',
        main_parts: ['Frame', 'Anvil', 'Spindle', 'Thimble', 'Ratchet', 'Locking Device'],
        how_it_works: 'Rotating the thimble moves the spindle precisely toward the anvil, measuring the object between them',
        how_used: 'Used for measuring thickness, diameter of small objects, and wire gauges',
        applications: ['Precision engineering', 'Laboratory measurements', 'Quality inspection', 'Manufacturing'],
        safety_precautions: ['Handle gently', 'Do not overtighten', 'Clean after use', 'Calibrate regularly'],
        verification_status: 'pending'
    },
    {
        id: 3,
        name: 'Steel Rule',
        slug: 'steel-rule',
        category: 'Measuring Instruments',
        course: ['computer-engineering', 'mechanical-engineering', 'civil-engineering'],
        purpose: 'Basic linear measurement tool',
        working_principle: 'Simple graduated scale for direct measurement',
        main_parts: ['Graduated Steel Blade', 'End Stop'],
        how_it_works: 'Directly place against object and read measurement from scale',
        how_used: 'Used for quick linear measurements, marking, and layout work',
        applications: ['General workshop', 'Marking and layout', 'Rough measurements'],
        safety_precautions: ['Keep clean', 'Avoid bending', 'Store flat'],
        verification_status: 'pending'
    },
    {
        id: 4,
        name: 'Measuring Tape',
        slug: 'measuring-tape',
        category: 'Measuring Instruments',
        course: ['computer-engineering', 'mechanical-engineering', 'civil-engineering'],
        purpose: 'Flexible measurement for longer distances',
        working_principle: 'Flexible tape with graduated markings for length measurement',
        main_parts: ['Tape Blade', 'Housing', 'Hook End', 'Lock Mechanism'],
        how_it_works: 'Extend tape to required length, lock, and read measurement from markings',
        how_used: 'Used for measuring distances in construction, surveying, and workshops',
        applications: ['Construction', 'Surveying', 'Workshop measurements', 'Distance measurement'],
        safety_precautions: ['Avoid kinking', 'Clean after use', 'Retract carefully'],
        verification_status: 'pending'
    },
    {
        id: 5,
        name: 'Digital Multimeter',
        slug: 'digital-multimeter',
        category: 'Electrical & Electronic',
        course: ['computer-engineering', 'electrical-engineering', 'electronics-telecommunication'],
        purpose: 'Measurement of voltage, current, and resistance',
        working_principle: 'Converts analog electrical signals to digital readings using ADC',
        main_parts: ['Display', 'Selection Dial', 'Test Leads', 'Input Jacks', 'Internal Circuitry'],
        how_it_works: 'Measures electrical parameters and displays numerical values on digital screen',
        how_used: 'Used for electrical testing, circuit troubleshooting, and electronics repair',
        applications: ['Electrical testing', 'Circuit troubleshooting', 'Electronics repair', 'Laboratory work'],
        safety_precautions: ['Do not exceed voltage/current ratings', 'Check leads before use', 'Use proper settings', 'Replace batteries when low'],
        verification_status: 'pending'
    },
    {
        id: 6,
        name: 'DC Power Supply',
        slug: 'dc-power-supply',
        category: 'Electrical & Electronic',
        course: ['computer-engineering', 'electrical-engineering', 'electronics-telecommunication'],
        purpose: 'Provides regulated DC voltage for electronic circuits',
        working_principle: 'Converts AC to regulated DC using transformer, rectifier, filter, and regulator',
        main_parts: ['Transformer', 'Rectifier', 'Filter Capacitor', 'Voltage Regulator', 'Output Terminals', 'Controls'],
        how_it_works: 'AC input is transformed, rectified to DC, filtered, and regulated to stable output voltage',
        how_used: 'Used for powering electronic projects, circuit testing, and laboratory experiments',
        applications: ['Circuit testing', 'Powering electronic projects', 'Laboratory experiments', 'Device testing'],
        safety_precautions: ['Do not short output', 'Observe voltage limits', 'Use proper cooling', 'Check polarity before connecting'],
        verification_status: 'pending'
    },
    {
        id: 7,
        name: 'Breadboard',
        slug: 'breadboard',
        category: 'Electrical & Electronic',
        course: ['computer-engineering', 'electrical-engineering', 'electronics-telecommunication'],
        purpose: 'Platform for building and testing electronic circuits without soldering',
        working_principle: 'Uses rows of interconnected spring terminals to make temporary connections',
        main_parts: ['Terminal Strips', 'Power Rails', 'Spring Contacts', 'Adhesive Backing'],
        how_it_works: 'Components are inserted into terminal holes, where spring contacts make electrical connections',
        how_used: 'Used for circuit prototyping, testing electronic designs, and educational experiments',
        applications: ['Circuit prototyping', 'Testing electronic designs', 'Educational experiments', 'Rapid development'],
        safety_precautions: ['Do not insert large wires', 'Avoid excessive force', 'Keep clean', 'Check connections carefully'],
        verification_status: 'pending'
    },
    {
        id: 8,
        name: 'Soldering Iron',
        slug: 'soldering-iron',
        category: 'Electrical & Electronic',
        course: ['computer-engineering', 'electrical-engineering', 'electronics-telecommunication'],
        purpose: 'Tool for soldering electronic components',
        working_principle: 'Heats to melt solder for joining electronic components',
        main_parts: ['Heating Element', 'Tip', 'Handle', 'Temperature Control', 'Stand'],
        how_it_works: 'Heating element heats tip to melt solder, creating permanent electrical connections',
        how_used: 'Used for PCB assembly, component soldering, and circuit repair',
        applications: ['PCB assembly', 'Component soldering', 'Circuit repair', 'Electronic fabrication'],
        safety_precautions: ['Use in ventilated area', 'Avoid burns', 'Clean tip regularly', 'Use safety glasses', 'Turn off when not in use'],
        verification_status: 'pending'
    },
    // ... More equipment will be added
];

// ============================================
// ACHIEVEMENTS
// ============================================
const ACHIEVEMENTS = [
    { id: 1, name: 'First Lesson', description: 'Completed your first lesson', icon: '📚', xp: 10 },
    { id: 2, name: 'First Practical', description: 'Completed your first practical', icon: '🔬', xp: 15 },
    { id: 3, name: '10 Concepts', description: 'Completed 10 concepts', icon: '🧠', xp: 50 },
    { id: 4, name: '5 Quizzes', description: 'Completed 5 quizzes', icon: '📝', xp: 40 },
    { id: 5, name: 'Equipment Explorer',