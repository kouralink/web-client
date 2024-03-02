import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LiveEvenetCard } from "./cards/LiveEvenetCard";

export function LiveEvenets() {
  return (
    <div className="flex w-full items-center justify-center max-w-[100vw] "
    >
      <Carousel
        opts={{
          align: "center",
          loop: false,
          
        }}
        // orientation="vertical"
        className="w-full max-w-xs
        max-w-screen-xs  sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg
        basis-1/10 sm:basis-1/2 md:basis-1/3  lg:basis-1/4
        flex items-center justify-center"
      >
        <CarouselPrevious />
        <CarouselContent className="gap-2  ">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="p-1">
            <CarouselItem key={index} className="pl-4 sm:basis-1/2  xl:basis-1/3">
                <LiveEvenetCard />
            </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
