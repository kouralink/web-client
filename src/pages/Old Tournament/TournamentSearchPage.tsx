import React from 'react';
import TournamentCard from './TournamentCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export interface TournamentCardProps {
    id: string;
    name: string;
    description: string;
    owner: string;
    participants: number;
    progress: number,
    status: "Preparation" | "Waiting" | "InProgress" | "Finished" | "Cancelled";
    template: string;
}

const TournamentSearchPage: React.FC = () => {

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col gap-2 items-center py-5">
            {/* Header */}
            <Card className="w-full xlg:w-4/5 md:w-11/12 flex justify-between items-end px-4 py-5 bg-transparent">
                <div className="flex flex-col items-start">
                    <h6>Page</h6>
                    <h3 className="text-4xl font-bold text-primary">Tournaments</h3>
                </div>
                <div className="h-full flex flex-col justify-center gap-2">
                    <Button className="w-full" variant="default" asChild>
                        <Link to={"/tournament/CreateTournament"}>Create Tournament</Link>
                    </Button>
                </div>
            </Card>
            <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
                {tournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
            </div>
        </div>
    );
};


const tournaments: TournamentCardProps[] = [
    {
        id: "1",
        name: 'Tournament 1',
        description: 'Tournament 1 Description',
        owner: 'Tournament 1 Owner',
        participants: 10,
        progress: 10,
        status: 'Preparation',
        template: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2017/09/11/2165418-45265770-2560-1440.jpg"
    },
    {
        id: "2",
        name: 'Tournament 2',
        description: 'Tournament 2 Description',
        owner: 'Tournament 2 Owner',
        participants: 5,
        progress: 10,
        status: 'InProgress',
        template: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2017/09/11/2165418-45265770-2560-1440.jpg"
    },
    {
        id: "3",
        name: 'Tournament 3',
        description: 'Tournament 3 Description',
        owner: 'Tournament 3 Owner',
        participants: 8,
        progress: 10,
        status: 'Waiting',
        template: "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2017/09/11/2165418-45265770-2560-1440.jpg"
    },
];

export default TournamentSearchPage;