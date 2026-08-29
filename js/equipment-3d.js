// ============================================================
// HOLOGRAPHIC 3D EQUIPMENT VIEWER
// ============================================================

class EquipmentViewer {
    constructor(container, modelUrl) {
        this.container = container;
        this.modelUrl = modelUrl;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.animationId = null;
        this.autoRotate = true;
        this.isDragging = false;
        this.previousMouse = { x: 0, y: 0 };

        // Colors
        this.holoColor = '#00f5ff';
        this.holoColor2 = '#7b2ffc';
        this.bgColor = '#0a0a1a';

        // Initialize
        this.init();
    }

    // ============================================================
    // INIT THREE.JS
    // ============================================================
    init() {
        const container = this.container;
        const width = container.clientWidth;
        const height = container.clientHeight || 400;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.bgColor);

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(4, 3, 6);
        this.camera.lookAt(0, 0, 0);

        // Renderer
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

        // Lights
        this.addLights();

        // Ground grid (holographic effect)
        this.addGrid();

        // Particles (floating dots)
        this.addParticles();

        // Load model
        if (this.modelUrl) {
            this.loadModel(this.modelUrl);
        }

        // Controls (mouse)
        this.addControls();

        // Resize
        this.addResize();

        // Start animation
        this.animate();
    }

    // ============================================================
    // ADD LIGHTS
    // ============================================================
    addLights() {
        // Ambient light (dim)
        const ambient = new THREE.AmbientLight(0x222244, 0.5);
        this.scene.add(ambient);

        // Main light - blue glow
        const light1 = new THREE.DirectionalLight(0x00f5ff, 2);
        light1.position.set(5, 10, 7);
        light1.castShadow = true;
        this.scene.add(light1);

        // Secondary light - purple glow
        const light2 = new THREE.DirectionalLight(0x7b2ffc, 1.5);
        light2.position.set(-5, 3, -5);
        this.scene.add(light2);

        // Back light - pink glow
        const light3 = new THREE.DirectionalLight(0xff2d95, 0.8);
        light3.position.set(0, -3, -8);
        this.scene.add(light3);

        // Hemisphere light
        const hemi = new THREE.HemisphereLight(0x00f5ff, 0x7b2ffc, 0.6);
        this.scene.add(hemi);

        // Point lights for glow
        const p1 = new THREE.PointLight(0x00f5ff, 0.5, 20);
        p1.position.set(3, 3, 3);
        this.scene.add(p1);

        const p2 = new THREE.PointLight(0x7b2ffc, 0.5, 20);
        p2.position.set(-3, 2, -3);
        this.scene.add(p2);
    }

    // ============================================================
    // ADD HOLOGRAPHIC GRID
    // ============================================================
    addGrid() {
        // Main grid
        const gridHelper = new THREE.GridHelper(10, 20, 0x00f5ff, 0x7b2ffc);
        gridHelper.position.y = -1.5;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.3;
        this.scene.add(gridHelper);

        // Secondary grid (rotated)
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

        // Glow ring 2
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
    // ADD PARTICLES
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
    // LOAD 3D MODEL
    // ============================================================
    loadModel(url) {
        const loader = new THREE.GLTFLoader();

        // Show loading
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'model-loading';
        loadingDiv.innerHTML = `
            <div class="loader">
                <div class="loader-ring"></div>
                <p>Loading hologram...</p>
            </div>
        `;
        this.container.appendChild(loadingDiv);

        loader.load(
            url,
            (gltf) => {
                // Remove loading
                if (loadingDiv) loadingDiv.remove();

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

                // Trigger animation
                this.onModelLoaded();
            },
            (xhr) => {
                const progress = Math.round((xhr.loaded / xhr.total) * 100);
                if (loadingDiv) {
                    loadingDiv.querySelector('p').textContent = `Loading hologram... ${progress}%`;
                }
            },
            (error) => {
                if (loadingDiv) loadingDiv.remove();
                console.error('Error loading model:', error);
                this.showFallback();
            }
        );
    }

    // ============================================================
    // APPLY HOLOGRAPHIC MATERIAL
    // ============================================================
    applyHoloMaterial(object) {
        object.traverse((child) => {
            if (child.isMesh) {
                const originalMaterial = child.material;

                // Create holographic material
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
                            // Base color with gradient
                            float mixVal = vUv.y * 0.8 + 0.2;
                            vec3 baseColor = mix(uColor1, uColor2, mixVal);

                            // Scanline effect
                            float scanline = sin(vUv.y * 200.0 + uTime * 2.0) * 0.5 + 0.5;
                            scanline = step(0.95, scanline) * 0.5;

                            // Fresnel glow (edges glow more)
                            vec3 viewDir = normalize(-vPosition);
                            float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
                            float glow = pow(fresnel, 2.0) * uGlow * 2.0;

                            // Holographic interference pattern
                            float holo = sin(vUv.x * 50.0 + uTime) * 0.3 + 0.7;
                            holo *= sin(vUv.y * 30.0 + uTime * 0.7) * 0.3 + 0.7;

                            // Combine
                            vec3 color = baseColor * (0.5 + holo * 0.5);
                            color += vec3(0.5, 0.7, 1.0) * scanline;
                            color += baseColor * glow;

                            // Alpha with fresnel
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
    // ADD GLOW OUTLINE
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
    // CONTROLS
    // ============================================================
    addControls() {
        const container = this.container;

        // Mouse drag
        container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMouse.x = e.clientX;
            this.previousMouse.y = e.clientY;
            this.autoRotate = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isDragging && this.model) {
                const deltaX = e.clientX - this.previousMouse.x;
                const deltaY = e.clientY - this.previousMouse.y;
                this.model.rotation.y += deltaX * 0.01;
                this.model.rotation.x += deltaY * 0.01;
                this.previousMouse.x = e.clientX;
                this.previousMouse.y = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            setTimeout(() => { this.autoRotate = true; }, 3000);
        });

        // Touch
        let touchStart = { x: 0, y: 0 };
        container.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStart.x = touch.clientX;
            touchStart.y = touch.clientY;
            this.isDragging = true;
            this.autoRotate = false;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (this.isDragging && this.model) {
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
            this.isDragging = false;
            setTimeout(() => { this.autoRotate = true; }, 3000);
        }, { passive: true });

        // Zoom
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
    // RESIZE
    // ============================================================
    addResize() {
        const container = this.container;
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth;
            const height = container.clientHeight || 400;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
        resizeObserver.observe(container);
    }

    // ============================================================
    // ANIMATION LOOP
    // ============================================================
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Auto rotate
        if (this.autoRotate && this.model) {
            this.model.rotation.y += 0.005;
        }

        // Update particle animation
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
    // FALLBACK (if model fails to load)
    // ============================================================
    showFallback() {
        const container = this.container;
        container.innerHTML = `
            <div class="model-fallback" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 400px;
                background: rgba(10,10,26,0.5);
                border: 1px dashed rgba(0,212,255,0.3);
                border-radius: 16px;
                color: var(--gray-400);
                font-family: inherit;
            ">
                <i class="fas fa-cube" style="font-size: 4rem; color: var(--cyan-400); margin-bottom: 15px;"></i>
                <h3 style="color: var(--white); margin-bottom: 5px;">3D Model Not Available</h3>
                <p>Holographic view coming soon for this equipment.</p>
            </div>
        `;
    }

    onModelLoaded() {
        console.log('✅ Holographic model loaded!');
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
    module.exports = EquipmentViewer;
} else {
    window.EquipmentViewer = EquipmentViewer;
}