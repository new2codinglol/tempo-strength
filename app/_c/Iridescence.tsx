"use client";

import { useReducedMotion } from "motion/react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/* ShaderGradient as the Y2K ground. The style's own key words are
   "iridescent gradient" and "metallic finish", so this is the one place in
   the four sites where an animated 3D gradient is the subject rather than
   decoration — chrome needs something to reflect.

   Colours are pulled to the deck's Y2K swatch rather than the library's
   defaults: steel blue, lilac and the hot magenta accent.

   It is a WebGL canvas running continuously, so it is dropped entirely under
   reduced motion and the CSS gradient on <body> shows through instead. */
export function Iridescence() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0 }}
        pixelDensity={1}
        fov={40}
        lazyLoad
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uSpeed={0.18}
          uStrength={1.1}
          uDensity={1.3}
          uFrequency={5.5}
          uAmplitude={0}
          color1="#c0c8d8"
          color2="#8fa2c4"
          color3="#e3d4f2"
          cDistance={3.2}
          cPolarAngle={100}
          cAzimuthAngle={180}
          brightness={1.05}
          lightType="3d"
          grain="on"
          grainBlending={0.06}
          reflection={0.15}
          positionY={-0.8}
          rotationX={45}
        />
      </ShaderGradientCanvas>
      {/* Chrome needs something to reflect, but not at the cost of the copy.
          A white veil keeps the iridescence as a surface the page sits on
          rather than a colour the page has to fight. */}
      <div className="absolute inset-0 bg-white/45" />
    </div>
  );
}
