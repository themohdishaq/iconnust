"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileBadge,
  Globe2,
  Handshake,
  Rocket,
  Users,
} from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
}

interface HomeHeroProps {
  stats?: Stat[];
}

const heroSlides = [
  {
    tag: "Driving Impact, Creating Futures",
    titleLine1: "Innovation",
    highlight: "Par Excellence",
    titleLine2: "",
    desc:
      "University-driven innovation at NUST is transforming research into real-world impact for Pakistan. We connect academia, industry, and commercialisation pathways to build partnerships, advance technology, and support national progress.",
    img: "/main-pic/mainoffice.jpg",
  },
  {
    tag: "Industry Synergy",
    titleLine1: "Global",
    highlight: "Partnerships",
    titleLine2: "",
    desc:
      "NUST connects research excellence with industry and strategic partners to develop solutions, strengthen collaboration, and create meaningful economic and technological impact.",
    img: "/main-pic/hero1.jpg",
  },
  {
    tag: "Commercialisation",
    titleLine1: "Seamless",
    highlight: "Technology",
    titleLine2: "Transformation",
    desc:
      "NUST enables technologies to move from research and invention towards licensing, commercialisation and market adoption through structured technology-transfer pathways.",
    img: "/main-pic/lab.jpg",
  },
];

/*
|--------------------------------------------------------------------------
| FALLBACK STATS
|--------------------------------------------------------------------------
| These are only used if no stats are received from the database/API.
| Replace them with your officially approved ICON figures.
|--------------------------------------------------------------------------
*/

const fallbackStats: Stat[] = [
  {
    value: 900,
    label: "Industry Partners",
  },
  {
    value: 1360,
    label: "IP Filings",
  },
  {
    value: 310,
    label: "IPRs Awarded",
  },
  {
    value: 80,
    label: "Spin-offs",
  },
];

const statIcons = [
  Handshake,
  FileBadge,
  Rocket,
  Globe2,
];

/*
|--------------------------------------------------------------------------
| SEO / AUDIT FRIENDLY ANIMATED COUNTER
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| The REAL value is rendered in the initial HTML.
|
| Example:
|
| <span>900</span>
|
| After hydration, JavaScript visually changes it to 0 and animates:
|
| 0 -> 100 -> 400 -> 700 -> 900
|
| This fixes the audit issue:
|
| "Impact counters show 0+ and 0"
| "Put real figures in the HTML; animate up to them"
|--------------------------------------------------------------------------
*/

function AnimatedStatValue({
  value,
}: {
  value: string | number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const numericValue =
    Number.parseFloat(String(value)) || 0;

  /*
  |--------------------------------------------------------------------------
  | REAL SERVER-RENDERED VALUE
  |--------------------------------------------------------------------------
  */

  const formattedFinalValue =
    new Intl.NumberFormat("en-US").format(
      numericValue
    );

  useEffect(() => {
    if (!isInView || !ref.current) {
      return;
    }

    let animationFrame = 0;

    const duration = 1500;

    const startTime =
      performance.now();

    /*
    |--------------------------------------------------------------------------
    | Start visual animation from zero
    |--------------------------------------------------------------------------
    |
    | The initial HTML already contains the real value.
    | We only modify the DOM after JavaScript loads.
    |--------------------------------------------------------------------------
    */

    ref.current.textContent = "0";

    const tick = (
      currentTime: number
    ) => {
      const progress = Math.min(
        (currentTime - startTime) /
          duration,
        1
      );

      /*
      |--------------------------------------------------------------------------
      | Smooth easing
      |--------------------------------------------------------------------------
      */

      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          4
        );

      const currentValue =
        Math.round(
          numericValue *
            easedProgress
        );

      if (ref.current) {
        ref.current.textContent =
          new Intl.NumberFormat(
            "en-US"
          ).format(currentValue);
      }

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            tick
          );
      } else {
        /*
        |--------------------------------------------------------------------------
        | Make sure final value is exact
        |--------------------------------------------------------------------------
        */

        if (ref.current) {
          ref.current.textContent =
            formattedFinalValue;
        }
      }
    };

    animationFrame =
      requestAnimationFrame(
        tick
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    isInView,
    numericValue,
    formattedFinalValue,
  ]);

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT:
  |
  | We render the ACTUAL value here.
  |
  | DO NOT use:
  |
  | useState(0)
  |
  | because that causes the HTML to contain zero.
  |--------------------------------------------------------------------------
  */

  return (
    <span
      ref={ref}
      className="
        text-[25px]
        font-bold
        leading-none
        md:text-[27px]
      "
    >
      {formattedFinalValue}
    </span>
  );
}

