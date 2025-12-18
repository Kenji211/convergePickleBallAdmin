"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "https://wallpapers.com/images/hd/pickleball-pictures-2205-x-1374-5614i2nz26vxpfnx.jpg",
  "https://www.nmsportsmed.com/wp-content/uploads/2022/05/107049623-1650553521940-gettyimages-1325936569-bth011_6-25-2021_newpickleballcourtsopentocommunityinwestrea.jpeg",
  "https://wallpapers.com/images/hd/pickleball-pictures-2600-x-1733-lemk5i9mr91aicqc.jpg",
  "https://wallpapercave.com/wp/wp12538296.jpg",
];

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-xl h-full">
      <Carousel
        className="h-full"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 12000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="h-full">
          {images.map((src) => (
            <CarouselItem key={src} className="h-full">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Blue overlay */}
      <div className="pointer-events-none absolute inset-0 bg-blue-50/60 backdrop-blur-[1px]" />
    </div>
  );
}
