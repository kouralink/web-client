import { useEffect, useState } from "react";
import FeatureContents from "./components/global/FeatureContents";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import { LiveEvenets } from "./components/global/LiveEvenets";
import Navbar from "./components/global/Navbar";
import NewsLetter from "./components/global/NewsLetter";
import Privileges from "./components/global/Privileges";
import SectionHead from "./components/global/SectionHead";
import SiteAnnouncements from "./components/global/SiteAnnouncements";
import { Testimonials } from "./components/global/Testimonials";

export default function App() {
 
  // navbar on scroll effect  
  const [navStyle, setNavStyle] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setPrevScrollPos(currentScrollPos);

      // Show the navbar if scrolling up or at the top

      if (window.scrollY > 10) {
        if (!isScrolledDown) {
          setNavStyle("mt-0 px-0 bg-white rounded-none");
        } else {
          setNavStyle("display-none hidden");
        }
      } else {
        setNavStyle("bg-none mt-2");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);


  return (
    <div className="min-h-[200vh]">
      <div className={["fixed z-10 w-full mt-2  px-2 rounded-lg duration-300 transition-all", navStyle].join(" ")}>
        <Navbar />
      </div>
      <Header title="Welcome to Kouralink" src="/src/assets/bg.png" />
      <div className="">
        <Privileges />
      </div>
      <SectionHead
        title="Live Events"
        description="Immerse yourself in the excitement of live scores and unforgettable highlights, bringing you closer to the heart of the game."
      />
      <LiveEvenets />
      <SectionHead
        title="Feature Contents"
        description="Dive into exclusive features, stories, and highlights that showcase the best of the football world."
      />
      <FeatureContents />
      <SectionHead
        title="Testimonials"
        description="Discover what our community says about their unforgettable experiences and triumphs on our football platform."
      />
      <Testimonials />
      <SectionHead
        title="Site Announcements"
        description="Catch the latest announcements and upcoming events to stay ahead in the football action."
      />
      <SiteAnnouncements />
      <NewsLetter />
      <Footer />
    </div>
  );
}
