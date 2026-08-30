"use client";

import { MotionConfig } from "motion/react";

/** reducedMotion="user" глушит смещения и повороты у всех анимаций Motion,
 *  когда в системе включено «уменьшить движение». Затухания остаются —
 *  они не вызывают вестибулярной реакции. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
