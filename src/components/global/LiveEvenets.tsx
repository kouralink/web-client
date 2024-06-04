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
        md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg
        
        flex items-center justify-center"
      >
        <CarouselContent className="gap-2  ">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="pl-4 flex items-center aspect-square md:basis-1/2  xl:basis-1/3 2xl:basis-1/4">
              <div className="p-1">
                <LiveEvenetCard />
            </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious iconClasses="min-w-10 min-h-10 text-gray-700" variant={"ghost"} />
        <CarouselNext iconClasses="min-w-10 min-h-10 text-gray-700 " variant={"ghost"} />
      </Carousel>
    </div>
  );
}
