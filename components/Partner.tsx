"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Building2 } from "lucide-react";

type Partner = {
  name: string;
  logo: string | null;
};

function PartnerChip({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-lg hover:border-blue-900/30 transition-all min-w-[300px]"
    >
      <div className="flex h-14 w-24 items-center justify-center">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={90}
            height={50}
            className="max-h-12 w-auto object-contain"
          />
        ) : (
          <Building2 className="h-8 w-8 text-blue-900/40" />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold leading-snug text-slate-700">
          {partner.name}
        </p>
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 140,
}: {
  items: Partner[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const duplicated = [...items, ...items];
  const controls = useAnimationControls();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    controls.start({
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });
  }, [controls, direction, duration]);

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      onMouseEnter={() => {
        setIsPaused(true);
        controls.stop();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        controls.start({
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          transition: {
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        });
      }}
    >
      <motion.div
        className="flex gap-5 w-max"
        animate={controls}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {duplicated.map((partner, index) => (
          <PartnerChip
            key={`${partner.name}-${index}`}
            partner={partner}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  if (partners.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-4 "
    >
      <div className="mx-auto max-w-8xl px-6">
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#003B70] mb-3"
          >
            Our Partners
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <MarqueeRow
            items={partners}
            direction="left"
            duration={140}
          />

          <MarqueeRow
            items={[...partners].reverse()}
            direction="right"
            duration={140}
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="mx-auto mt-16 h-px max-w-xs bg-gradient-to-r from-transparent via-blue-900/20 to-transparent"
        />
      </div>
    </section>
  );
}