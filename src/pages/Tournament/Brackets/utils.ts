import { Timestamp } from "firebase/firestore";
import { MatchResult, Team, TeamMatchState, tournament, tournamentMatch, TournamentStages } from "./types";


//! ---------------------------- Generator Functions --------------------------------
function generateFakeTeams(numTeams: number): Team[] {
  return Array.from({ length: numTeams }, (_, i) => ({
    id: `${i + 1}`,
    teamName: `Team ${i + 1}`,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: `https://avatars.githubusercontent.com/u/14985020?v=4`,
    description: `This is a description of Team ${i + 1}.`,
    createdBy: `user${i + 1}`,
  }));
}

function generateFakeMatches(numMatches: number): tournamentMatch[] {
  return Array.from({ length: numMatches }, (_, i) => ({
    id: `${i + 1}`,
    matchNumber: i + 1,
    team1: {
      teamId: `${i * 2 + 1}`,
      teamScore: Math.floor(Math.random() * 5)
    },
    team2: {
      teamId: `${i * 2 + 2}`,
      teamScore: Math.floor(Math.random() * 5)
    },
    referee_id: `${i + 1}`,
    matchStartDate: Timestamp.now(),
    matchLocation: `Location ${i + 1}`,
    matchStatus: 'Progress',
  }));
}


// function createByeMatch(numParticipants: number): tournamentMatch {
//   return {
//     id: `${numParticipants + 1}`,
//     matchNumber: numParticipants + 1,
//     team1: {
//       teamId: `${numParticipants}`,
//       teamScore: 0
//     },
//     team2: {
//       teamId: 'bye',
//       teamScore: 0
//     },
//     referee_id: `${numParticipants + 1}`,
//     matchStartDate: Timestamp.now(),
//     matchLocation: `Location ${numParticipants + 1}`,
//     matchStatus: 'Progress',
//   };
// }


//? Without bye bye match
function generateTournamentStages(numParticipants: number): TournamentStages[] {
  const numStages = Math.ceil(Math.log2(numParticipants));
  const numMatches = Math.pow(2, numStages - 1);

  const stages = Array.from({ length: numStages }, (_, i) => {
    const numMatchesInStage = i === 0 ? numParticipants / 2 : numMatches / Math.pow(2, i);
    return {
      stage_id: `${i + 1}`,
      matches: generateFakeMatches(numMatchesInStage)
    };
  });

  return stages;
}

export function generateFakeTournament(numParticipants: number): tournament {
  // Check if the number of participants is a power of two
  if (Math.log2(numParticipants) % 1 !== 0) {
    alert('Number of participants must be a power of two')
    // throw new Error('Number of participants must be a power of two');
  }

  const teams = generateFakeTeams(numParticipants);
  const stages = generateTournamentStages(numParticipants);

  return {
    id: '1',
    tournamentName: `Tournament 1`,
    tournamentLogo: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    description: `This is a description of Tournament 1.`,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: 'user1',
    participants: teams.map((team, i) => ({ id: i + 1, team: team })),
    stages: stages,
  };
}


//! ---------------------------- Utility Functions --------------------------------

export function getWinner(team1: TeamMatchState, team2: TeamMatchState): MatchResult {
  let result: MatchResult = {};

  if (team1.teamScore > team2.teamScore) {
    result[team1.teamId] = { result: 'win', variant: 'default' };
    result[team2.teamId] = { result: 'lose', variant: 'destructive' };
  } else if (team1.teamScore < team2.teamScore) {
    result[team1.teamId] = { result: 'lose', variant: 'destructive' };
    result[team2.teamId] = { result: 'win', variant: 'default' };
  } else {
    result[team1.teamId] = { result: 'draw', variant: 'secondary' };
    result[team2.teamId] = { result: 'draw', variant: 'secondary' };
  }

  return result;
}