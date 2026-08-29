// ============================================================
// HOLOGRAPHIC 3D EQUIPMENT VIEWER - COMPLETE ENGINE
// ============================================================

class HologramViewer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('❌ Container not found:', containerId);
            return;
        }

        // Default options
        this.options = {
            autoRotate: true,
            rotateSpeed: 0.005,
            backgroundColor: 0x0a0a1a,
            glowColor: 0x00f5ff,
            glowColor2: 0x7b2ffc,
            ...options
        };

        this.model = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.animationId = null;
        this.isLoading = true;

        this.init();
    }

    // ============================================================
    // INITIALIZE
    // ============================================================
    init() {
        const container = this.container;
        const width = container.clientWidth || 500;
        const height = container.clientHeight || 400;

        // --- Scene ---
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);

        // --- Camera ---
        const aspect = width / height;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(4, 3, 6);
        this.camera.lookAt(0, 0, 0);

        // --- Renderer ---
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        container.appendChild(this.renderer.domElement);

        // --- Controls ---
        this.setupControls();

        // --- Lights ---
        this.addLights();

        // --- Environment ---
        this.addEnvironment();

        // --- Particles ---
        this.addParticles();

        // --- Events ---
        this.setupEvents();

        // --- Load Model ---
        if (this.options.modelUrl) {
            this.loadModel(this.options.modelUrl);
        } else {
            this.showFallback('No model URL provided');
        }

        // --- Start Animation ---
        this.animate();
    }

    // ============================================================
    // CONTROLS
    // ============================================================
    setupControls() {
        const container = this.container;

        // Mouse drag to rotate
        let isDragging = false;
        let previousMouse = { x: 0, y: 0 };

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

        // Touch support
        let touchStart = { x: 0, y: 0 };
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

        // Zoom with wheel
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
    // LIGHTS
    // ============================================================
    addLights() {
        // Ambient
        const ambient = new THREE.AmbientLight(0x222244, 0.5);
        this.scene.add(ambient);

        // Main - blue
        const light1 = new THREE.DirectionalLight(0x00f5ff, 2);
        light1.position.set(5, 10, 7);
        light1.castShadow = true;
        this.scene.add(light1);

        // Secondary - purple
        const light2 = new THREE.DirectionalLight(0x7b2ffc, 1.5);
        light2.position.set(-5, 3, -5);
        this.scene.add(light2);

        // Back - pink
        const light3 = new THREE.DirectionalLight(0xff2d95, 0.8);
        light3.position.set(0, -3, -8);
        this.scene.add(light3);

        // Hemisphere
        const hemi = new THREE.HemisphereLight(0x00f5ff, 0x7b2ffc, 0.6);
        this.scene.add(hemi);

        // Point lights
        const p1 = new THREE.PointLight(0x00f5ff, 0.5, 20);
        p1.position.set(3, 3, 3);
        this.scene.add(p1);

        const p2 = new THREE.PointLight(0x7b2ffc, 0.5, 20);
        p2.position.set(-3, 2, -3);
        this.scene.add(p2);
    }

    // ============================================================
    // ENVIRONMENT
    // ============================================================
    addEnvironment() {
        // Holographic grid
        const gridHelper = new THREE.GridHelper(10, 20, 0x00f5ff, 0x7b2ffc);
        gridHelper.position.y = -1.5;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.scene.add(gridHelper);

        // Secondary grid
        const grid2 = new THREE.GridHelper(8, 16, 0x7b2ffc, 0x00f5ff);
        grid2.position.y = -1.5;
        grid2.rotation.x = Math.PI / 6;
        grid2.material.transparent = true;
        grid2.material.opacity = 0.15;
        this.scene.add(grid2);

        // Glow ring
        const ringGeometry = new THREE.RingGeometry(1.8, 2.2, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.y = -1.4;
        ring.rotation.x = -Math.PI / 2;
        this.scene.add(ring);

        // Outer glow ring
        const ring2 = new THREE.RingGeometry(2.5, 2.9, 64);
        const ringMaterial2 = new THREE.MeshBasicMaterial({
            color: 0x7b2ffc,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const ring2Mesh = new THREE.Mesh(ring2, ringMaterial2);
        ring2Mesh.position.y = -1.4;
        ring2Mesh.rotation.x = -Math.PI / 2;
        this.scene.add(ring2Mesh);
    }

    // ============================================================
    // PARTICLES
    // ============================================================
    addParticles() {
        const count = 200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 3 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.sin(theta) * Math.cos(phi) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * radius * 0.5;
            positions[i * 3 + 2] = Math.cos(theta) * radius;

            const color = new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.5);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        particles.name = 'particles';
        this.scene.add(particles);
    }

    // ============================================================
    // LOAD MODEL
    // ============================================================
    loadModel(url) {
        this.showLoading();

        const loader = new THREE.GLTFLoader();

        loader.load(
            url,
            (gltf) => {
                this.hideLoading();
                this.model = gltf.scene;

                // Scale and center
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2.5 / maxDim;
                this.model.scale.multiplyScalar(scale);
                this.model.position.sub(center.multiplyScalar(scale));

                // Apply holographic material
                this.applyHoloMaterial(this.model);

                // Add glow outline
                this.addGlowOutline(this.model);

                this.scene.add(this.model);
                this.isLoading = false;
                this.onModelLoaded();
            },
            (xhr) => {
                const progress = Math.round((xhr.loaded / xhr.total) * 100);
                this.updateLoadingProgress(progress);
            },
            (error) => {
                this.hideLoading();
                console.error('❌ Model load error:', error);
                this.showFallback('Failed to load 3D model');
            }
        );
    }

    // ============================================================
    // HOLOGRAPHIC MATERIAL
    // ============================================================
    applyHoloMaterial(object) {
        object.traverse((child) => {
            if (child.isMesh) {
                const originalMaterial = child.material;

                const holoMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uColor1: { value: new THREE.Color(0x00f5ff) },
                        uColor2: { value: new THREE.Color(0x7b2ffc) },
                        uScanline: { value: 0.5 },
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
                        uniform float uScanline;
                        uniform float uGlow;

                        varying vec2 vUv;
                        varying vec3 vNormal;
                        varying vec3 vPosition;

                        void main() {
                            float mixVal = vUv.y * 0.8 + 0.2;
                            vec3 baseColor = mix(uColor1, uColor2, mixVal);

                            float scanline = sin(vUv.y * 200.0 + uTime * 2.0) * 0.5 + 0.5;
                            scanline = step(0.95, scanline) * 0.5;

                            vec3 viewDir = normalize(-vPosition);
                            float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
                            float glow = pow(fresnel, 2.0) * uGlow * 2.0;

                            float holo = sin(vUv.x * 50.0 + uTime) * 0.3 + 0.7;
                            holo *= sin(vUv.y * 30.0 + uTime * 0.7) * 0.3 + 0.7;

                            vec3 color = baseColor * (0.5 + holo * 0.5);
                            color += vec3(0.5, 0.7, 1.0) * scanline;
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

                child.material = holoMaterial;
                child.material.userData.original = originalMaterial;
            }
        });
    }

    // ============================================================
    // GLOW OUTLINE
    // ============================================================
    addGlowOutline(object) {
        object.traverse((child) => {
            if (child.isMesh) {
                const geometry = child.geometry;
                const edges = new THREE.EdgesGeometry(geometry);
                const material = new THREE.LineBasicMaterial({
                    color: 0x00f5ff,
                    transparent: true,
                    opacity: 0.3,
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
    // EVENTS
    // ============================================================
    setupEvents() {
        const container = this.container;

        // Resize
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
    // ANIMATION LOOP
    // ============================================================
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Auto rotate
        if (this.options.autoRotate && this.model) {
            this.model.rotation.y += this.options.rotateSpeed;
        }

        // Animate particles
        const particles = this.scene.getObjectByName('particles');
        if (particles) {
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
        }

        // Update hologram time uniform
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
    // LOADING UI
    // ============================================================
    showLoading() {
        this.container.innerHTML = `
            <div class="holo-loading" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:var(--darker-bg);">
                <div class="holo-spinner" style="width:50px;height:50px;border-radius:50%;border:3px solid var(--glass-border);border-top-color:var(--cyan-400);animation:spin 1s linear infinite;margin-bottom:15px;"></div>
                <p style="color:var(--gray-400);font-family:inherit;">Loading hologram...</p>
                <p class="holo-progress" style="color:var(--gray-500);font-size:0.85rem;font-family:inherit;">0%</p>
            </div>
            <style>
                @keyframes spin { 100% { transform:rotate(360deg); } }
            </style>
        `;
        this.isLoading = true;
    }

    updateLoadingProgress(progress) {
        const progressEl = this.container.querySelector('.holo-progress');
        if (progressEl) {
            progressEl.textContent = progress + '%';
        }
    }

    hideLoading() {
        this.isLoading = false;
        // Remove loading overlay but keep container
        const loadingEl = this.container.querySelector('.holo-loading');
        if (loadingEl) {
            loadingEl.remove();
        }
    }

    // ============================================================
    // FALLBACK
    // ============================================================
    showFallback(message) {
        this.container.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:var(--darker-bg);color:var(--gray-400);font-family:inherit;padding:20px;text-align:center;">
                <i class="fas fa-cube" style="font-size:3rem;color:var(--cyan-400);margin-bottom:15px;"></i>
                <h3 style="color:var(--white);margin-bottom:5px;">3D Hologram Unavailable</h3>
                <p>${message || 'Model not found for this equipment.'}</p>
                <p style="font-size:0.85rem;margin-top:8px;color:var(--gray-500);">✨ A holographic view will be added soon</p>
            </div>
        `;
    }

    // ============================================================
    // CALLBACKS
    // ============================================================
    onModelLoaded() {
        console.log('✅ Holographic model loaded successfully!');
        // Remove loading text
        const progressEl = this.container.querySelector('.holo-progress');
        if (progressEl) {
            progressEl.textContent = '✨ Ready';
            progressEl.style.color = '#22c55e';
        }
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