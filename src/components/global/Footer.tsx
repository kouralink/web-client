import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex h-fit flex-col p-8 bg-footer text-footer-foreground">
      <div className="flex gap-6  min-w-full h-full justify-around items-center border-b-2 border-gray-500 pb-4 mb-4">
        <div className="flex flex-col w-fit min-h-full p-4 items-center text-center justify-center gap-4">
          <img src="/src/assets/logo.png" alt="logo" className="w-16 h-16" />
          <h2 className="text-2xl">Kouralink</h2>
        </div>
        <div className="flex w-full items-center justify-evenly hover:[&>div>ul>li]:cursor-pointer hover:[&>div>ul>li]:text-primary">
          <div className="flex flex-col gap-4">
            <h3 className="text-bold text-2xl">Navigation Links</h3>
            <ul className="flex flex-col gap-2">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-bold text-2xl">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>Join Team</li>
              <li>Create Team</li>
              <li>Join Tournament</li>
              <li>Create Tournament</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-bold text-2xl">Connect with Us</h3>
            <ul className="flex flex-col gap-2">
              <li>Discord</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Linkedin</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <p>&copy; 2024 Kouralink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
