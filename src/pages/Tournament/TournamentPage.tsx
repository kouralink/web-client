import { useNavigate, useParams } from "react-router-dom";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDownIcon } from "lucide-react";
import { TournamentCardProps } from "./TournamentSearchPage";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const TournamentPage = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const navigate = useNavigate()

    useEffect(() => {
        console.log(tournamentId)
    }, [])


    return (
        <div className="h-full w-full flex flex-col bg-red-400 relative">
            <img src={tournament.template} alt="Tournament" className="w-full h-[500px] object-cover" />
            <div className="absolute top-0 left-0 w-full h-auto flex items-center justify-center">
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-10 px-2 sm:px-16 mt-72 bg-neutral-950 bg-opacity-80">
                    <h1 className="text-4xl text-center font-bold text-white">{tournament.name}</h1>
                    <div className="w-3/4 sm:w-5/12 flex gap-4 text-white">
                        <div className="w-4/5 flex flex-col justify-center gap-2 items-center">
                            <h2 className="text-lg">{tournament.progress}% played</h2>
                            <Progress className="h-2" value={tournament.progress} />
                        </div>
                        <Separator orientation="vertical" />
                        <div className="w-1/5 flex flex-col justify-center gap-2 items-center">
                            <h2 className="text-3xl">{tournament.participants}</h2>
                            <h3>Participants</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Menubar className="pl-[5%]">
                <MenubarMenu>
                    <MenubarTrigger>Informations</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="flex justify-between items-center gap-1">
                        Matches
                        <ChevronDownIcon size={15} className="mt-1" />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Planings</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Last Results</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Next Results</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Participants</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Régles</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            <div className="min-h-[400px] p-5 bg-orange-400">
                <Card className="h-auto">
                    <CardHeader>
                        <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-10 rounded-md border p-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Tournament Name
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {tournament.name}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Description
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {tournament.description}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Tournament Brackets
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    <Button onClick={() => navigate("/tournament/tournamentBrackets")} className="w-full" variant="default">Tournament Brackets</Button>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Owner
                                </p>
                                <div className="text-sm text-muted-foreground">
                                    <span className="flex justify-start space-x-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/vercel.png" />
                                            <AvatarFallback>VC</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <span className="text-sm font-semibold">@nextjs</span>
                                            <p className="text-sm">
                                                The React Framework – created and maintained by @vercel.
                                            </p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-10 rounded-md border border-red-600 p-4 m-4">

                        <p className="w-full text-red-600 text-left">Actions</p>
                    </CardFooter>
                </Card>
            </div>

        </div>
    );
};

const tournament: TournamentCardProps =
{
    id: "1",
    name: 'Tournament 1',
    description: 'Tournament 1 Description',
    owner: 'Tournament 1 Owner',
    participants: 8,
    progress: 10,
    status: 'Preparation',
    template: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2017/09/11/2165418-45265770-2560-1440.jpg"
};



