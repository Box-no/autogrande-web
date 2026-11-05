"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function HeroMedia({ src, alt }: { src: string; alt: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <motion.div
      className="absolute inset-0 -z-20"
      style={{ y }}
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload
        quality={85}
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
    </motion.div>
  );
}
