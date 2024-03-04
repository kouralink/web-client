import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface TestimonialsCardProps {
  name: string;
  testimonial: string;
  src: string;
  rate: number;
  accountType: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  name,
  testimonial,
  accountType,
  rate,
  src,
}) => {
  return (
    <div className="flex w-fit h-fit flex-col gap-10 overflow-hidden ">
      <div className="flex w-full justify-between items-center">
        <div className="flex h-fit items-center gap-2">
          <Avatar className="w-10 h-10 md:w-16 md:h-16">
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-md md:text-lg font-medium first-letter:uppercase">{name}</h2>
            <p className="text-muted-foreground text-xs md:text-sm first-letter:uppercase">{accountType}</p>
          </div>
        </div>
        <div className="font-bold text-gold">{rate}</div>
      </div>
      <div className="aspect-sq h-fit text-center text-sm sm:text-lg">"{testimonial}"</div>
    </div>
  );
};

export default TestimonialsCard;
