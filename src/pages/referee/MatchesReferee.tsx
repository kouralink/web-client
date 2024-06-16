import RefreeHeader from "@/components/global/RefreeHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useParams } from "react-router-dom";
import { getRefereeMatchesAndInfo } from "@/state/user/userSlice";
import { useEffect } from "react";
import RefreeMatchHistory from "@/components/global/RefreeMatchHistory";
import RefreeTournamentsHistory from "@/components/global/RefreeTournamentHistory";



const MatchesReferee = () => {
    // const userState = useSelector((state: RootState) => state.auth.user);
    const { refereeid } = useParams<{ refereeid: string }>();
    const user = useSelector((state: RootState) => state.user.user);
    const error = useSelector((state: RootState) => state.user.error);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (refereeid) {
            dispatch(getRefereeMatchesAndInfo({ uid: refereeid, status: "all" }));
        }
    }, [dispatch, refereeid])


    // [ ] : update user info and matches list by call dispatch getmatches and infos of user
    // [ ] : use useSlectore to lelect user info and matches list
    // [ ] : get errors and loading status and add some effect to page 
    // const matchesHistory = useSelector(
    //     (state: RootState) => state.team.MatchesHistory
    //   );

    return (
        <div className="flex flex-col gap-8 py-10">
            <RefreeHeader avatar={user?.avatar ?? null} firstName={user?.firstName ?? null} lastName={user?.lastName ?? null} />
            <p>{error}</p>
            <RefreeMatchHistory refreeId={refereeid as string} />
            <RefreeTournamentsHistory refreeId={refereeid as string} />
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