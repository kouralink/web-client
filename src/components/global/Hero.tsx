import React from 'react';
import { Button } from '../ui/button';

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle}) => {
    return (
        <div className="flex flex-col justify-center items-center pt-[60px] 
        gap-4
        
        ">
        <div className="flex flex-col justify-center items-center 
        gap-2
        
        ">

        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <h3 className="text-xl text-center">
          {subtitle}
        </h3>
        </div>
        <Button>Get Started</Button>
        
        </div>
    );
};

export default Hero;