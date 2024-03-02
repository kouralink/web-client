import Header from "./components/global/Header";
import { LiveEvenets } from "./components/global/LiveEvenets";
import Navbar from "./components/global/Navbar";
import Privileges from "./components/global/Privileges";
import SectionHead from "./components/global/SectionHead";

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
        title="Section Title"
        description="description Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure provident eum voluptates neque autem commodi cumque quod laudantium earum rem? Ab numquam asperiores sequi cumque expedita qui architecto maxime dolores."
      />
      <LiveEvenets/>
    </div>
  );
}
