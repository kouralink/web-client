import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from "@/components/global/SectionTitle";
import { Link } from "react-router-dom";
import "./About.css";
import Navbar from "@/components/global/Navbar"
import { Facebook, Instagram, Mail } from "lucide-react";

const About = () => {
    return (

        <>
            <Navbar />
            <Card className="w-full h-full">
                <div className="flex bg-gray-400 h-1/2 w-full">
                    <div className="flex flex-col justify-between w-2/2">
                        <SectionTitle
                            title="About us"
                            classesStyle="text-lg  sm:text-1xl md:text-2xl lg:text-7xl p-5"
                        />
                        <p className="p-5 lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto optio perspiciatis excepturi reprehenderit temporibus quos ipsa, aspernatur error deleniti eaque dolore aliquam modi et ipsum nam doloremque, dolorem est deserunt.</p>
                        <p className="lg:text-2xl p-5">
                            for more information <Link to="#">LINK...</Link>
                            <CardDescription className="text-white">
                                Search and Join your team to collaborate with passionate individuals and enjoy a fulfilling experience together
                            </CardDescription>
                        </p>
                    </div>

                    <div className="bg-black bg-image">
                    </div>
                </div>

                <CardContent className="bg-green-600 h-1/2 w-svw p-40">
                    <div className="flex flex-wrap gap-4 justify-center section-container">
                        {[
                            { name: "Hamza Wahmane", image: "/WhatsApp Image 2024-06-01 at 08.44.05.jpeg" },
                            { name: "Meriem Maatouqui", image: "WhatsApp Image 2024-06-01 at 11.02.53.jpeg" },
                            { name: "Zoubair Najdaoui", image: "/WhatsApp Image 2024-06-01 at 08.48.54.jpeg" },
                            { name: "Nsila Abdellah", image: "/WhatsApp Image 2024-06-01 at 08.44.05 (1).jpeg" },
                        ].map((member) => (
                            <div key={member.name} className="contact-info-square">
                                <img src={member.image} alt={member.name} />
                                <p className="text-lg">{member.name}</p>
                                <div className="social-icons">
                                    <i className="fab fa-instagram"></i> <Instagram />
                                    <i className="fas fa-mail"></i>  <Mail />
                                    <i className="fab fa-facebook"></i> <Facebook />
                                </div>
                                
                            </div>

                        ))}
                        <div className="spacer"></div>
                    </div>
                </CardContent>

            </Card>
        </>
    );
};

export default About;