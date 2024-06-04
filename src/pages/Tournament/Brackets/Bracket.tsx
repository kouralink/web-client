// // src/Bracket.tsx
// import React from 'react';
// import Round from './Round';
// import { Round as RoundType, Match as MatchType } from './types';

// interface BracketProps {
//   rounds: RoundType[];
//   matches: MatchType[];
//   updateMatchScore: (matchId: number, opponent: 'opponent1' | 'opponent2', newScore: number) => void;
// }

// const Bracket: React.FC<BracketProps> = ({ rounds, matches, updateMatchScore }) => {
//   return (
//     <div>
//       <h2>Bracket</h2>
//       {rounds.map((round) => (
//         <Round key={round.id} round={round} matches={matches} updateMatchScore={updateMatchScore} />
//       ))}
//     </div>
//   );
// };

// export default Bracket;
