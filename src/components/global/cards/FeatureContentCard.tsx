import { Button } from "@/components/ui/button";
import React from "react";

interface FeatureContentCardProps {
  backgroundImageSrc: string;
  title: string;
  description: string;
}

const FeatureContentCard: React.FC<FeatureContentCardProps> = ({
  backgroundImageSrc,
  title,
  description,

}) => {
  return (
    <div
      className="h-[500px] w-[500px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] bg-cover bg-center bg-no-repeat rounded-lg  text-white relative overflow-hidden
      shadow-lg
      "
      style={{ backgroundImage: `url(${backgroundImageSrc})` }}
    >
      <div className="w-full h-full flex text-center flex-col gap-2 p-4 sm:p-2  sm:gap-2 justify-center items-center backdrop-brightness-50">

      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
      <Button>Details</Button>
    </div>
    </div>
  );
};

export default FeatureContentCard;
