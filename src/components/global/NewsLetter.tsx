import React from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight } from "lucide-react";
 


const NewsLetter: React.FC = () => {
  return (
    <div 
    style={{backgroundImage: "url('/src/assets/newsletter.svg')"}}
    className="flex full h-[250px] items-center  my-20 bg-cover bg-center bg-no-repeat ">
      <div className="relative z-[1] h-[500px] w-full  ">
        <img
          src="/src/assets/player.svg"
          alt="flish"
          className="absolute  w-full h-full"
        />
      </div>
      <div className="flex flex-col w-10/12 gap-11 items-center text-center">
        <h1 className="text-5xl font-bold mt-30 flex flex-col gap-1">
          <span className="text-primary">Newsletter</span>
          <span className="text-primary-foreground">Subscription</span>
        </h1>
        <div className="flex w-full max-w-sm space-x-2 items-center ">
      <Input type="email" placeholder="Email" />
      <Button type="submit" className="bg-footer w-fit p-0 hover:bg-footer-foreground ">
        <ArrowUpRight className="w-10 h-10 text-primary"/>
        </Button>
    </div>
      </div>
    </div>
  );
};

export default NewsLetter;
