import { useEffect, useRef } from "react";
import * as THREE from "three";

const ORANGE      = 0xFF6B00;
const ORANGE_DIM  = 0x7A2E00;
const NODE_COUNT  = 90;
const LINE_DIST   = 5.5;
const CAM_RADIUS  = 18;

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 45 : NODE_COUNT;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, CAM_RADIUS);

    // ── Nodes (Points) ────────────────────────────────────────────────
    const nodePositions = new Float32Array(nodeCount * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 12;
      nodePositions[i * 3]     = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.006,
      ));
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: ORANGE,
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    scene.add(points);

    // ── Lines ─────────────────────────────────────────────────────────
    // Pre-build lines array; rebuild each frame only when affordable
    const buildLines = () => {
      const verts: number[] = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodePositions[i*3]   - nodePositions[j*3];
          const dy = nodePositions[i*3+1] - nodePositions[j*3+1];
          const dz = nodePositions[i*3+2] - nodePositions[j*3+2];
          const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (d < LINE_DIST) {
            verts.push(
              nodePositions[i*3], nodePositions[i*3+1], nodePositions[i*3+2],
              nodePositions[j*3], nodePositions[j*3+1], nodePositions[j*3+2],
            );
          }
        }
      }
      return new Float32Array(verts);
    };

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(buildLines(), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: ORANGE_DIM,
      transparent: true,
      opacity: 0.22,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Floating wireframe accents ────────────────────────────────────
    const accentMat = new THREE.MeshBasicMaterial({
      color: ORANGE_DIM,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    type Accent = { mesh: THREE.Mesh; rx: number; ry: number; oy: number; phase: number };
    const accents: Accent[] = [];
    if (!isMobile) {
      const geos = [
        new THREE.OctahedronGeometry(0.5),
        new THREE.IcosahedronGeometry(0.4, 0),
        new THREE.TetrahedronGeometry(0.5),
        new THREE.OctahedronGeometry(0.35),
        new THREE.IcosahedronGeometry(0.55, 0),
        new THREE.TetrahedronGeometry(0.38),
      ];
      geos.forEach((geo, i) => {
        const mesh = new THREE.Mesh(geo, accentMat);
        mesh.position.set(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 10,
          -4 - Math.random() * 5
        );
        scene.add(mesh);
        accents.push({
          mesh,
          rx: (Math.random() - 0.5) * 0.5,
          ry: (Math.random() - 0.5) * 0.5,
          oy: mesh.position.y,
          phase: i * 1.1,
        });
      });
    }

    // ── Mouse parallax ────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Animation loop ────────────────────────────────────────────────
    let frame = 0;
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      frame++;

      // Drift nodes
      for (let i = 0; i < nodeCount; i++) {
        nodePositions[i*3]     += velocities[i].x;
        nodePositions[i*3 + 1] += velocities[i].y;
        nodePositions[i*3 + 2] += velocities[i].z;
        if (Math.abs(nodePositions[i*3])     > 14) velocities[i].x *= -1;
        if (Math.abs(nodePositions[i*3 + 1]) >  8) velocities[i].y *= -1;
        if (Math.abs(nodePositions[i*3 + 2]) >  6) velocities[i].z *= -1;
      }
      (nodeGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Rebuild lines every 3 frames (performance balance)
      if (frame % 3 === 0) {
        const verts = buildLines();
        const attr  = lineGeo.attributes.position as THREE.BufferAttribute;
        if (attr.array.length === verts.length) {
          attr.set(verts);
          attr.needsUpdate = true;
        } else {
          lineGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
        }
      }

      // Animate accents
      accents.forEach((a) => {
        a.mesh.rotation.x = t * a.rx;
        a.mesh.rotation.y = t * a.ry;
        a.mesh.position.y = a.oy + Math.sin(t * 0.5 + a.phase) * 0.5;
      });

      // Slow orbit + mouse tilt
      const angle = t * 0.04;
      camera.position.x = Math.sin(angle) * CAM_RADIUS * 0.15 + mouse.x * 1.2;
      camera.position.y = mouse.y * 0.7;
      camera.position.z = CAM_RADIUS;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      nodeGeo.dispose();
      lineGeo.dispose();
      nodeMat.dispose();
      lineMat.dispose();
      accentMat.dispose();
      accents.forEach((a) => a.mesh.geometry.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
