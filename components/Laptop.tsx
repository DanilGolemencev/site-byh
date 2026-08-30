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

/* Пределы наклона за курсором мыши — небольшие, чтобы объект «жил», а не летал. */
const MAX_TILT_X = 5;
const MAX_TILT_Y = 7;

/* Кинематографический вход:
   0.0s — далеко, повёрнут, крышка закрыта (лежит на базе)
   0.6s — приблизился, начинает разворачиваться, крышка приоткрывается
   1.6s — почти на месте, крышка распахнута на ~110°
   2.0s — финал: развёрнут к зрителю, крышка полностью раскрыта, крупным планом.

   Крышка раскрывается вокруг нижнего края через rotateX ≈ -105° → 0°,
   что имитирует пятиградусный наклон назад в финальной позиции.
   Приближение — через scale + translateY на внешнем контейнере. */
const ENTRANCE = {
  duration: 2.0,
  ease: [0.22, 0.9, 0.28, 1] as const,
};

export default function Laptop({ step }: { step: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [canTilt, setCanTilt] = useState(false);
  const [entered, setEntered] = useState(false);
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
    /* Наклон только там, где есть мышь и hover; на тачскрине и при
       prefers-reduced-motion объект стоит спокойно. */
    setCanTilt(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce,
    );
  }, [reduce]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!canTilt || !entered || !tiltRef.current) return;
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
      className="[perspective:2400px]"
    >
      {/* Микронаклон за курсором — включается после завершения въезда. */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Приближение камеры: далеко → крупный план. */}
        <motion.div
          initial={reduce ? false : { scale: 0.38, y: 90, rotateY: 34, opacity: 0 }}
          animate={{
            scale: [0.38, 0.7, 1],
            y: [90, 40, 0],
            rotateY: [34, 14, 0],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: ENTRANCE.duration,
            ease: ENTRANCE.ease,
            times: [0, 0.55, 1],
            delay: 0.15,
          }}
          onAnimationComplete={() => setEntered(true)}
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 65%" }}
        >
          <div style={{ transformStyle: "preserve-3d" }}>
            {/* Раскрытие крышки: закрыта → распахнута на ~110°. */}
            <motion.div
              initial={reduce ? false : { rotateX: -108 }}
              animate={{ rotateX: [-108, -108, -55, 0] }}
              transition={{
                duration: ENTRANCE.duration,
                ease: ENTRANCE.ease,
                times: [0, 0.25, 0.7, 1],
                delay: 0.15,
              }}
              style={{
                transformOrigin: "50% 100%",
                transformStyle: "preserve-3d",
              }}
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
                    style={{
                      width: size.w,
                      height: size.h,
                      transform: `scale(${scale})`,
                    }}
                  >
                    {width > 0 && <Screen step={step} compact={compact} />}
                  </div>

                  {/* Блик на стекле */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(103deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.07) 100%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Основание — не поворачивается, лежит на «столе». */}
            <div className="relative">
              <div className="h-[8px] rounded-b-md bg-gradient-to-b from-[#2b323d] to-[#171c25] sm:h-[10px]" />
              <div className="mx-auto h-[6px] w-[92%] rounded-b-[14px] bg-gradient-to-b from-[#20262f] to-[#0f1319] shadow-[0_26px_44px_-14px_rgba(0,0,0,0.9)] sm:h-[7px]" />
              <div className="mx-auto mt-[-5px] h-[5px] w-[13%] rounded-b-md bg-[#0b0e13]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Тёплый отблеск от экрана на столе. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-2 hidden h-16 w-[86%] blur-2xl sm:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,169,74,0.18), transparent 70%)",
        }}
      />
    </div>
  );
}
