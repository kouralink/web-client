import RefreeHeader from "@/components/global/RefreeHeader";
import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
// import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Match } from "@/types/types";
import { TeamMatch } from "@/types/types";
import { Timestamp } from "firebase/firestore";
// import { Match } from "@/types/types";


const MatchesReferee = () => {
    const userState = useSelector((state: RootState) => state.auth.user);

    // const matchesHistory = useSelector(
    //     (state: RootState) => state.team.MatchesHistory
    //   );

    return (
        <div className="flex flex-col gap-8">
            <RefreeHeader avatar={userState?.avatar ?? null} firstName={userState?.firstName ?? null} lastName={userState?.lastName ?? null} />
            <div>
                <div className="gap-4 w-full flex justify-end ">
                    <ScrollArea>
                        <Card className="flex flex-col gap-2  p-4 w-full lg:w-fit">
                            <h2>Match History</h2>
                            {matches.map((match: Match) => (
                                <MatchRefreeCard key={match.id} {...match} />
                            ))}
                        </Card>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

// Fake Data



// Helper function to create a new Timestamp

// Fake data for AddedToTeamMatch
const teamsInfo = [
    { logo: "https://example.com/logo1.png", name: "Team Alpha" },
    { logo: "https://example.com/logo2.png", name: "Team Beta" },
    { logo: "https://example.com/logo3.png", name: "Team Gamma" },
    { logo: "https://example.com/logo4.png", name: "Team Delta" }
];

// Fake data for TeamMatch
const teamMatches: TeamMatch[] = [
    { id: "team1", score: null, isAgreed: false },
    { id: "team2", score: null, isAgreed: false },
    { id: "team3", score: null, isAgreed: false },
    { id: "team4", score: null, isAgreed: false }
];

// Combine TeamMatch and AddedToTeamMatch
const combinedTeamMatches = teamMatches.map((teamMatch, index) => ({
    ...teamMatch,
    ...teamsInfo[index]
}));

// Fake data for Matches
const matches: Match[] = [
    {
        id: "match1",
        team1: combinedTeamMatches[0],
        team2: combinedTeamMatches[1],
        refree: { id: "ref1", isAgreed: true },
        createdAt: Timestamp.now() ,
        updatedAt: Timestamp.now(),
        startIn: null,
        endedAt: null,
        location: "Stadium A",
        status: "pending",
        type: "tournement"
    },
    {
        id: "match2",
        team1: combinedTeamMatches[2],
        team2: combinedTeamMatches[3],
        refree: { id: "ref2", isAgreed: true },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        startIn: null,
        endedAt: null,
        location: "Stadium B",
        status: "pending",
        type: "tournement"
    },
    {
        id: "match3",
        team1: combinedTeamMatches[0],
        team2: combinedTeamMatches[2],
        refree: { id: "ref3", isAgreed: true },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        startIn: null,
        endedAt: null,
        location: "Stadium C",
        status: "pending",
        type: "classic_match"
    },
    {
        id: "match4",
        team1: combinedTeamMatches[1],
        team2: combinedTeamMatches[3],
        refree: { id: "ref4", isAgreed: true },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        startIn: null,
        endedAt: null,
        location: "Stadium D",
        status: "pending",
        type: "classic_match"
    }
];


export default MatchesReferee;