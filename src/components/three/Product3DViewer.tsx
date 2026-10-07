import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '../../types';

interface Product3DViewerProps {
  product: Product;
}

export type LightingMode = 'day' | 'evening' | 'gallery';

const ProductObject = ({
  lightingMode,
  presetAngle,
  isMobile,
}: {
  lightingMode: LightingMode;
  presetAngle: string;
  isMobile: boolean;
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (presetAngle === 'auto') {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  const goldMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#DFBC75'),
      metalness: 0.94,
      roughness: 0.14,
      clearcoat: isMobile ? 0.3 : 0.5,
      reflectivity: 0.85,
    });
  }, [isMobile]);

  const stoneMat = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(
        lightingMode === 'evening'
          ? '#0D4835'
          : lightingMode === 'gallery'
          ? '#063A29'
          : '#155E45'
      ),
      transmission: isMobile ? 0.6 : 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 2.2,
      thickness: 1.5,
      specularIntensity: 1.2,
    });
  }, [lightingMode, isMobile]);

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={isMobile ? 0.9 : 1.0}>
      {/* Dynamic Lighting Setup according to mode */}
      {lightingMode === 'day' && (
        <>
          <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFFFF" />
          <directionalLight position={[-5, 4, -5]} intensity={1.0} color="#E8F0F8" />
          <ambientLight intensity={0.6} />
        </>
      )}

      {lightingMode === 'evening' && (
        <>
          <spotLight
            position={[4, 6, 4]}
            intensity={3.8}
            angle={0.5}
            penumbra={0.7}
            color="#FFD699"
          />
          <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#C7A66A" />
          <ambientLight intensity={0.3} color="#2A1B0E" />
        </>
      )}

      {lightingMode === 'gallery' && (
        <>
          <spotLight
            position={[2, 7, 3]}
            intensity={5.5}
            angle={0.3}
            penumbra={0.3}
            color="#FFF8E7"
          />
          <pointLight position={[-4, -3, -2]} intensity={0.8} color="#6E8EA7" />
          <ambientLight intensity={0.15} />
        </>
      )}

      {/* Primary Ring Geometry */}
      <mesh material={goldMat} castShadow={!isMobile} receiveShadow={!isMobile}>
        <torusGeometry args={[1.3, 0.28, isMobile ? 32 : 48, isMobile ? 64 : 120]} />
      </mesh>

      {/* Architectural Crown Bevel */}
      <mesh material={goldMat} position={[0, 1.25, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.32, 0.5, 8]} />
      </mesh>

      {/* Gemstone Setting */}
      <mesh material={stoneMat} position={[0, 1.5, 0]}>
        <octahedronGeometry args={[0.45, 1]} />
      </mesh>
    </group>
  );
};

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const [lightingMode, setLightingMode] = useState<LightingMode>('gallery');
  const [presetAngle, setPresetAngle] = useState<'auto' | 'front' | 'side' | 'detail'>('auto');
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setCameraPreset = (preset: 'front' | 'side' | 'detail' | 'reset') => {
    if (!controlsRef.current) return;
    setPresetAngle('front');
    if (preset === 'front') {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(0, 0, 4.5);
    } else if (preset === 'side') {
      controlsRef.current.object.position.set(4.5, 0.5, 0);
    } else if (preset === 'detail') {
      controlsRef.current.object.position.set(0.8, 1.8, 2.2);
    } else {
      controlsRef.current.reset();
      setPresetAngle('auto');
    }
    controlsRef.current.update();
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[640px] bg-[#0A0B0D] border border-[rgba(199,166,106,0.12)] overflow-hidden flex flex-col justify-between select-none">
      {/* Top Bar: Lighting Mode Selector */}
      <div className="z-20 p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#777774] font-mono">
            LIGHT:
          </span>
          <div className="flex items-center bg-[#141518] p-1 border border-[rgba(255,255,255,0.06)]">
            {(['day', 'evening', 'gallery'] as LightingMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setLightingMode(mode)}
                className={`px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  lightingMode === mode
                    ? 'bg-[#C7A66A] text-[#08090A] font-semibold'
                    : 'text-[#9B9A96] hover:text-[#F1EDE5]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C7A66A] font-mono truncate max-w-[160px] sm:max-w-none">
          3D / {product.name.toUpperCase()}
        </div>
      </div>

      {/* 3D Canvas or 2D High-Res Fallback */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        {webglSupported ? (
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 42 }}
            gl={{ antialias: !isMobile, alpha: true }}
            dpr={isMobile ? [1, 1.35] : [1, 1.75]}
          >
            <ProductObject lightingMode={lightingMode} presetAngle={presetAngle} isMobile={isMobile} />
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              minDistance={2.5}
              maxDistance={6.5}
              enableDamping
              dampingFactor={0.06}
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(199,166,106,0.2)]"
            />
          </div>
        )}
      </div>

      {/* Bottom Bar: Perspective View Angle Controls */}
      <div className="z-20 p-4 md:p-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCameraPreset('front')}
            className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] border border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A] transition-colors bg-[#111214]/80 backdrop-blur-sm"
          >
            FRONT
          </button>
          <button
            onClick={() => setCameraPreset('side')}
            className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] border border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A] transition-colors bg-[#111214]/80 backdrop-blur-sm"
          >
            SIDE
          </button>
          <button
            onClick={() => setCameraPreset('detail')}
            className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] border border-[rgba(255,255,255,0.1)] text-[#DCD8CF] hover:border-[#C7A66A] transition-colors bg-[#111214]/80 backdrop-blur-sm"
          >
            DETAIL
          </button>
          <button
            onClick={() => setCameraPreset('reset')}
            className="px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] border border-transparent text-[#777774] hover:text-[#C7A66A] transition-colors"
          >
            RESET
          </button>
        </div>

        <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#5A5B5E] font-mono">
          DRAG TO ROTATE • PINCH TO ZOOM
        </span>
      </div>
    </div>
  );
};
