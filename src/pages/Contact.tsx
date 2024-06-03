import SectionTitle from "@/components/global/SectionTitle"
import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Github, X } from "lucide-react";
import ContactFormCard from "@/components/global/cards/ContactFormCard"

const Contact = () => {
  return (
    <div className="w-full maxh-screen lg:h-screen flex flex-col items-center">
      <div className="py-12">
        <SectionTitle
          title="Contact Us"
          classesStyle="text-5xl lg:text-7xl  font-bold py-5"
        />{" "}
        <h2 className="text-gray-400">Any question or remarks? Just write us a message!</h2>
      </div>

      <div className="w-full h-5/6 lg:w-2/3 lg:h-2/3  flex flex-col lg:flex-row ">

        <div className="w-full lg:w-1/3 h-full bg-green-500 flex flex-col items-center lg:items-stretch justify-around px-11 rounded-t-2xl lg:rounded-none lg:rounded-l-3xl" >
          <div className="flex flex-col justify-center items-center py-2">
            <h1 className="text-3xl font-bold text-white">Contact Information</h1>
            <h2 className="text-gray-50">Say something to start a live chat!</h2>
          </div>
          <div className="h-1/3 flex flex-col justify-between ">
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><Phone /><span className="px-5" >+212 6 00 00 00 00</span></div>
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><Mail /><span className="px-5" >example@gmail.com</span></div>
            <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start py-5 text-white"><MapPin /><span className="px-5" >Ista Ntic Syba</span></div>
          </div>

          <div className="flex justify-between p-5  w-full">
            <Facebook className="hover:bg-white hover:text-green-700 rounded-lg text-white" />
            <Github className="hover:bg-white hover:text-green-700 rounded-lg text-white" />
            <X className="hover:bg-white hover:text-green-700 rounded-lg text-white" />
          </div>
        </div>
        <ContactFormCard />
      </div>
    </div>
  )
};

export default Contact;
