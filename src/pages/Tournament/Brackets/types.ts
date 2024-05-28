import { Timestamp } from "firebase/firestore";

//! ---------------------------- Types --------------------------------

// ------------- Participant Team State -------------
export interface Team {
  id: string;
  teamName: string;
  blackList?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  teamLogo: string;
  description: string;
  createdBy: string;
}


export interface Participant {
  id: number;
  team: Team;
}


// ------------- team Match State -------------
export interface TeamMatchState {
  teamId: string;
  teamScore: number;
}

// ------------- Match Result Used in component display not in generation of data -------------
export type MatchResult = {
  [teamId: string]: {
    result: 'win' | 'lose' | 'draw';
    variant: 'default' | 'destructive' | 'secondary';
  };
};

// ------------- Tournament Match State -------------
export interface tournamentMatch {
  id: string;
  matchNumber: number;
  team1: TeamMatchState;
  team2: TeamMatchState;
  referee_id: string;
  matchStartDate: Timestamp;
  matchLocation: string;
  matchStatus: string;
}


// ------------- Tournament Stages State -------------
export interface TournamentStages {
  stage_id: string;
  matches: tournamentMatch[];
}


// ------------- Tournament State -------------
export interface tournament {
  id: string;
  tournamentName: string;
  tournamentLogo: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  participants: Participant[];
  stages: TournamentStages[];
}




//! ---------------------------- Demo Data --------------------------------
// const fakeTeams: Team[] = [
//   {
//     id: "1",
//     teamName: "Team 1",
//     createdAt: Timestamp.now(),
//     updatedAt: Timestamp.now(),
//     teamLogo: "https://avatars.githubusercontent.com/u/14985020?v=4",
//     description: "This is a description of Team 1.",
//     createdBy: "user1",
//   },
//   {
//     id: "2",
//     teamName: "Team 2",
//     createdAt: Timestamp.now(),
//     updatedAt: Timestamp.now(),
//     teamLogo: "https://avatars.githubusercontent.com/u/14985020?v=4",
//     description: "This is a description of Team 2.",
//     createdBy: "user2",
//   }
// ]


// const fakeMatches: tournamentMatch[] = [
//   {
//     id: "1",
//     matchNumber: 1,
//     team1: {
//       teamId: "1",
//       teamScore: 3
//     },
//     team2: {
//       teamId: "2",
//       teamScore: 2
//     },
//     teamScore: 3,
//     referee_id: "1",
//     matchStartDate: new Date().toISOString().split('T')[0],
//     matchLocation: `Location 1`,
//     matchStatus: 'Progress',
//   },
// ]

// const fakeTournamentStage: TournamentStages = {
//   stage_id: "1",
//   matches: fakeMatches
// }

//! -------------------------- Final Reult Perfect Tournament 7m ... 👀 ----------------------
// const tournament1: tournament = {
//   id: "1",
//   tournamentName: "Tournament 1",
//   tournamentLogo: "https://avatars.githubusercontent.com/u/14985020?v=4",
//   description: "This is a description of Tournament 1.",
//   startDate: new Date().toISOString().split('T')[0],
//   endDate: new Date().toISOString().split('T')[0],
//   createdAt: Timestamp.now(),
//   updatedAt: Timestamp.now(),
//   createdBy: "user1",
//   participants: [
//     {
//       id: 1,
//       team: {
//         id: "1",
//         teamName: "Team 1",
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         teamLogo: "https://avatars.githubusercontent.com/u/14985020?v=4",
//         description: "This is a description of Team 1.",
//         createdBy: "user1",
//       }
//     },
//     {
//       id: 2,
//       team: {
//         id: "2",
//         teamName: "Team 2",
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         teamLogo: "https://avatars.githubusercontent.com/u/14985020?v=4",
//         description: "This is a description of Team 2.",
//         createdBy: "user2",
//       }
//     }
//   ],
//   stages: [
//     {
//       stage_id: "1",
//       matches: [
//         {
//           id: "1",
//           matchNumber: 1,
//           team1: {
//             teamId: "1",
//             teamScore: 3
//           },
//           team2: {
//             teamId: "2",
//             teamScore: 2
//           },
//           teamScore: 3,
//           referee_id: "1",
//           matchStartDate: new Date().toISOString().split('T')[0],
//           matchLocation: `Location 1`,
//           matchStatus: 'Progress',
//         },
//       ]
//     }
//   ]
// }









