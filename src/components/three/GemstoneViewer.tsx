import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GemstoneViewerProps {
  stoneType: 'diamond' | 'emerald' | 'sapphire' | 'ruby';
}

const GemstoneModel = ({ stoneType }: { stoneType: 'diamond' | 'emerald' | 'sapphire' | 'ruby' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  const getGemstoneMaterial = () => {
    switch (stoneType) {
      case 'diamond':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#FFFFFF'),
          transmission: 0.96,
          roughness: 0.02,
          ior: 2.42,
          thickness: 1.2,
          specularIntensity: 1.5,
          specularColor: new THREE.Color('#D8F0FF'),
          clearcoat: 1.0,
        });
      case 'emerald':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0A442E'),
          transmission: 0.82,
          roughness: 0.06,
          ior: 2.14,
          thickness: 2.0,
          specularIntensity: 1.2,
          specularColor: new THREE.Color('#B6F4D8'),
        });
      case 'sapphire':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0B234F'),
          transmission: 0.8,
          roughness: 0.05,
          ior: 2.2,
          thickness: 1.8,
          specularIntensity: 1.3,
          specularColor: new THREE.Color('#8EB8F8'),
        });
      case 'ruby':
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#5E121E'),
          transmission: 0.8,
          roughness: 0.05,
          ior: 2.2,
          thickness: 1.8,
          specularIntensity: 1.3,
          specularColor: new THREE.Color('#FCA2B1'),
        });
    }
  };

  return (
    <group>
      <mesh ref={meshRef} material={getGemstoneMaterial()} scale={1.8}>
        {stoneType === 'emerald' ? (
          <cylinderGeometry args={[0.7, 0.7, 1.1, 8]} />
        ) : (
          <octahedronGeometry args={[0.9, 1]} />
        )}
      </mesh>
    </group>
  );
};

export const GemstoneViewer: React.FC<GemstoneViewerProps> = ({ stoneType }) => {
  const [webglOk, setWebglOk] = React.useState(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  const stoneColors: Record<string, string> = {
    diamond: '#F1EDE5',
    emerald: '#0A442E',
    sapphire: '#0B234F',
    ruby: '#5E121E',
  };

  return (
    <div className="w-full h-[360px] md:h-[420px] relative pointer-events-auto">
      {webglOk ? (
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.75]}
        >
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 6, 5]} intensity={3.5} angle={0.4} penumbra={0.6} color="#FFF8EB" />
          <directionalLight position={[-4, 3, -3]} intensity={1.5} color="#AECDE6" />
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.25}>
            <GemstoneModel stoneType={stoneType} />
          </Float>
        </Canvas>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center border border-[#C7A66A]/40 shadow-2xl animate-pulse"
            style={{ backgroundColor: stoneColors[stoneType] || '#0A442E' }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F1EDE5]">
              {stoneType.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
