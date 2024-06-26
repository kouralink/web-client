import React from "react";
import Hero from "./Hero";

interface HeaderProps {
  title: string;
  src: string;
}

const Header: React.FC<HeaderProps> = ({ title, src }) => {
  return (
    <header
      style={{
        backgroundImage: `url(${src})`,
      }}
      className="h-[75vh] relative bg-cover bg-center p-0 m-0 text-card dark:text-card-foreground"
    >
      <div className="w-full h-full flex   justify-center items-center backdrop-brightness-50">
        <Hero
          subtitle="Welcome to our football haven, where every goal, tackle, and victory finds its home. Get ready to dive into the thrilling world of football with us!"
          title={title}
        />
        <div
          className=" max-w-[400px] 
        ml-10 h-full 
        bg-[url('/flishOfppt.svg')] 
        
        bg-cover bg-left  overflow-visible
        w-full 
        hidden sm:flex items-center justify-center
        "
        >
        </div>
      </div>
    </header>
  );
};

export default Header;
