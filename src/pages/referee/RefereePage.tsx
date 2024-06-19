import RefreeHeader from "@/components/global/RefreeHeader";
import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
// import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useParams } from "react-router-dom";
import { getRefereeMatchesAndInfo } from "@/state/user/userSlice";
import { useEffect } from "react";
import { Match, SearchedTournament } from "@/types/types";
import RefereeHistory from "@/components/global/RefereeHistory";
import TournamentCardIteam from "@/components/global/cards/TournamentCardIteam";
import { getRefreeTournamentsHistory } from "@/state/search/searchTournamentSlice";



const MatchesReferee = () => {
    // const userState = useSelector((state: RootState) => state.auth.user);
    const { refereeid } = useParams<{ refereeid: string }>();
    const user = useSelector((state: RootState) => state.user.user);
    const error = useSelector((state: RootState) => state.user.error);

    const matchesHistory = useSelector((state: RootState) => state.user.refereeMatches);
    const matcheIsLoading = useSelector((state: RootState) => state.user.status === "loading");
    const matcheTrackQuery = useSelector((state: RootState) => state.user.trackQuery);

    const tournamentsHistory = useSelector((state: RootState) => state.tournamentsearch.searchResults);
    const tournamentIsLoading = useSelector((state: RootState) => state.tournamentsearch.isLoading);
    const tournamentTrackQuery = useSelector((state: RootState) => state.tournamentsearch.trackQuery);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (refereeid) {
            dispatch(getRefereeMatchesAndInfo({ uid: refereeid, status: "all" }));
            dispatch(getRefreeTournamentsHistory({ uid: refereeid, status: "all" }));
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

            {/*//! Matches History */}
            <RefereeHistory<Match>
                refreeId={refereeid as string}
                title="Match"
                dataHistory={matchesHistory}
                isLoading={matcheIsLoading}
                trackQuery={matcheTrackQuery}
                fetchHistory={(payload) => dispatch(getRefereeMatchesAndInfo(payload))}
            >
                {(match) => <MatchRefreeCard key={match.id} {...match} />}
            </RefereeHistory>

            {/*//! Tournaments History */}
            <RefereeHistory<SearchedTournament>
                refreeId={refereeid as string}
                title="Tournament"
                dataHistory={tournamentsHistory}
                isLoading={tournamentIsLoading}
                trackQuery={tournamentTrackQuery}
                fetchHistory={(payload) => dispatch(getRefreeTournamentsHistory(payload))}
            >
                {(tournament) => <TournamentCardIteam key={tournament.id} {...tournament.tournament_info} />}
            </RefereeHistory>

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