import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateFakeTournament, getWinner } from './utils';

const BracketsComponent: React.FC = () => {
    const tournament = generateFakeTournament(16);

    // Group matches by stage
    const groupedMatches = tournament.stages.map(stage => ({
        stage,
        matches: stage.matches
    }));

    // Sort the grouped matches by stage id in ascending order
    groupedMatches.sort((a, b) => parseInt(a.stage.stage_id) - parseInt(b.stage.stage_id));

    const initialMatchHeight = 60;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tournament Bracket System</h1>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tournament.stages.length}, 1fr)`, gap: '4px' }}> {/* Set the number of grid columns to the number of stages */}
                {groupedMatches.map((group) => {
                    // Calculate the gap size based on the number of matches and the stage
                    const currentStageMatcheNumber = group.matches.length
                    const allDivCurrent = (tournament.participants.length / currentStageMatcheNumber) - 1
                    const gapSize = initialMatchHeight * allDivCurrent;

                    return (
                        <div key={group.stage.stage_id} className={`w-auto flex flex-col items-center justify-center bg-card p-2 mt-28 rounded shadow relative`} style={{ gap: `${gapSize}px` }}>
                            <Card style={{ height: `${initialMatchHeight}px` }} className="w-full absolute -top-24 bg-muted flex justify-center items-center  font-semibold mb-2">Stage {group.stage.stage_id}</Card>
                            {group.matches.map(match => {
                                const matchResult = getWinner(match.team1, match.team2);

                                return (
                                    <div key={match.id} style={{ minHeight: `${initialMatchHeight}px`, maxHeight: `${initialMatchHeight}px` }} className="w-full flex flex-col justify-center items-center relative">
                                        <p className="text-xs text-muted-foreground absolute -top-5">{match.matchStartDate.toDate().toUTCString().replace('GMT', '')}</p>
                                        <Card className="w-full h-1/2 bg-background flex justify-between items-center text-sm rounded-none border-x-2 hover:border-muted-foreground">
                                            <span className='h-full w-10/12 flex items-center px-2 text-xs'>{tournament.participants.find(participant => participant.team.id === match.team1.teamId)?.team.teamName ?? 'TBD'}</span>
                                            <Badge className='h-full w-2/12 flex justify-center items-center rounded-none' variant={matchResult[match.team1.teamId].variant}>{match.team1.teamScore}</Badge>
                                        </Card>
                                        <Card className="w-full h-1/2 bg-background flex justify-between items-center text-sm rounded-none border-x-2 hover:border-muted-foreground">
                                            <span className='h-full w-10/12 flex items-center px-2 text-xs'>{tournament.participants.find(participant => participant.team.id === match.team2.teamId)?.team.teamName ?? 'TBD'}</span>
                                            <Badge className='h-full w-2/12 flex justify-center items-center rounded-none' variant={matchResult[match.team2.teamId].variant}>{match.team2.teamScore}</Badge>
                                        </Card>
                                        <p className="text-xs text-muted-foreground absolute -bottom-5">RD {group.stage.stage_id}.{match.matchNumber}</p>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}


export default BracketsComponent;