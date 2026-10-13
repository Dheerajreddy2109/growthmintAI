"use client";

import { useGSAP } from '@/lib/gsap';
import { initHomeMotion } from '@/lib/motion';

// Renders nothing. Placed after the homepage sections so their markup exists when the scroll
// animations are attached; useGSAP reverts every animation (and restores split text) on unmount.
export default function HomeMotion() {
  useGSAP(() => {
    initHomeMotion();
  });
  return null;
}
