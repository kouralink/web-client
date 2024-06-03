import SectionTitle from "@/components/global/SectionTitle"
import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Github, X } from "lucide-react";
import ContactFormCard from "@/components/global/cards/ContactFormCard"
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="w-full maxh-screen lg:h-fit flex flex-col items-center">
      <div className="py-12">
        <SectionTitle
          title="Contact Us"
          classesStyle="text-5xl lg:text-7xl  font-bold py-5"
        />{" "}
        <h2 className="text-gray-400">Any question or remarks? Just write us a message!</h2>
      </div>

      <div className="w-full h-fit lg:w-2/3 lg:h-fit  flex flex-col lg:flex-row ">

        <div className="w-full lg:w-1/3  bg-green-500 flex flex-col items-center lg:items-stretch justify-around px-11 rounded-t-2xl lg:rounded-none lg:rounded-l-3xl" >
          <div className="flex flex-col justify-center items-center py-2">
            <h1 className="text-3xl font-bold text-white">Contact Information</h1>
            <h2 className="text-gray-50">Say something to start a live chat!</h2>
          </div>
          <div className="h-1/3 flex flex-col justify-between ">
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><Phone /><span className="px-5" >06 15 33 1474</span></div>
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><Mail /><span className="px-5" >kouralink@gmail.com</span></div>
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><MapPin /><span className="px-5" >Ista Ntic Syba</span></div>
          </div>

          <div className="flex justify-between p-5  w-full">
            <Link to={"https://www.facebook.com/groups/1502550624004839"}><Facebook className="hover:bg-white hover:text-green-700 rounded-lg text-white" /></Link>
            <Link to={"https://github.com/kouralink"}><Github className="hover:bg-white hover:text-green-700 rounded-lg text-white" /></Link>
            <Link to={"https://x.com/Kouralink"}><X className="hover:bg-white hover:text-green-700 rounded-lg text-white" /></Link>
          </div>
        </div>
        <ContactFormCard />
      </div>
    </div>
  )
};

export default Contact;
