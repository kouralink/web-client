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
      className="h-[75vh] relative bg-cover bg-center p-0 m-0 text-card"
    >
      <div className="w-full h-full flex   justify-center items-center backdrop-brightness-50">
        <Hero
          subtitle="Welcome to our football haven, where every goal, tackle, and victory finds its home. Get ready to dive into the thrilling world of football with us!"
          title={title}
        />
        <div
          className=" max-w-[400px] 
        ml-10 h-full 
        bg-[url('/src/assets/flish2.svg')] 
        
        bg-cover bg-center overflow-visible
        w-[950px] 
        hidden sm:flex items-center justify-center
        "
        ><img src="/src/assets/ofppt1.svg" alt="ofppt logo" className="" /></div>
      </div>
    </header>
  );
};

export default Header;
