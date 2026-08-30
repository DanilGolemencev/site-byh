"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Screen from "./Screen";

/* Логический размер экрана. Всё внутри рисуется в этих координатах,
   а наружу масштабируется под ширину контейнера — так интерфейс
   остаётся пропорциональным на любом экране. На узких экранах берём
   меньшую сетку, иначе текст в окне ужимается до нечитаемого. */
const FULL = { w: 1040, h: 580 };
const COMPACT = { w: 620, h: 480 };

/* Ниже этой отрисованной ширины полная сетка ужимается до нечитаемого,
   поэтому переключаемся на компактную. Считаем по реальной ширине рамки,
   а не по вьюпорту: на ландшафтном планшете окно узкое при широком экране. */
const COMPACT_BELOW = 640;

/* Максимальный угол наклона за курсором — по паре градусов, чтобы объект
   ожил, а не превратился в аттракцион. */
const MAX_TILT_X = 5;
const MAX_TILT_Y = 7;

export default function Laptop({ step }: { step: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [canTilt, setCanTilt] = useState(false);
  const reduce = useReducedMotion();
  const compact = width > 0 && width < COMPACT_BELOW;
  const size = compact ? COMPACT : FULL;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const tiltY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    /* Наклон только там, где есть настоящая мышь и наведение — на тачскрине
       "наведение" не существует, а prefers-reduced-motion просит вообще не
       дёргать объект без явного действия пользователя. */
    setCanTilt(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce,
    );
  }, [reduce]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!canTilt || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawY.set((px - 0.5) * MAX_TILT_Y);
    rawX.set((0.5 - py) * MAX_TILT_X);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const scale = width / size.w;

  return (
    <div
      ref={tiltRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="[perspective:2200px]"
    >
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={reduce ? false : { rotateX: -72, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
        >
          {/* Крышка */}
          <div className="rounded-t-2xl bg-gradient-to-b from-[#333b48] to-[#1b212b] p-[1.1%] pb-[1.6%] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
            <div
              ref={frameRef}
              className="relative overflow-hidden rounded-lg bg-[#f2f3f5]"
              style={{ aspectRatio: `${size.w} / ${size.h}` }}
            >
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: size.w, height: size.h, transform: `scale(${scale})` }}
              >
                {width > 0 && <Screen step={step} compact={compact} />}
              </div>

              {/* Блик по стеклу — тонкий, чтобы не мешать читать интерфейс */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(103deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.07) 100%)",
                }}
              />
            </div>
          </div>

          {/* Основание */}
          <div className="relative">
            <div className="h-[8px] rounded-b-md bg-gradient-to-b from-[#2b323d] to-[#171c25] sm:h-[10px]" />
            <div className="mx-auto h-[6px] w-[92%] rounded-b-[14px] bg-gradient-to-b from-[#20262f] to-[#0f1319] shadow-[0_26px_44px_-14px_rgba(0,0,0,0.9)] sm:h-[7px]" />
            <div className="mx-auto mt-[-5px] h-[5px] w-[13%] rounded-b-md bg-[#0b0e13]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Свет от экрана на столе */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-2 hidden h-16 w-[86%] blur-2xl sm:block"
        style={{
          background: "radial-gradient(ellipse at center, rgba(196,161,90,0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
