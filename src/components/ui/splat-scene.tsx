"use client";

import { Suspense, useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

// Configuration - easily adjustable values
const POINT_CLOUD_CONFIG = {
  // File path (hosted on Cloud Storage for better performance)
  plyPath: "https://storage.googleapis.com/static-profile-file/hongming.ply",

  // Scale settings
  scale: {
    base: 3.0,
    min: 2.0,
    max: 4.0,
    viewportDivisor: 5,
  },

  // Position offset
  position: {
    x: 0,
    y: 0.5,
    z: 0,
  },

  // Cursor reveal settings
  cursor: {
    revealRadius: 1.2,
    lerpSpeed: 0.1,
  },

  // Scan line settings
  scan: {
    speed: 0.8,
    width: 0.3,
    min: -3.0,
    max: 3.0,
  },

  // Particle settings
  particle: {
    sizeBase: 0.5,
    sizeVariation: 0.5,
    pointSize: 1.0,
    sizeAttenuation: 50.0,
  },

  // Animation settings
  animation: {
    rotationSpeed: 0.05,
    wobbleSpeed: 5.0,
    wobbleIntensity: 0.01,
  },

  // Visual effects
  effects: {
    glowColor: { r: 0.0, g: 0.4, b: 0.4 },
    glowThresholdMin: 0.1,
    glowThresholdMax: 0.8,
  },

  // Camera settings
  camera: {
    position: [0, 0, 3] as [number, number, number],
    fov: 50,
  },
} as const;

// Shader code separated for maintainability
const VERTEX_SHADER = `
  attribute float aSize;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uRevealRadius;
  uniform float uPointSize;
  uniform float uIsActive;
  uniform float uScanPosition;
  uniform float uScanWidth;
  uniform float uSizeAttenuation;
  uniform float uWobbleSpeed;
  uniform float uWobbleIntensity;

  void main() {
    vColor = aColor;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);

    // Left-to-right scan line (always active)
    float distFromScan = abs(worldPos.x - uScanPosition);
    float scanReveal = 1.0 - smoothstep(0.0, uScanWidth, distFromScan);

    // Mouse-based reveal when cursor is active
    float mouseReveal = 0.0;
    if (uIsActive > 0.5) {
      float distToMouse = distance(worldPos.xyz, uMouse);
      mouseReveal = 1.0 - smoothstep(0.0, uRevealRadius, distToMouse);
    }

    // Combine both effects - use max so either can reveal
    float reveal = max(scanReveal, mouseReveal);

    vAlpha = reveal;
    float scale = reveal;

    vec3 pos = position;
    if (reveal > 0.0 && reveal < 1.0) {
      float wobble = sin(uTime * uWobbleSpeed + position.x * 10.0) * uWobbleIntensity * reveal;
      pos += vec3(wobble, wobble, wobble);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * uPointSize * scale * (uSizeAttenuation / -mvPosition.z);
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  uniform vec3 uGlowColor;
  uniform float uGlowThresholdMin;
  uniform float uGlowThresholdMax;

  void main() {
    if (vAlpha < 0.01) discard;

    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;

    vec3 color = vColor;
    if (vAlpha < uGlowThresholdMax && vAlpha > uGlowThresholdMin) {
      color = mix(vColor + uGlowColor, vColor, vAlpha);
    }

    gl_FragColor = vec4(color, alpha);
  }
`;

interface PointCloudProps {
  mousePosition: { x: number; y: number };
  isActive: boolean;
  onLoad?: () => void;
}

function PointCloud({ mousePosition, isActive, onLoad }: PointCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const { camera, size, viewport } = useThree();

  const config = POINT_CLOUD_CONFIG;

  // Calculate responsive scale based on viewport
  const responsiveScale = useMemo(() => {
    const scaleFactor = Math.min(viewport.width, viewport.height) / config.scale.viewportDivisor;
    return Math.max(config.scale.min, Math.min(config.scale.max, config.scale.base * scaleFactor));
  }, [viewport.width, viewport.height, config.scale]);

  // Load PLY file
  const geometry = useLoader(PLYLoader, config.plyPath);

  // Notify parent when loaded
  useEffect(() => {
    if (geometry && onLoad) {
      onLoad();
    }
  }, [geometry, onLoad]);

  // Create custom attributes for animation
  const { positions, colors, sizes } = useMemo(() => {
    const posAttr = geometry.getAttribute("position");
    const colorAttr = geometry.getAttribute("color");

    const count = posAttr.count;
    const positions = new Float32Array(posAttr.array);
    const colors = colorAttr
      ? new Float32Array(colorAttr.array)
      : new Float32Array(count * 3).fill(1);

    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      sizes[i] = config.particle.sizeBase + Math.random() * config.particle.sizeVariation;
    }

    return { positions, colors, sizes };
  }, [geometry, config.particle]);

  // Custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uRevealRadius: { value: config.cursor.revealRadius },
        uPointSize: { value: config.particle.pointSize },
        uIsActive: { value: 0.0 },
        uScanPosition: { value: config.scan.min },
        uScanWidth: { value: config.scan.width },
        uSizeAttenuation: { value: config.particle.sizeAttenuation },
        uWobbleSpeed: { value: config.animation.wobbleSpeed },
        uWobbleIntensity: { value: config.animation.wobbleIntensity },
        uGlowColor: { value: new THREE.Vector3(config.effects.glowColor.r, config.effects.glowColor.g, config.effects.glowColor.b) },
        uGlowThresholdMin: { value: config.effects.glowThresholdMin },
        uGlowThresholdMax: { value: config.effects.glowThresholdMax },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [config]);

  // Build geometry with custom attributes
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  // Convert screen position to world position
  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const mouse = new THREE.Vector3(
      (screenX / size.width) * 2 - 1,
      -(screenY / size.height) * 2 + 1,
      0.5
    );
    mouse.unproject(camera);

    const dir = mouse.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(distance));
  }, [camera, size]);

  useFrame((state, delta) => {
    const uniforms = shaderMaterial.uniforms;

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uIsActive.value = isActive ? 1.0 : 0.0;

    // Animate scan line left to right
    let scanPos = uniforms.uScanPosition.value + delta * config.scan.speed;
    if (scanPos > config.scan.max) {
      scanPos = config.scan.min;
    }
    uniforms.uScanPosition.value = scanPos;

    // Update mouse position when active
    if (isActive) {
      const worldMouse = screenToWorld(mousePosition.x, mousePosition.y);
      mouseRef.current.lerp(worldMouse, config.cursor.lerpSpeed);
      uniforms.uMouse.value.copy(mouseRef.current);
    }

    // Rotate point cloud
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * config.animation.rotationSpeed;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={pointsGeometry}
      material={shaderMaterial}
      scale={responsiveScale}
      rotation={[Math.PI, 0, 0]}
      position={[config.position.x, config.position.y, config.position.z]}
    />
  );
}

export interface SplatSceneProps {
  mousePosition: { x: number; y: number };
  isActive: boolean;
  onLoad?: () => void;
}

export function SplatScene({ mousePosition, isActive, onLoad }: SplatSceneProps) {
  const config = POINT_CLOUD_CONFIG;

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
      camera={{ position: config.camera.position, fov: config.camera.fov }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <PointCloud mousePosition={mousePosition} isActive={isActive} onLoad={onLoad} />
      </Suspense>
    </Canvas>
  );
}
