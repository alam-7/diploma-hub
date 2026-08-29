// ============================================================
// HOLOGRAPHIC 3D EQUIPMENT VIEWER - WITH PROCEDURAL GENERATION
// ============================================================

class HologramViewer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('❌ Container not found:', containerId);
            return;
        }

        this.options = {
            autoRotate: true,
            rotateSpeed: 0.005,
            backgroundColor: 0x0a0a1a,
            glowColor: 0x00f5ff,
            glowColor2: 0x7b2ffc,
            equipmentName: '',
            equipmentCategory: '',
            ...options
        };

        this.model = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.isLoading = true;

        // Category colors
        this.categoryColors = {
            'Measuring Instruments': 0x00f5ff,
            'Electrical & Electronic': 0x3b82f6,
            'Mechanical Workshop': 0xf59e0b,
            'Civil & Surveying': 0x22c55e,
            'Computer & IT': 0x8b5cf6,
            'Power Systems': 0xeab308,
            'Communication': 0xec4899,
            'Hand Tools': 0xef4444,
            'Testing & Quality': 0x14b8a6,
            'Common Engineering': 0x06b6d4
        };

        this.init();
    }

    init() {
        const container = this.container;
        const width = container.clientWidth || 500;
        const height = container.clientHeight || 400;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(4, 3, 6);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        container.appendChild(this.renderer.domElement);

        // Controls
        this.setupControls();

        // Lights
        this.addLights();

        // Environment
        this.addEnvironment();

        // Particles
        this.addParticles();

        // Generate 3D Equipment Model
        this.generateEquipmentModel();

        // Events
        this.setupEvents();

        // Start Animation
        this.animate();

        // Show controls
        this.showControls();
    }

    // ============================================================
    // GENERATE EQUIPMENT 3D MODEL PROCEDURALLY
    // ============================================================
    generateEquipmentModel() {
        const group = new THREE.Group();

        // Get color for category
        const colorHex = this.categoryColors[this.options.equipmentCategory] || 0x00f5ff;
        const color = new THREE.Color(colorHex);
        const color2 = new THREE.Color(colorHex).offsetHSL(0.1, 0.2, 0.2);

        // Generate based on category
        const category = this.options.equipmentCategory || 'Common Engineering';

        // Main shape based on category
        let mainShape;

        switch(category) {
            case 'Measuring Instruments':
                mainShape = this.createMeasuringInstrument(color, color2);
                break;
            case 'Electrical & Electronic':
                mainShape = this.createElectronicDevice(color, color2);
                break;
            case 'Mechanical Workshop':
                mainShape = this.createMechanicalPart(color, color2);
                break;
            case 'Civil & Surveying':
                mainShape = this.createCivilStructure(color, color2);
                break;
            case 'Computer & IT':
                mainShape = this.createComputerDevice(color, color2);
                break;
            case 'Power Systems':
                mainShape = this.createPowerDevice(color, color2);
                break;
            case 'Communication':
                mainShape = this.createCommunicationDevice(color, color2);
                break;
            case 'Hand Tools':
                mainShape = this.createHandTool(color, color2);
                break;
            default:
                mainShape = this.createGenericDevice(color, color2);
        }

        group.add(mainShape);

        // Add glowing ring around base
        const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: colorHex,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = -1.2;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);

        // Add second ring
        const ring2Geo = new THREE.TorusGeometry(2.2, 0.02, 16, 64);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0x7b2ffc,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.position.y = -1.3;
        ring2.rotation.x = Math.PI / 2;
        group.add(ring2);

        // Apply holographic material to all meshes
        group.traverse((child) => {
            if (child.isMesh) {
                this.applyHoloMaterial(child, colorHex);
            }
        });

        // Add glow outline
        this.addGlowOutline(group);

        // Scale and center
        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        group.scale.multiplyScalar(scale);
        group.position.sub(center.multiplyScalar(scale));

        this.model = group;
        this.scene.add(group);
        this.isLoading = false;
        this.onModelLoaded();
    }

    // ============================================================
    // CATEGORY-BASED 3D SHAPE GENERATORS
    // ============================================================

    // 1. MEASURING INSTRUMENTS - Ruler/Scale shape
    createMeasuringInstrument(color, color2) {
        const group = new THREE.Group();

        // Main body - long rectangle
        const bodyGeo = new THREE.BoxGeometry(0.3, 0.05, 2.5);
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.6 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        // Markings (small lines)
        for (let i = -1.1; i <= 1.1; i += 0.15) {
            const markGeo = new THREE.BoxGeometry(0.01, 0.02, 0.02);
            const markMat = new THREE.MeshBasicMaterial({ color: color2 });
            const mark = new THREE.Mesh(markGeo, markMat);
            mark.position.set(0, 0.05, i);
            group.add(mark);
        }

        return group;
    }

    // 2. ELECTRICAL & ELECTRONIC - Circuit board shape
    createElectronicDevice(color, color2) {
        const group = new THREE.Group();

        // Base board
        const boardGeo = new THREE.BoxGeometry(2, 0.08, 1.8);
        const boardMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.5 });
        const board = new THREE.Mesh(boardGeo, boardMat);
        group.add(board);

        // Components (small cubes)
        const positions = [
            [-0.6, 0.06, -0.5], [0.6, 0.06, -0.5],
            [-0.4, 0.06, 0.5], [0.4, 0.06, 0.5],
            [-0.8, 0.06, 0], [0.8, 0.06, 0],
            [0, 0.06, -0.7], [0, 0.06, 0.7]
        ];
        positions.forEach(pos => {
            const compGeo = new THREE.BoxGeometry(0.15, 0.08, 0.15);
            const compMat = new THREE.MeshStandardMaterial({ color: color2, transparent: true, opacity: 0.7 });
            const comp = new THREE.Mesh(compGeo, compMat);
            comp.position.set(pos[0], pos[1], pos[2]);
            group.add(comp);
        });

        return group;
    }

    // 3. MECHANICAL WORKSHOP - Gear shape
    createMechanicalPart(color, color2) {
        const group = new THREE.Group();

        // Main gear (cylinder with teeth)
        const gearGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 8);
        const gearMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.6 });
        const gear = new THREE.Mesh(gearGeo, gearMat);
        group.add(gear);

        // Teeth (small cylinders around)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const toothGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 6);
            const toothMat = new THREE.MeshStandardMaterial({ color: color2, transparent: true, opacity: 0.7 });
            const tooth = new THREE.Mesh(toothGeo, toothMat);
            tooth.position.set(Math.cos(angle) * 1.3, 0, Math.sin(angle) * 1.3);
            tooth.rotation.x = Math.PI / 2;
            tooth.rotation.z = angle;
            group.add(tooth);
        }

        // Center hole
        const holeGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.35, 16);
        const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const hole = new THREE.Mesh(holeGeo, holeMat);
        group.add(hole);

        return group;
    }

    // 4. CIVIL & SURVEYING - Building/structure shape
    createCivilStructure(color, color2) {
        const group = new THREE.Group();

        // Building base
        const baseGeo = new THREE.BoxGeometry(1.8, 0.1, 1.8);
        const baseMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.5 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        group.add(base);

        // Building body
        const bodyGeo = new THREE.BoxGeometry(1.4, 1.2, 1.4);
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.4 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.6;
        group.add(body);

        // Windows (small squares)
        for (let i = -0.4; i <= 0.4; i += 0.4) {
            for (let j = 0.2; j <= 1.0; j += 0.4) {
                const winGeo = new THREE.BoxGeometry(0.1, 0.15, 0.02);
                const winMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.5 });
                const win = new THREE.Mesh(winGeo, winMat);
                win.position.set(i, j, 0.72);
                group.add(win);
                const win2 = new THREE.Mesh(winGeo, winMat);
                win2.position.set(i, j, -0.72);
                group.add(win2);
                const win3 = new THREE.Mesh(winGeo, winMat);
                win3.position.set(0.72, j, i);
                win3.rotation.y = Math.PI / 2;
                group.add(win3);
                const win4 = new THREE.Mesh(winGeo, winMat);
                win4.position.set(-0.72, j, i);
                win4.rotation.y = Math.PI / 2;
                group.add(win4);
            }
        }

        return group;
    }

    // 5. COMPUTER & IT - Computer chip shape
    createComputerDevice(color, color2) {
        const group = new THREE.Group();

        // Main chip
        const chipGeo = new THREE.BoxGeometry(2, 0.1, 2);
        const chipMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.6 });
        const chip = new THREE.Mesh(chipGeo, chipMat);
        group.add(chip);

        // Pins (small lines around)
        for (let i = -0.8; i <= 0.8; i += 0.2) {
            const pinGeo = new THREE.BoxGeometry(0.02, 0.05, 0.3);
            const pinMat = new THREE.MeshBasicMaterial({ color: color2 });
            const pin = new THREE.Mesh(pinGeo, pinMat);
            pin.position.set(i, -0.08, 1.2);
            group.add(pin);
            const pin2 = new THREE.Mesh(pinGeo, pinMat);
            pin2.position.set(i, -0.08, -1.2);
            group.add(pin2);
            const pin3 = new THREE.Mesh(pinGeo, pinMat);
            pin3.position.set(1.2, -0.08, i);
            pin3.rotation.y = Math.PI / 2;
            group.add(pin3);
            const pin4 = new THREE.Mesh(pinGeo, pinMat);
            pin4.position.set(-1.2, -0.08, i);
            pin4.rotation.y = Math.PI / 2;
            group.add(pin4);
        }

        return group;
    }

    // 6. POWER SYSTEMS - Lightning bolt shape
    createPowerDevice(color, color2) {
        const group = new THREE.Group();

        // Lightning bolt using cylinder segments
        const points = [
            [0, 1.2, 0],
            [0.1, 0.6, 0],
            [-0.1, 0.2, 0],
            [0.1, -0.2, 0],
            [-0.05, -0.6, 0],
            [0, -1.2, 0]
        ];

        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p[0], p[1], p[2]))
        );

        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            emissive: color,
            emissiveIntensity: 0.2
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        group.add(tube);

        // Glow particles around
        for (let i = 0; i < 20; i++) {
            const pGeo = new THREE.SphereGeometry(0.03, 6, 6);
            const pMat = new THREE.MeshBasicMaterial({ color: color2, transparent: true, opacity: 0.5 });
            const p = new THREE.Mesh(pGeo, pMat);
            const t = i / 20;
            const pos = curve.getPoint(t);
            p.position.copy(pos);
            p.position.x += (Math.random() - 0.5) * 0.3;
            p.position.z += (Math.random() - 0.5) * 0.3;
            group.add(p);
        }

        return group;
    }

    // 7. COMMUNICATION - Antenna/signal shape
    createCommunicationDevice(color, color2) {
        const group = new THREE.Group();

        // Base
        const baseGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.2, 16);
        const baseMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.6 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = -0.8;
        group.add(base);

        // Main pole
        const poleGeo = new THREE.CylinderGeometry(0.05, 0.07, 1.8, 8);
        const poleMat = new THREE.MeshStandardMaterial({ color: color2, transparent: true, opacity: 0.7 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = 0.2;
        group.add(pole);

        // Signal waves (rings)
        for (let i = 0; i < 3; i++) {
            const ringGeo = new THREE.TorusGeometry(0.2 + i * 0.15, 0.01, 8, 16);
            const ringMat = new THREE.MeshBasicMaterial({
                color: i === 0 ? color : color2,
                transparent: true,
                opacity: 0.3 - i * 0.05,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = 0.8 + i * 0.3;
            ring.rotation.x = Math.PI / 2;
            group.add(ring);
        }

        // Top antenna
        const topGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const topMat = new THREE.MeshBasicMaterial({
            color: 0xff2d95,
            transparent: true,
            opacity: 0.8,
            emissive: 0xff2d95,
            emissiveIntensity: 0.3
        });
        const top = new THREE.Mesh(topGeo, topMat);
        top.position.y = 1.2;
        group.add(top);

        return group;
    }

    // 8. HAND TOOLS - Wrench/hammer shape
    createHandTool(color, color2) {
        const group = new THREE.Group();

        // Handle
        const handleGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.6, 8);
        const handleMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.6 });
        const handle = new THREE.Mesh(handleGeo, handleMat);
        handle.rotation.z = Math.PI / 2;
        group.add(handle);

        // Head (circle with opening)
        const headGeo = new THREE.TorusGeometry(0.3, 0.06, 8, 16);
        const headMat = new THREE.MeshStandardMaterial({ color: color2, transparent: true, opacity: 0.7 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.x = 0.9;
        group.add(head);

        // Head opening
        const openGeo = new THREE.CircleGeometry(0.12, 16);
        const openMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
        const open = new THREE.Mesh(openGeo, openMat);
        open.position.x = 0.9;
        open.rotation.y = Math.PI / 2;
        group.add(open);

        return group;
    }

    // 9. GENERIC DEVICE - Cube with details
    createGenericDevice(color, color2) {
        const group = new THREE.Group();

        // Main cube
        const cubeGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const cubeMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.5 });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(cube);

        // Inner cube
        const innerGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        const innerMat = new THREE.MeshStandardMaterial({ color: color2, transparent: true, opacity: 0.3 });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        group.add(inner);

        // Corner details
        for (let x of [-0.8, 0.8]) {
            for (let y of [-0.8, 0.8]) {
                for (let z of [-0.8, 0.8]) {
                    const dotGeo = new THREE.SphereGeometry(0.05, 6, 6);
                    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.5 });
                    const dot = new THREE.Mesh(dotGeo, dotMat);
                    dot.position.set(x, y, z);
                    group.add(dot);
                }
            }
        }

        return group;
    }

    // ============================================================
    // HOLOGRAPHIC MATERIAL APPLIER
    // ============================================================
    applyHoloMaterial(mesh, colorHex) {
        const color = new THREE.Color(colorHex);
        const color2 = new THREE.Color(colorHex).offsetHSL(0.1, 0.2, 0.2);

        const holoMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: color },
                uColor2: { value: color2 },
                uGlow: { value: 0.3 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uTime;
                uniform float uGlow;

                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;

                void main() {
                    float mixVal = vUv.y * 0.8 + 0.2;
                    vec3 baseColor = mix(uColor1, uColor2, mixVal);

                    vec3 viewDir = normalize(-vPosition);
                    float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
                    float glow = pow(fresnel, 2.0) * uGlow * 2.0;

                    float holo = sin(vUv.x * 50.0 + uTime) * 0.3 + 0.7;
                    holo *= sin(vUv.y * 30.0 + uTime * 0.7) * 0.3 + 0.7;

                    vec3 color = baseColor * (0.5 + holo * 0.5);
                    color += baseColor * glow;

                    float alpha = 0.6 + glow * 0.4;

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: true,
            side: THREE.DoubleSide,
            blending: THREE.NormalBlending
        });

        mesh.material = holoMaterial;
    }

    // ============================================================
    // ADD GLOW OUTLINE
    // ============================================================
    addGlowOutline(object) {
        object.traverse((child) => {
            if (child.isMesh) {
                const edges = new THREE.EdgesGeometry(child.geometry);
                const material = new THREE.LineBasicMaterial({
                    color: 0x00f5ff,
                    transparent: true,
                    opacity: 0.2,
                    blending: THREE.AdditiveBlending
                });
                const wireframe = new THREE.LineSegments(edges, material);
                wireframe.position.copy(child.position);
                wireframe.rotation.copy(child.rotation);
                wireframe.scale.copy(child.scale);
                child.parent.add(wireframe);
            }
        });
    }

    // ============================================================
    // LIGHTS
    // ============================================================
    addLights() {
        const ambient = new THREE.AmbientLight(0x222244, 0.5);
        this.scene.add(ambient);

        const light1 = new THREE.DirectionalLight(0x00f5ff, 2);
        light1.position.set(5, 10, 7);
        light1.castShadow = true;
        this.scene.add(light1);

        const light2 = new THREE.DirectionalLight(0x7b2ffc, 1.5);
        light2.position.set(-5, 3, -5);
        this.scene.add(light2);

        const hemi = new THREE.HemisphereLight(0x00f5ff, 0x7b2ffc, 0.6);
        this.scene.add(hemi);
    }

    // ============================================================
    // ENVIRONMENT
    // ============================================================
    addEnvironment() {
        const gridHelper = new THREE.GridHelper(10, 20, 0x00f5ff, 0x7b2ffc);
        gridHelper.position.y = -1.5;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.2;
        this.scene.add(gridHelper);

        const ringGeo = new THREE.RingGeometry(1.8, 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = -1.4;
        ring.rotation.x = -Math.PI / 2;
        this.scene.add(ring);
    }

    // ============================================================
    // PARTICLES
    // ============================================================
    addParticles() {
        const count = 100;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 2 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 2;
            positions[i * 3] = Math.sin(theta) * Math.cos(phi) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * radius * 0.5;
            positions[i * 3 + 2] = Math.cos(theta) * radius;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            size: 0.03,
            transparent: true,
            opacity: 0.4,
            color: 0x00f5ff,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        const particles = new THREE.Points(geometry, material);
        particles.name = 'particles';
        this.scene.add(particles);
    }

    // ============================================================
    // CONTROLS
    // ============================================================
    setupControls() {
        const container = this.container;
        let isDragging = false;
        let previousMouse = { x: 0, y: 0 };
        let touchStart = { x: 0, y: 0 };

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMouse.x = e.clientX;
            previousMouse.y = e.clientY;
            this.options.autoRotate = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging && this.model) {
                const deltaX = e.clientX - previousMouse.x;
                const deltaY = e.clientY - previousMouse.y;
                this.model.rotation.y += deltaX * 0.01;
                this.model.rotation.x += deltaY * 0.01;
                previousMouse.x = e.clientX;
                previousMouse.y = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            setTimeout(() => { this.options.autoRotate = true; }, 3000);
        });

        container.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStart.x = touch.clientX;
            touchStart.y = touch.clientY;
            isDragging = true;
            this.options.autoRotate = false;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (isDragging && this.model) {
                const touch = e.touches[0];
                const deltaX = touch.clientX - touchStart.x;
                const deltaY = touch.clientY - touchStart.y;
                this.model.rotation.y += deltaX * 0.01;
                this.model.rotation.x += deltaY * 0.01;
                touchStart.x = touch.clientX;
                touchStart.y = touch.clientY;
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            isDragging = false;
            setTimeout(() => { this.options.autoRotate = true; }, 3000);
        }, { passive: true });

        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY * 0.01;
            const pos = this.camera.position;
            const distance = pos.length();
            const newDistance = Math.max(2, Math.min(10, distance + delta));
            pos.normalize().multiplyScalar(newDistance);
        }, { passive: false });
    }

    // ============================================================
    // EVENTS
    // ============================================================
    setupEvents() {
        const container = this.container;
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth || 500;
            const height = container.clientHeight || 400;
            if (this.camera) {
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
            }
            if (this.renderer) {
                this.renderer.setSize(width, height);
            }
        });
        resizeObserver.observe(container);
    }

    // ============================================================
    // SHOW CONTROLS
    // ============================================================
    showControls() {
        const container = this.container;
        const controls = document.createElement('div');
        controls.className = 'holo-controls';
        controls.innerHTML = `
            <i class="fas fa-arrows-alt"></i> Drag
            <i class="fas fa-mouse-pointer"></i> Zoom
            <span class="holo-status">✦ Hologram</span>
        `;
        container.appendChild(controls);
    }

    // ============================================================
    // ANIMATION LOOP
    // ============================================================
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.options.autoRotate && this.model) {
            this.model.rotation.y += this.options.rotateSpeed;
        }

        const particles = this.scene.getObjectByName('particles');
        if (particles) {
            particles.rotation.y += 0.001;
        }

        if (this.model) {
            this.model.traverse((child) => {
                if (child.isMesh && child.material.uniforms) {
                    child.material.uniforms.uTime.value += 0.01;
                }
            });
        }

        this.renderer.render(this.scene, this.camera);
    }

    // ============================================================
    // CALLBACKS
    // ============================================================
    onModelLoaded() {
        console.log('✅ Holographic model loaded:', this.options.equipmentName);
    }

    // ============================================================
    // DESTROY
    // ============================================================
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ============================================================
// EXPORT
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HologramViewer;
} else {
    window.HologramViewer = HologramViewer;
}