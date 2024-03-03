import React from "react";
import PrivilegeCard from "./cards/PrivilegeCard";

interface PrivilegesProps {
  // Define your props here
}

const Privileges: React.FC<PrivilegesProps> = () => {
  const privileges = [
    {
      icon: "/src/assets/privileges/global.svg",
      title: "Play with 10K+ Players",
      description: "Join a team, engage in matches with a massive community of 10K+ players, and climb to the top.",
    },
    {
      icon: "/src/assets/privileges/team.svg",
      title: "Build & Manage Your Team",
      description: "Design your own football team, recruit players, and strategize your way to victory.",
    },
    {
      icon: "/src/assets/privileges/tournement.svg",
      title: "Host Your Own Tournament",
      description: "Organize and host football tournaments, set the rules, and watch the competition unfold.",
    },
    {
      icon: "/src/assets/privileges/strategize.svg",
      title: "Strategic Team Planning",
      description: "Utilize visual design tools to plan and strategize the plays for your team's success.",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-fit flex-wrap md:flex-nowrap  bg-[#2B332F]">
      {privileges.map((privilege, index) => (
        <div key={index} className="flex justify-center items-center w-full h-full">
          <PrivilegeCard
            icon={privilege.icon}
            title={privilege.title}
            description={privilege.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Privileges;
