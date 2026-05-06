"use client"

import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  showDots?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  slidesToShow?: number // Keep for backward compatibility, but will use responsive classes
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function Carousel({
  children,
  className = "",
  showDots = true,
  autoPlay = true,
  autoPlayDelay = 4000,
  slidesToShow = 1,
  responsive = { sm: 1, md: 2, lg: 3, xl: 3 }, // Default responsive settings
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  // Generate responsive flex classes
  const getResponsiveClasses = (responsive: CarouselProps['responsive']) => {
    const classes = ['flex-shrink-0 min-w-0 pr-4']
    // Default for small screens (1 card)
    classes.push('w-full')
    // Medium screens (2 cards)
    if (responsive?.md && responsive.md === 2) {
      classes.push('md:w-1/2')
    }
    // Large screens (3 cards)
    if (responsive?.lg && responsive.lg === 3) {
      classes.push('lg:w-1/3')
    }
    // Extra large screens (3 cards)
    if (responsive?.xl && responsive.xl === 3) {
      classes.push('xl:w-1/3')
    }
    return classes.join(' ')
  }

  const responsiveClasses = getResponsiveClasses(responsive)

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children.map((child, index) => (
            <div
              key={index}
              className={`${responsiveClasses} min-w-0 pr-4 flex-shrink-0`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={20} className="text-slate-600" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 z-10"
        aria-label="Next"
      >
        <ChevronRight size={20} className="text-slate-600" />
      </button>

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center mt-8 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-blue-600" : "bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}