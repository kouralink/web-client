import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialsCard from "./cards/TestimonialsCard";

export function Testimonials() {
  return (
    <div className="w-full flex items-center justify-center gap-28">
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        <CarouselContent >
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                  <TestimonialsCard accountType="tournament manager" name="khlifa" rate={4.5} src="/src/assets/logo.png" testimonial="Being part of this platform has been a game-changer for me. The opportunity to connect with fellow football enthusiasts, join exciting tournaments, and experience top-notch gameplay has truly elevated my love for the sport."/>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious iconClasses="min-w-16 min-h-16 text-gray-700 md:mr-40 lg:mr-80 " variant={"ghost"} className="bg-none hover:bg-transparent rounded-none "/>
        <CarouselNext iconClasses="min-w-16 min-h-16 text-gray-700 md:ml-40 lg:ml-80 " variant={"ghost"} className="bg-none hover:bg-transparent rounded-none " />
      </Carousel>
    </div>
  );
}
