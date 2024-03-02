import FeatureContents from "./components/global/FeatureContents";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import { LiveEvenets } from "./components/global/LiveEvenets";
import Navbar from "./components/global/Navbar";
import Privileges from "./components/global/Privileges";
import SectionHead from "./components/global/SectionHead";
import SiteAnnouncements from "./components/global/SiteAnnouncements";
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
      <Testimonials />
      <SectionHead
        title="Site Announcements"
        description="Catch the latest announcements and upcoming events to stay ahead in the football action."
      />
      <SiteAnnouncements/>
      <Footer />
    </div>
  );
}
