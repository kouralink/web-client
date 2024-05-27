import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type TournamentType = {
    id: string;
    name: string;
    description: string;
    owner: string;
    participants: number;
    status: string;
}

interface TournamentCardProps {
    tournament: TournamentType;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    const navigate = useNavigate()

    const TournamentDetails = () => {
        navigate(`/tournament/${tournament.id}`)
    }

    return (
        <Card onClick={() => TournamentDetails()} className="w-11/12 h-36 flex justify-between px-5 cursor-pointer hover:border-primary">
            <div className='flex flex-col justify-center items-center'>
                <img src="https://organizer.toornament.com/disciplines/generic/img/icon-48x48-medium.png?1716557393" alt="Tournament" />
            </div>
            <div className='w-2/4 flex flex-col justify-center'>
                <h2 className='text-xl font-semibold'>{tournament.name}</h2>
                <p>{tournament.description}</p>
            </div>
            <div className='flex flex-col justify-center'>
                <Badge className='w-20 flex justify-center items-center'>{tournament.status}</Badge>
            </div>
        </Card>
    );
};

export default TournamentCard;