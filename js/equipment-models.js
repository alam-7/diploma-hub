// ============================================================
// EQUIPMENT 3D MODEL LINKS
// ============================================================

const EQUIPMENT_MODELS = {
    // ============================================================
    // MEASURING INSTRUMENTS
    // ============================================================
    'vernier-caliper': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📏'
    },
    'digital-multimeter': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '⚡'
    },
    'oscilloscope': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📊'
    },

    // ============================================================
    // MECHANICAL
    // ============================================================
    'centre-lathe-machine': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '⚙️'
    },
    'drilling-machine': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '🔧'
    },
    'milling-machine': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '🛠️'
    },

    // ============================================================
    // CIVIL
    // ============================================================
    'total-station': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📐'
    },
    'theodolite': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '🔭'
    },

    // ============================================================
    // ELECTRICAL
    // ============================================================
    'transformer': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '⚡'
    },
    'dc-motor': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '🔄'
    },

    // ============================================================
    // COMMUNICATION
    // ============================================================
    'signal-generator': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📡'
    },
    'spectrum-analyzer': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📊'
    }
};

// ============================================================
// HELPER FUNCTION TO GET MODEL URL
// ============================================================
function getEquipmentModel(slug) {
    return EQUIPMENT_MODELS[slug] || null;
}

// Export
window.EQUIPMENT_MODELS = EQUIPMENT_MODELS;
window.getEquipmentModel = getEquipmentModel;