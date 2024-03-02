import FeatureContents from "./components/global/FeatureContents";
import Header from "./components/global/Header";
import { LiveEvenets } from "./components/global/LiveEvenets";
import Navbar from "./components/global/Navbar";
import Privileges from "./components/global/Privileges";
import SectionHead from "./components/global/SectionHead";
import { Testimonials } from "./components/global/Testimonials";

export default function App() {
  return (
    <div className="min-h-[200%]">
      <div className="fixed z-10 w-full mt-2 px-2 ">
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
      <LiveEvenets/>
      <SectionHead
        title="Feature Contents"
        description="Dive into exclusive features, stories, and highlights that showcase the best of the football world."
      />
      <FeatureContents />
      <SectionHead
        title="Testimonials"
        description="Discover what our community says about their unforgettable experiences and triumphs on our football platform."
      />
      {/* <TestimonialsCard accountType="tournament manager" name="khlifa" rate={4.5} src="/src/assets/logo.png" testimonial="Being part of this platform has been a game-changer for me. The opportunity to connect with fellow football enthusiasts, join exciting tournaments, and experience top-notch gameplay has truly elevated my love for the sport."/> */}
      <Testimonials />
    </div>
  );
}
