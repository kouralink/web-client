import React from "react";
import SectionTitle from "./SectionTitle";

interface SectionHeadProps {
  title: string;
  description: string;
}

const SectionHead: React.FC<SectionHeadProps> = ({ title, description }) => {
  return (
    <div className="flex w-fit h-[150px] items-center">
      <div className="relative z-[-10] h-[340px] w-[150px]  ">
        <img
          src="/src/assets/SectionTitelFlish.svg"
          alt="flish"
          className="absolute  w-full h-full"
        />
      </div>
      <div className="relative right-[70px] ">
        <h1 className="text-4xl font-bold mt-30">
          {<SectionTitle color="text-green-900" title={title} />}
        </h1>
        <p className="max-w-[600px] pl-6">{description}</p>
      </div>
    </div>
  );
};

export default SectionHead;
