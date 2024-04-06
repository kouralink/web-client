import React from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight } from "lucide-react";
 


const NewsLetter: React.FC = () => {
  return (
    <div 
    style={{backgroundImage: "url('/src/assets/newsletter.svg')"}}
    className="flex full h-[250px] items-center justify-center text-center  my-20 bg-cover bg-center bg-no-repeat ">
      <div className="relative z-[1] hidden sm:flex h-[500px] w-full  ">
        <img
          src="/src/assets/player1.svg"
          alt="flish"
          className="w-full h-full  sm:absolute"
        />
      </div>
      <div className="flex flex-col w-10/12 gap-11 items-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold mt-30 flex flex-col gap-1">
          <span className="text-primary-700">Newsletter</span>
          <span className="text-card dark:text-card-foreground">Subscription</span>
        </h1>
        <div className="flex w-full h-fit max-w-sm space-x-2 items-center ">
      <Input type="email" placeholder="Email" />
      <Button type="submit" className="bg-footer w-fit  p-0 hover:bg-footer-foreground dark:bg-primary-900 dark:hover:bg-primary-950 ">
        <ArrowUpRight className="w-10 h-10 text-primary "/>
        </Button>
    </div>
      </div>
    </div>
  );
};

export default NewsLetter;
