import React from "react";
import PrivilegeCard from "./cards/PrivilegeCard";

interface PrivilegesProps {
  // Define your props here
}

const Privileges: React.FC<PrivilegesProps> = () => {
  const privileges = [
    {
      icon: "/privileges/global.svg",
      title: "Play with 10K+ Players",
      description: "Join a team, engage in matches with a massive community of 10K+ players, and climb to the top.",
    },
    {
      icon: "/privileges/team.svg",
      title: "Build & Manage Your Team",
      description: "Design your own football team, recruit players, and strategize your way to victory.",
    },
    {
      icon: "/privileges/tournement.svg",
      title: "Host Your Own Tournament",
      description: "Organize and host football tournaments, set the rules, and watch the competition unfold.",
    },
    {
      icon: "/privileges/strategize.svg",
      title: "Strategic Team Planning",
      description: "Utilize visual design tools to plan and strategize the plays for your team's success.",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-fit flex-wrap md:flex-nowrap  bg-footer text-footer-foreground">
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
