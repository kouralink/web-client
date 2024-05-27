// src/App.tsx
import React from 'react';
import { tournament32 as tournament } from './data';
import { Card } from '@/components/ui/card';

const BracketsComponent: React.FC = () => {
  // Group matches by stage
  const groupedMatches = tournament.stage.map(stage => ({
    stage,
    matches: tournament.match.filter(match => match.stage_id === stage.id)
  }));

  // Sort the grouped matches by stage id in ascending order
  groupedMatches.sort((a, b) => a.stage.id - b.stage.id);

  const initialMatchHeight = 70;


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tournament Bracket System</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tournament.stage.length}, 1fr)`, gap: '2px' }}> {/* Set the number of grid columns to the number of stages */}
        {groupedMatches.map((group) => {
          // Calculate the gap size based on the number of matches and the stage
          const currentStageMatcheNumber = group.matches.length
          const allDivCurrent = (tournament.participant.length / currentStageMatcheNumber)-1
          const gapSize = initialMatchHeight*allDivCurrent;
          console.log("initialMatchHeight*allDivCurrent: ",initialMatchHeight*allDivCurrent)

          return (
            <div key={group.stage.id} className={`flex flex-col items-center justify-center bg-primary-700 p-2 rounded shadow`} style={{ gap: `${gapSize}px` }}>
              {/* <h2 className="font-semibold mb-2">{group.stage.name}</h2> */}
              {group.matches.map(match => (
                <div key={match.id} style={{ minHeight: `${initialMatchHeight}px`, maxHeight: `${initialMatchHeight}px` }} className={`w-full flex flex-col justify-center gap-1 items-center border px-2`}>
                  {/* <p>Match {match.id + 1}</p> */}
                  <Card className="w-full h-6 text-center text-sm">
                    {tournament.participant[match.opponent1.id]?.name ?? 'TBD'}
                  </Card>
                  <Card className="w-full h-6 text-center text-sm">
                    {tournament.participant[match.opponent2.id]?.name ?? 'TBD'}
                  </Card>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BracketsComponent;