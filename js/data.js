// ============================================
// COURSES DATA - Use var for global scope
// ============================================
var COURSES = [
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
// EQUIPMENT DATA
// ============================================
var EQUIPMENT = [
    {
        id: 1,
        name: 'Vernier Caliper',
        slug: 'vernier-caliper',
        category: 'Measuring Instruments',
        purpose: 'Precision measurement of length, depth, and internal/external dimensions',
        working_principle: 'Uses a main scale and sliding vernier scale for precise readings',
        main_parts: ['Main Scale', 'Vernier Scale', 'Jaws', 'Depth Probe', 'Locking Screw'],
        how_it_works: 'The vernier scale slides along the main scale, allowing readings to 0.02mm or 0.001 inches',
        applications: ['Engineering workshops', 'Quality control', 'Laboratory measurements', 'Manufacturing'],
        safety_precautions: ['Handle carefully', 'Avoid dropping', 'Clean after use', 'Store in protective case'],
        verification_status: 'pending'
    },
    {
        id: 2,
        name: 'Screw Gauge / Micrometer',
        slug: 'screw-gauge-micrometer',
        category: 'Measuring Instruments',
        purpose: 'Precision measurement of small dimensions up to 0.01mm accuracy',
        working_principle: 'Uses a calibrated screw mechanism to measure small distances',
        main_parts: ['Frame', 'Anvil', 'Spindle', 'Thimble', 'Ratchet', 'Locking Device'],
        how_it_works: 'Rotating the thimble moves the spindle precisely toward the anvil',
        applications: ['Precision engineering', 'Laboratory measurements', 'Quality inspection'],
        safety_precautions: ['Handle gently', 'Do not overtighten', 'Clean after use'],
        verification_status: 'pending'
    },
    {
        id: 3,
        name: 'Steel Rule',
        slug: 'steel-rule',
        category: 'Measuring Instruments',
        purpose: 'Basic linear measurement tool',
        working_principle: 'Simple graduated scale for direct measurement',
        main_parts: ['Graduated Steel Blade'],
        how_it_works: 'Directly place against object and read measurement from scale',
        applications: ['General workshop', 'Marking and layout', 'Rough measurements'],
        safety_precautions: ['Keep clean', 'Avoid bending', 'Store flat'],
        verification_status: 'pending'
    },
    {
        id: 4,
        name: 'Digital Multimeter',
        slug: 'digital-multimeter',
        category: 'Electrical & Electronic',
        purpose: 'Measurement of voltage, current, and resistance',
        working_principle: 'Converts analog electrical signals to digital readings using ADC',
        main_parts: ['Display', 'Selection Dial', 'Test Leads', 'Input Jacks'],
        how_it_works: 'Measures electrical parameters and displays numerical values',
        applications: ['Electrical testing', 'Circuit troubleshooting', 'Electronics repair'],
        safety_precautions: ['Do not exceed ratings', 'Check leads', 'Use proper settings'],
        verification_status: 'pending'
    },
    {
        id: 5,
        name: 'DC Power Supply',
        slug: 'dc-power-supply',
        category: 'Electrical & Electronic',
        purpose: 'Provides regulated DC voltage for electronic circuits',
        working_principle: 'Converts AC to regulated DC using transformer and regulator',
        main_parts: ['Transformer', 'Rectifier', 'Voltage Regulator', 'Output Terminals'],
        how_it_works: 'AC input is transformed, rectified, and regulated to stable DC output',
        applications: ['Circuit testing', 'Powering projects', 'Laboratory experiments'],
        safety_precautions: ['Do not short output', 'Observe limits', 'Check polarity'],
        verification_status: 'pending'
    },
    {
        id: 6,
        name: 'Breadboard',
        slug: 'breadboard',
        category: 'Electrical & Electronic',
        purpose: 'Platform for building and testing circuits without soldering',
        working_principle: 'Uses interconnected spring terminals for temporary connections',
        main_parts: ['Terminal Strips', 'Power Rails', 'Spring Contacts'],
        how_it_works: 'Components inserted into holes make electrical connections via springs',
        applications: ['Circuit prototyping', 'Testing designs', 'Education'],
        safety_precautions: ['Avoid large wires', 'Keep clean', 'Check connections'],
        verification_status: 'pending'
    },
    {
        id: 7,
        name: 'Soldering Iron',
        slug: 'soldering-iron',
        category: 'Electrical & Electronic',
        purpose: 'Tool for soldering electronic components',
        working_principle: 'Heats to melt solder for joining components',
        main_parts: ['Heating Element', 'Tip', 'Handle', 'Temperature Control'],
        how_it_works: 'Heating element melts solder to create connections',
        applications: ['PCB assembly', 'Component soldering', 'Circuit repair'],
        safety_precautions: ['Use ventilation', 'Avoid burns', 'Clean tip'],
        verification_status: 'pending'
    }
];

console.log('✅ Data.js loaded successfully!');
console.log('📚 Courses loaded:', COURSES.length);
console.log('🔧 Equipment loaded:', EQUIPMENT.length);