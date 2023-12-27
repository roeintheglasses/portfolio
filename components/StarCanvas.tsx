'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random';
import { useTheme } from 'next-themes';

const StarBackground = (props: any) => {
  const ref: any = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  const { theme, setTheme } = useTheme();

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
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
          dethWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <>
    <div className="w-full h-auto fixed inset-0 z-0 ">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
    <div className="w-full h-auto fixed inset-0 z-[5] bg-gray-200 dark:bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md dark:backdrop-blur-sm bg-opacity-10 dark:bg-opacity-5"></div>
  </>
);

export default StarsCanvas;
