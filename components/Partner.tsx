"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Building2 } from "lucide-react";

const partners = [
  { name: "Toyota Indus Motor Company", logo: "toyota.jpg" },
  { name: "Attock Refinery Limited (ARL)", logo: "Attock Refinery Limited (ARL).png" },
  { name: "Pakistan Business Council (PBC)", logo: "Pakistan Business Council (PBC).svg" },
  { name: "Scotmann Pharmaceuticals", logo: "Scotmann Pharmaceuticals.png" },
  { name: "Wilson's Pharmaceuticals", logo: "Wilson's Pharmaceuticals logo.jpg" },
  { name: "Fauji Fertilizer Company (FFC)", logo: "Fauji Fertilizer Company (FFC).png" },
  { name: "AGP Limited", logo: "AGP Limited.jpg" },
  { name: "Honda", logo: "Honda.png" },
  { name: "CTGI", logo: "CTGI logo.jpg" },
  { name: "Huawei Technologies", logo: "Huawei Technologies.png" },
  { name: "Interactive Group", logo: "Interactive Group.jpg" },
  { name: "Crescent Steel & Allied Products Limited", logo: "Crescent Steel & Allied Products Limited.png" },
  { name: "Graana.com", logo: "Graana.com.png" },
  { name: "Khushhali Microfinance Bank", logo: "Khushhali Microfinance Bank.png" },
  { name: "Pakistan Telecommunication Authority (PTA)", logo: "Pakistan Telecommunication Authority (PTA).png" },
  { name: "Allied Bank", logo: "Allied Bank logo.png" },
  { name: "Oracle", logo: "Oracle.webp" },
  { name: "Rastgar Engineering Company", logo: null },
  { name: "Sustainable Development Policy Institute (SDPI)", logo: "Sustainable Development Policy Institute (SDPI).webp" },
  { name: "Nayatel", logo: "Nayatel.jpg" },
  { name: "Netsol Technologies", logo: "Netsol Technologies.svg" },
  
  { name: "NADRA", logo: "NADRA.png" },
  { name: "Serena Hotels", logo: "Serena Hotels.png" },
  { name: "Keystone", logo: null },
  { name: "Moftak Solutions", logo: "Moftak Solutions.jpg" },
  { name: "PepsiCo", logo: "PepsiCo.jpg" },
  { name: "Askari Bank", logo: "Askari Bank.jpg" },

  { name: "National Bank of Pakistan (NBP)", logo: "National Bank of Pakistan (NBP).jpg" },
  
  { name: "Jazz", logo: "Jazz.jpg" },
  { name: "Habib Bank Limited (HBL)", logo: "Habib Bank Limited (HBL).jpg" },
  
  { name: "Pakistan Tobacco Company (PTC)", logo: "Pakistan Tobacco Company (PTC).png" },

  { name: "International Finance Corporation (IFC)", logo: "International Finance Corporation (IFC).jpg" },
  
  {
    name: "Islamabad Chamber of Commerce & Industry (ICCI)",
    logo: "Islamabad Chamber of Commerce & Industry (ICCI).jpg",
  },
  {
    name: "Pakistan Agricultural Research Council (PARC)",
    logo: "Pakistan Agricultural Research Council (PARC).jpg",
  },
  {
    name: "Pakistan Telecommunication Company Limited (PTCL)",
    logo: "Pakistan Telecommunication Company Limited (PTCL).png",
  },
];

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
            src={`/${partner.logo}`}
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

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-serif text-slate-900"
          >
            Our <span className="italic text-blue-900">Partners</span>
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