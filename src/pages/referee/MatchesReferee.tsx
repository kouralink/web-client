import RefreeHeader from "@/components/global/RefreeHeader";
import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
// import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterMatchStatus, Match } from "@/types/types";
// import { TeamMatch } from "@/types/types";
// import { Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getRefereeMatchesAndInfo } from "@/state/user/userSlice";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Match } from "@/types/types";



const MatchesReferee = () => {
    // const userState = useSelector((state: RootState) => state.auth.user);
    const { refereeid } = useParams<{ refereeid: string }>();
    const [status, setStatus] = useState<FilterMatchStatus>("all");
    const user = useSelector((state: RootState) => state.user.user);
    const matches = useSelector((state: RootState) => state.user.refereeMatches);
    const error = useSelector((state: RootState) => state.user.error);
    const isLoading = useSelector((state: RootState) => state.user.status === "loading");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (refereeid && status !== null) {
            dispatch(getRefereeMatchesAndInfo({ uid: refereeid, status: status }));
        }
    }, [dispatch, refereeid, status])


    // [ ] : update user info and matches list by call dispatch getmatches and infos of user
    // [ ] : use useSlectore to lelect user info and matches list
    // [ ] : get errors and loading status and add some effect to page 
    // const matchesHistory = useSelector(
    //     (state: RootState) => state.team.MatchesHistory
    //   );

    return (
        <div className="flex flex-col gap-8">
            <RefreeHeader avatar={user?.avatar ?? null} firstName={user?.firstName ?? null} lastName={user?.lastName ?? null} />
            <p>{error}</p>


            <div className="gap-4 w-full">
                <ScrollArea>
                    <Card className="flex flex-col gap-2 p-4 w-full lgkk:w-fit">
                        <h2>Match History</h2>
                        <Tabs defaultValue="all" className="space-y-4">
                            <TabsList>
                                <TabsTrigger onClick={() => setStatus("all")} value="all">All</TabsTrigger>
                                <TabsTrigger onClick={() => setStatus("pending")} value="pending">Pending</TabsTrigger>
                                <TabsTrigger onClick={() => setStatus("in_progress")} value="in_progress">In Progress</TabsTrigger>
                                <TabsTrigger onClick={() => setStatus("finish")} value="finish">Finish</TabsTrigger>
                                <TabsTrigger onClick={() => setStatus("cancled")} value="cancled">Cancled</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        {
                            isLoading ?
                                <div className='h-full w-full flex justify-center items-center'>
                                    <img src="/logo.svg" className="h-8 me-3 animate-spin" alt="Koulaink Logo" />
                                </div>
                                :
                                <>
                                    {
                                        matches.map((match: Match) => (
                                            <MatchRefreeCard key={match.id} {...match} />
                                        ))
                                    }
                                </>
                        }
                    </Card>
                </ScrollArea>
            </div>
        </div>
    );
}

// Fake Data



// Helper function to create a new Timestamp

// Fake data for AddedToTeamMatch
// const teamsInfo = [
//     { logo: "https://example.com/logo1.png", name: "Team Alpha" },
//     { logo: "https://example.com/logo2.png", name: "Team Beta" },
//     { logo: "https://example.com/logo3.png", name: "Team Gamma" },
//     { logo: "https://example.com/logo4.png", name: "Team Delta" }
// ];

// // Fake data for TeamMatch
// const teamMatches: TeamMatch[] = [
//     { id: "team1", score: null, isAgreed: false },
//     { id: "team2", score: null, isAgreed: false },
//     { id: "team3", score: null, isAgreed: false },
//     { id: "team4", score: null, isAgreed: false }
// ];

// // Combine TeamMatch and AddedToTeamMatch
// const combinedTeamMatches = teamMatches.map((teamMatch, index) => ({
//     ...teamMatch,
//     ...teamsInfo[index]
// }));

// // Fake data for Matches
// const matches: Match[] = [
//     {
//         id: "match1",
//         team1: combinedTeamMatches[0],
//         team2: combinedTeamMatches[1],
//         refree: { id: "ref1", isAgreed: true },
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         startIn: null,
//         endedAt: null,
//         location: "Stadium A",
//         status: "pending",
//         type: "tournament"
//     },
//     {
//         id: "match2",
//         team1: combinedTeamMatches[2],
//         team2: combinedTeamMatches[3],
//         refree: { id: "ref2", isAgreed: true },
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         startIn: null,
//         endedAt: null,
//         location: "Stadium B",
//         status: "pending",
//         type: "tournament"
//     },
//     {
//         id: "match3",
//         team1: combinedTeamMatches[0],
//         team2: combinedTeamMatches[2],
//         refree: { id: "ref3", isAgreed: true },
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         startIn: null,
//         endedAt: null,
//         location: "Stadium C",
//         status: "pending",
//         type: "classic_match"
//     },
//     {
//         id: "match4",
//         team1: combinedTeamMatches[1],
//         team2: combinedTeamMatches[3],
//         refree: { id: "ref4", isAgreed: true },
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//         startIn: null,
//         endedAt: null,
//         location: "Stadium D",
//         status: "pending",
//         type: "classic_match"
//     }
// ];


export default MatchesReferee;