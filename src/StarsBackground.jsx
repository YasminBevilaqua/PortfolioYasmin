import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { AdditiveBlending } from 'three';

function StarField() {
  const pointsRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const pointCount = 5000;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const radius = 1.2;
    const random = (index, salt) => {
      const value = Math.sin(index * 127.1 + salt * 311.7 + 3467.381) * 43758.5453;
      return value - Math.floor(value);
    };
    const palette = [
      [0.78, 0.8, 0.9],
      [0.38, 0.19, 0.58],
      [0.62, 0.24, 0.45],
      [0.65, 0.36, 0.12],
    ];

    for (let i = 0; i < positions.length; i += 3) {
      const pointIndex = i / 3;
      const theta = 2 * Math.PI * random(pointIndex, 0);
      const phi = Math.acos(2 * random(pointIndex, 1) - 1);
      const r = radius * Math.cbrt(random(pointIndex, 2));
      const sinPhi = Math.sin(phi);

      positions[i] = r * sinPhi * Math.cos(theta);
      positions[i + 1] = r * sinPhi * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      const color = random(pointIndex, 3) < 0.1
        ? palette[0]
        : palette[1 + Math.floor(random(pointIndex, 4) * 3)];
      colors[i] = color[0];
      colors[i + 1] = color[1];
      colors[i + 2] = color[2];
    }

    return { positions, colors };
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10;
      pointsRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={pointsRef}
        stride={3}
        positions={positions}
        colors={colors}
        frustumCulled
      >
        <PointMaterial
          transparent
          vertexColors
          size={0.0035}
          opacity={0.5}
          blending={AdditiveBlending}
          toneMapped={false}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsBackground({ style }) {
  return (
    <div className="stars-bg" style={style} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}
