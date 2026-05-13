"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2 } from "lucide-react";

const partners = [
  "Huawei Technologies",
  "Microsoft Pakistan",
  "Oracle",
  "Netsol Technologies",
  "Systems Ltd",
  "Atlas Honda",
  "Millat Group",
  "Indus Motor Company",
  "House of Habib",
  "Engro Corporation",
  "SUPARCO",
  "ABB",
  "Hytera",
  "Turkish Aerospace",
  "Rapid Silicon",
  "PASHA",
  "PSEB",
  "SECP",
  "Teradata",
  "PTCL",
  "Hitit",
  "FIA",
  "PanAsian Group",
  "Pharmatec",
];

function MarqueeRow({
  items,
  direction = "left",
  duration = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        className="flex w-max gap-3"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: { duration, repeat: Infinity, ease: "linear" },
        }}
      >
        {doubled.map((name, i) => (
          <PartnerChip key={`${name}-${i}`} name={name} />
        ))}
      </motion.div>
    </div>
  );
}

function PartnerChip({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="
        cursor-default select-none whitespace-nowrap
        flex items-center gap-2
        rounded-sm border border-slate-200
        bg-white px-5 py-3
        text-[11px] font-black uppercase tracking-[0.15em]
        text-slate-500
        shadow-sm
        hover:border-blue-900/30 hover:text-blue-900 hover:shadow-md
        transition-colors duration-200
      "
    >
      <Building2 size={12} className="shrink-0 text-blue-900/40" />
      {name}
    </motion.div>
  );
}

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20 bg-slate-50"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-14 text-center">
       

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-slate-900 mb-3"
          >
            Our {" "}
            <span className="italic text-blue-900">Partners</span>
          </motion.h2>
        </div>

        {/* Marquee Rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <MarqueeRow items={partners} direction="left" duration={40} />
          <MarqueeRow
            items={[...partners].reverse()}
            direction="right"
            duration={35}
          />
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 h-px max-w-[200px] origin-center bg-gradient-to-r from-transparent via-blue-900/20 to-transparent"
        />
      </div>
    </section>
  );
}
