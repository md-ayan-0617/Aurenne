import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Sculptural Gold Ring & Gemstone Mesh
const SculpturalRing = ({
  mousePos,
  scrollProgress,
  isMobile,
}: {
  mousePos: { x: number; y: number };
  scrollProgress: number;
  isMobile: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Optimized PBR Materials
  const goldMaterial = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#D4B26F'), // 18k noble champagne gold
      emissive: new THREE.Color('#1F180A'),
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: isMobile ? 0.3 : 0.6,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      envMapIntensity: 1.8,
    });
  }, [isMobile]);

  const emeraldMaterial = React.useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0F4632'),
      transmission: isMobile ? 0.5 : 0.75,
      opacity: 1,
      transparent: true,
      roughness: 0.06,
      ior: 2.15,
      thickness: 1.8,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#E3FFF3'),
      envMapIntensity: 2.0,
    });
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Interactive mouse/touch tilt (subtle 5-8 degrees)
    const targetRotX = mousePos.y * 0.12 + scrollProgress * 1.5;
    const targetRotY = mousePos.x * 0.18 + scrollProgress * 2.2;
    const targetRotZ = scrollProgress * 0.4;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY + 0.35,
      4,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ - 0.15,
      4,
      delta
    );

    // Dynamic virtual spotlight moving over the gold object
    if (spotLightRef.current) {
      spotLightRef.current.position.x = 4 + mousePos.x * 3;
      spotLightRef.current.position.y = 5 - mousePos.y * 2.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0 : 0.7, isMobile ? 0.25 : 0, 0]}
      scale={isMobile ? 0.95 : 1.25}
    >
      {/* Dynamic Key Light */}
      <spotLight
        ref={spotLightRef}
        position={[4, 5, 5]}
        intensity={4.5}
        angle={0.45}
        penumbra={0.8}
        color="#FFF2D6"
        castShadow={!isMobile}
      />

      {/* Cool Rim Light */}
      <directionalLight position={[-5, 3, -4]} intensity={1.8} color="#9DB5C8" />

      {/* Soft warm uplight */}
      <pointLight position={[0, -4, 2]} intensity={1.2} color="#C7A66A" />

      {/* Main Sculptural Ring Body (Architectural Cantilever Band) */}
      <mesh material={goldMaterial} castShadow={!isMobile} receiveShadow={!isMobile}>
        <torusGeometry args={[1.5, 0.32, isMobile ? 32 : 48, isMobile ? 64 : 128, Math.PI * 1.95]} />
      </mesh>

      {/* Tapered inner comfort curve */}
      <mesh material={goldMaterial} position={[0, 0, 0]}>
        <torusGeometry args={[1.44, 0.22, isMobile ? 24 : 32, isMobile ? 48 : 100]} />
      </mesh>

      {/* Tension Setting Arch Upper Crest */}
      <group position={[1.45, 0.48, 0]} rotation={[0, 0, 0.3]}>
        <mesh material={goldMaterial}>
          <boxGeometry args={[0.38, 0.72, 0.58]} />
        </mesh>
      </group>

      <group position={[1.45, -0.48, 0]} rotation={[0, 0, -0.3]}>
        <mesh material={goldMaterial}>
          <boxGeometry args={[0.38, 0.72, 0.58]} />
        </mesh>
      </group>

      {/* Suspended Emerald-Cut Gemstone */}
      <group position={[1.52, 0, 0]} rotation={[0, 0.35, 1.57]}>
        <mesh material={emeraldMaterial} castShadow={!isMobile}>
          <cylinderGeometry args={[0.42, 0.42, 0.75, 8]} />
        </mesh>
        <mesh material={emeraldMaterial} scale={0.75}>
          <octahedronGeometry args={[0.45, 1]} />
        </mesh>
      </group>

      {/* Accent Diamonds flush-set into shoulder */}
      <mesh position={[1.1, 0.88, 0.2]} material={new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.1, metalness: 0.9 })}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
      <mesh position={[1.2, 0.78, 0.2]} material={new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.1, metalness: 0.9 })}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
    </group>
  );
};

// Camera Scroll & Motion Controller
const CameraRig = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 5.2 - scrollProgress * 1.4;
    const targetX = scrollProgress * 0.6;
    const targetY = -scrollProgress * 0.4;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
  });

  return null;
};

export const HeroRingViewer: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        setMousePos({ x: x * 0.5, y: y * 0.5 });
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // GSAP ScrollTrigger tracking scroll over the Hero section with cleanup
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden"
    >
      {webglSupported ? (
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={isMobile ? [1, 1.25] : [1, 1.75]}
          className="w-full h-full"
        >
          <ambientLight intensity={0.45} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
            <SculpturalRing mousePos={mousePos} scrollProgress={scrollProgress} isMobile={isMobile} />
          </Float>
          <CameraRig scrollProgress={scrollProgress} />
        </Canvas>
      ) : (
        /* Luxury 2D Fallback Render */
        <div className="w-full h-full flex items-center justify-center opacity-85">
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop"
            alt="The Arc Ring 18K Gold"
            className="w-3/4 max-w-xl object-contain drop-shadow-[0_25px_50px_rgba(199,166,106,0.15)]"
          />
        </div>
      )}
    </div>
  );
};
