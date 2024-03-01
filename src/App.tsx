import Header from "./components/global/Header";
import Navbar from "./components/global/Navbar";
import Privileges from "./components/global/Privileges";

export default function App() {
  return (
    <div className="min-h-[200%]">
      <div className="fixed z-10 w-full mt-2 px-2 ">
        <Navbar />
      </div>
      <Header title="Welcome to Kouralink" src="/src/assets/bg.png" />
      <div className="mb-8">
      <Privileges />
      </div>
    </div>
  );
}
