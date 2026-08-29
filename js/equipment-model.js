// ============================================================
// EQUIPMENT 3D MODEL LINKS
// ============================================================

const EQUIPMENT_MODELS = {
    // Measuring Instruments
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

    // Mechanical
    'centre-lathe-machine': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '⚙️'
    },
    'drilling-machine': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '🔧'
    },

    // Civil
    'total-station': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📐'
    },

    // Electrical
    'transformer': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '⚡'
    },

    // Communication
    'signal-generator': {
        model: 'https://cdn.jsdelivr.net/npm/threejs-examples@1.0.0/models/gltf/',
        fallback: '📡'
    }
};

function getEquipmentModel(slug) {
    return EQUIPMENT_MODELS[slug] || null;
}

window.EQUIPMENT_MODELS = EQUIPMENT_MODELS;
window.getEquipmentModel = getEquipmentModel;