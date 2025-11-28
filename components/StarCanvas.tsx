'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

const StarBackground = (props: Record<string, unknown>) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState<Float32Array>(
    () => random.inSphere(new Float32Array(5000), { radius: 1.2 }) as Float32Array
  );

  const { theme } = useTheme();

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const pointColor = theme === 'dark' ? '#fff' : '#222';

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={pointColor}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <>
    <div className="fixed inset-0 z-0 h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
    <div className="fixed inset-0 z-[5] h-auto w-full rounded-md bg-gray-200 bg-opacity-10 bg-clip-padding backdrop-blur backdrop-filter dark:bg-gray-950 dark:bg-opacity-10 dark:backdrop-blur-xs"></div>
  </>
);

export default StarsCanvas;