export default function HomeHero({
  stats,
}: HomeHeroProps) {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  |
  | Database/API stats are preferred.
  |
  | fallbackStats are only used if no data is received.
  |--------------------------------------------------------------------------
  */

  const displayStats =
    useMemo(() => {
      if (
        !stats
      ) {
        return fallbackStats;
      }

      return stats;
    }, [stats]);

  /*
  |--------------------------------------------------------------------------
  | SLIDER CONTROLS
  |--------------------------------------------------------------------------
  */

  const nextSlide = () => {
    setCurrentSlide(
      (prev) =>
        prev ===
        heroSlides.length - 1
          ? 0
          : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        prev === 0
          ? heroSlides.length - 1
          : prev - 1
    );
  };

  /*
  |--------------------------------------------------------------------------
  | AUTO SLIDER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setCurrentSlide(
          (prev) =>
            prev ===
            heroSlides.length -
              1
              ? 0
              : prev + 1
        );
      }, 8000);

    return () =>
      window.clearInterval(
        interval
      );
  }, []);

  const slide =
    heroSlides[currentSlide];

  return (
    <section
      className="
        relative
        bg-white
      "
    >
      {/* =====================================================
          MAIN HERO CARD
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          min-h-screen
          w-full
          overflow-hidden
          bg-[#003B70]
          shadow-[0_25px_60px_rgba(0,48,91,0.14)]
        "
      >
        {/* =====================================================
            SLIDER BACKGROUND
        ====================================================== */}

        {heroSlides.map(
          (item, index) => (
            <div
              key={item.img}
              className={`
                absolute inset-0
                transition-opacity
                duration-[1200ms]

                ${
                  currentSlide ===
                  index
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
            >
              <Image
                src={item.img}
                alt={`${item.titleLine1} ${item.highlight}`}
                fill
                priority={
                  index === 0
                }
                loading="eager"
                sizes="100vw"
                className={`
                  object-cover
                  object-center
                  transition-transform
                  duration-[9000ms]
                  ease-out

                  ${
                    currentSlide ===
                    index
                      ? "scale-100"
                      : "scale-[1.06]"
                  }
                `}
              />
            </div>
          )
        )}

        {/* =====================================================
            OVERLAYS
        ====================================================== */}

        {/* Deep left gradient */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#002C57]
            via-[20%]
            to-transparent
            lg:via-[#5389bf]/50
          "
        />

        {/* Bottom depth */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#001F3D]/70
            via-transparent
            to-transparent
          "
        />

        {/* Mobile overlay */}

        <div
          className="
            absolute inset-0
            bg-[#002C57]/25
            md:hidden
          "
        />

        {/* Radial light blend */}

        <div
          className="
            pointer-events-none
            absolute
            left-[28%]
            top-0
            h-full
            w-[45%]
            bg-gradient-to-r
            from-[#00558F]/20
            to-transparent
            blur-xl
          "
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-20
            flex
            min-h-[620px]
            flex-col
            p-4
            sm:px-16
            sm:py-6
          "
        >
          {/* =================================================
              MAIN SLIDE CONTENT
          ================================================== */}

          <div
            className="
              flex
              flex-1
              items-center
            "
          >
            <div
              className="
                w-full
                max-w-[820px]
              "
            >
              <AnimatePresence
                mode="wait"
              >
                <motion.div
                  key={
                    currentSlide
                  }
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -18,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  {/* Tag */}

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-4
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.28em]
                      text-[#FCAF17]
                      sm:text-[11px]
                    "
                  >
                    <span
                      className="
                        h-[2px]
                        w-10
                        bg-[#FCAF17]
                      "
                    />

                    <span>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Heading */}

                  <h1
                    className="
                      max-w-[900px]
                      font-tahoma-font
                      uppercase
                      leading-[0.94]
                      tracking-[-0.045em]
                    "
                  >
                    <span
                      className="
                        block
                        text-2xl
                        font-medium
                        text-white
                        sm:text-[64px]
                      "
                    >
                      {
                        slide.titleLine1
                      }
                    </span>

                    <span
                      className="
                        mt-2
                        block
                        text-[43px]
                        font-semibold
                        text-[#FCAF17]
                        sm:text-[64px]
                      "
                    >
                      {
                        slide.highlight
                      }
                    </span>

                    {slide.titleLine2 && (
                      <span
                        className="
                          mt-2
                          block
                          text-2xl
                          font-medium
                          text-white
                          sm:text-[64px]
                        "
                      >
                        {
                          slide.titleLine2
                        }
                      </span>
                    )}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div className="mt-7">
            <Link
              href="#partner-with-us"
              className="
                group
                relative
                inline-flex
                min-h-[58px]
                items-center
                justify-center
                gap-4
                overflow-hidden
                rounded-[8px]
                border
                border-[#FCAF17]
                bg-[#FCAF17]
                px-7
                text-[12px]
                font-black
                uppercase
                tracking-[0.08em]
                text-[#063A60]
                shadow-[0_14px_35px_rgba(0,0,0,0.18)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]
                active:translate-y-0
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  -translate-y-full
                  bg-[#003B70]
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                "
              />

              <span
                className="
                  absolute
                  inset-0
                  rounded-[8px]
                  border
                  border-[#003B70]
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <span
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  gap-4
                  text-[#063A60]
                  transition-colors
                  duration-300
                  group-hover:text-white
                "
              >
                <Users
                  size={20}
                  strokeWidth={
                    1.8
                  }
                />

                Partner With Us

                <ArrowRight
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>
            </Link>
          </div>

          {/* =================================================
              IMPACT STATISTICS
          ================================================== */}

          <div
            className="
              mt-10
              w-full
              max-w-[850px]
              overflow-hidden
              rounded-[18px]
              border
              border-white/35
              bg-[#003F70]/45
              shadow-[0_16px_40px_rgba(0,0,0,0.12)]
              backdrop-blur-[8px]
            "
          >
            <div
              className="
                grid
                grid-cols-2
                divide-x
                divide-y
                divide-white/20
                md:grid-cols-4
              "
            >
              {displayStats.map(
                (
                  stat,
                  index
                ) => {
                  const Icon =
                    statIcons[
                      index
                    ] ??
                    Handshake;

                  return (
                    <div
                      key={`${stat.label}-${index}`}
                      className="
                        flex
                        min-h-[105px]
                        items-center
                        gap-4
                        px-5
                        py-5
                        sm:px-6
                      "
                    >
                      <Icon
                        size={35}
                        strokeWidth={
                          1.6
                        }
                        className="
                          shrink-0
                          text-[#FCAF17]
                        "
                      />

                      <div>
                        <div
                          className="
                            flex
                            items-baseline
                            text-white
                          "
                        >
                          <AnimatedStatValue
                            value={
                              stat.value
                            }
                          />

                          <motion.span
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration:
                                0.5,
                              delay:
                                0.25,
                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                            className="
                              ml-0.5
                              text-[20px]
                              font-bold
                            "
                          >
                            +
                          </motion.span>
                        </div>

                        <p
                          className="
                            mt-1
                            break-words
                            text-[10px]
                            font-medium
                            text-white/85
                            sm:text-[11px]
                          "
                        >
                          {
                            stat.label
                          }
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              SLIDER INDICATORS
          ================================================== */}

          <div
            className="
              mt-8
              flex
              items-center
              gap-7
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {heroSlides.map(
                (_, index) => (
                  <button
                    key={
                      index
                    }
                    type="button"
                    onClick={() =>
                      setCurrentSlide(
                        index
                      )
                    }
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    className={`
                      h-[6px]
                      rounded-full
                      transition-all
                      duration-500

                      ${
                        currentSlide ===
                        index
                          ? "w-12 bg-[#FCAF17]"
                          : "w-8 bg-white/80 hover:bg-white"
                      }
                    `}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            LEFT ARROW
        ====================================================== */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-4
            top-1/2
            z-30
            hidden
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-[#002D55]/80
            text-white
            backdrop-blur-md
            transition
            hover:scale-105
            hover:bg-[#00558F]
            md:flex
          "
        >
          <ChevronLeft
            size={27}
          />
        </button>

        {/* =====================================================
            RIGHT ARROW
        ====================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-6
            top-1/2
            z-30
            hidden
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#004C81]
            text-white
            shadow-xl
            transition
            hover:scale-105
            hover:bg-[#0063A5]
            md:flex
          "
        >
          <ChevronRight
            size={27}
          />
        </button>

        {/* =====================================================
            DECORATIVE DOT GRID
        ====================================================== */}

        <div
          className="
            absolute
            bottom-7
            right-7
            z-20
            hidden
            grid-cols-3
            gap-[8px]
            lg:grid
          "
        >
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <span
              key={index}
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-white/90
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}
