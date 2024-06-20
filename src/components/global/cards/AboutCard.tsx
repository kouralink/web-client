import {
    Card,
    CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Facebook, Github, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
interface TeamMember {
    name: string;
    image: string;
    role: string;
    links: {
        github: string | null;
        linkedin: string | null;
        facebook: string | null;
        x: string | null;
    };
}[]

interface TeamCardProps {
    teamInfo: TeamMember;
}

const AboutCard: React.FC<TeamCardProps> = ({ teamInfo }) => {
    return (
        <Card className="w-[250px] h-[350px] flex-col  justify-between m-4">
            <div className="h-1/2 ">
                <Avatar className="bg-black h-full">
                    <AvatarImage
                        loading="lazy"
                        className="h-full w-full object-top object-cover"
                        src={teamInfo.image} alt="@shadcn">
                    </AvatarImage>
                </Avatar>
            </div>

            <div className="px-5">
                <h1 className="font-bold text-xl py-5">{teamInfo.name}</h1>
                <h2 className="text-gray-400">{teamInfo.role}</h2>
            </div>

            <CardFooter className="flex justify-between py-5">
                {teamInfo.links.facebook && <Link to={teamInfo.links.facebook} className="hover:text-green-600 rounded-lg"><Facebook /></Link>}
                {teamInfo.links.github && <Link to={teamInfo.links.github} className="hover:text-green-600 rounded-lg"><Github /></Link>}
                {teamInfo.links.linkedin && <Link to={teamInfo.links.linkedin} className="hover:text-green-600 rounded-lg"><Linkedin /></Link>}
                {teamInfo.links.x && <Link to={teamInfo.links.x} className="hover:text-green-600 rounded-lg"><X /></Link>}
            </CardFooter>
        </Card>
    )
}

export default AboutCard;