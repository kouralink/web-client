import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { ReactNode } from 'react';
export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }: { children: ReactNode }) => (
      <SVGViewer width={1400} height={450} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
const matches = [
    {
      id: 1,
      name: "Round 1 - Match 1",
      nextMatchId: 5,
      tournamentRoundText: "1",
      startTime: "2023-06-01",
      state: "DONE",
      participants: [
        {
          id: "1",
          resultText: "WON",
          isWinner: true,
          status: "PLAYED",
          name: "Team 1"
        },
        {
          id: "2",
          resultText: "LOST",
          isWinner: false,
          status: "PLAYED",
          name: "Team 2"
        }
      ]
    },
    {
      id: 2,
      name: "Round 1 - Match 2",
      nextMatchId: 5,
      tournamentRoundText: "1",
      startTime: "2023-06-01 30:0",
      state: "DONE",
      participants: [
        {
          id: "3",
          resultText: "WON",
          isWinner: true,
          status: "PLAYED",
          name: "Team 3"
        },
        {
          id: "4",
          resultText: "LOST",
          isWinner: false,
          status: "PLAYED",
          name: "Team 4"
        }
      ]
    },
    {
      id: 3,
      name: "Round 1 - Match 3",
      nextMatchId: 6,
      tournamentRoundText: "1",
      startTime: "2023-06-01",
      state: "DONE",
      participants: [
        {
          id: "5",
          resultText: "WON",
          isWinner: true,
          status: "PLAYED",
          name: "Team 5"
        },
        {
          id: "6",
          resultText: "LOST",
          isWinner: false,
          status: "PLAYED",
          name: "Team 6"
        }
      ]
    },
    {
      id: 4,
      name: "Round 1 - Match 4",
      nextMatchId: 6,
      tournamentRoundText: "1",
      startTime: "2023-06-01",
      state: "DONE",
      participants: [
        {
          id: "7",
          resultText: "WON",
          isWinner: true,
          status: "PLAYED",
          name: "Team 7"
        },
        {
          id: "8",
          resultText: "LOST",
          isWinner: false,
          status: "PLAYED",
          name: "Team 8"
        }
      ]
    },
    {
      id: 5,
      name: "Round 2 - Match 1",
      nextMatchId: 7,
      tournamentRoundText: "2",
      startTime: "2023-06-02",
      state: "NO_SHOW",
      participants: [
        {
          id: "1",
          resultText: "",
          isWinner: false,
          status: "DONE",
          name: "Team 1"
        },
        {
          id: "3",
          resultText: "dd",
          isWinner: false,
          status: "NO_SHOW",
          name: "Team 3"
        }
      ]
    },
    {
      id: 6,
      name: "Round 2 - Match 2",
      nextMatchId: 7,
      tournamentRoundText: "2",
      startTime: "2023-06-02",
      state: "NO_SHOW",
      participants: [
        {
          id: "5",
          resultText: "WON",
          isWinner: true,
          status: "NO_SHOW",
          name: "Team 5"
        },
        {
          id: "7",
          resultText: "LOST",
          isWinner: false,
          status: "NO_SHOW",
          name: "Team 7"
        }
      ]
    },
    {
      id: 7,
      name: "Final - Match",
      nextMatchId: null,
      tournamentRoundText: "3",
      startTime: "2023-06-03",
      state: "NO_SHOW",
      participants: [
        {
          id: "1",
          resultText: "WON",
          isWinner: true,
          status: "NO_SHOW",
          name: "Team 1"
        },
        {
          id: "5",
          resultText: "LOST",
          isWinner: false,
          status: "NO_SHOW",
          name: "l3waqa"
        }
      ]
    }
  ];