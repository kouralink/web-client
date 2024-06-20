import { AppDispatch, RootState } from "@/state/store";
import {
  getTeamByTeamName,
  getTeamMatchesHistory,
} from "@/state/team/teamSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MemberCard from "@/components/global/cards/MemberCard";
import TeamHeader from "@/components/global/TeamHeader";
import { Card } from "@/components/ui/card";
import TeamHistory from "@/components/global/TeamHistory";
import { Match, SearchedTournament } from "@/types/types";
import { getTeamTournamentsHistory } from "@/state/search/searchTournamentSlice";
import TournamentCardIteam from "@/components/global/cards/TournamentCardIteam";
import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";
// import MatchRefreeCard from "@/components/global/cards/MatchRefreeCard";


export const TeamPage = () => {
  const { paramteamname } = useParams<{ paramteamname: string }>();
  const userId = useSelector((state: RootState) => state.auth?.uid);
  const team = useSelector((state: RootState) => state.team.team);
  const members = useSelector((state: RootState) => state.team.members);
  const error = useSelector((state: RootState) => state.team.error);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const [role, setRole] = useState<"coach" | "member" | "user">("user");
  const [coach, setCoach] = useState(
    members.find((member) => member.role === "coach")
  );

  const matchesHistory = useSelector((state: RootState) => state.team.MatchesHistory);
  const matcheTrackQuery = useSelector((state: RootState) => state.team.trackQuery);
  const matcheIsLoading = useSelector((state: RootState) => state.team.status === "loading");

  const tournamentsHistory = useSelector((state: RootState) => state.tournamentsearch.searchResults);
  const tournamentTrackQuery = useSelector((state: RootState) => state.tournamentsearch.trackQuery);
  const tournamentIsLoading = useSelector((state: RootState) => state.tournamentsearch.isLoading);

  // update black list
  // useEffect(() => {
  //   console.log("updateing black list");
  //   if (accountType === "coach") {
  //     dispatch(updateBlackListInfos());
  //   }
  // }, [dispatch, team.blackList, accountType]);
  // set role
  useEffect(() => {
    if (userId === coach?.uid) {
      setRole("coach");
    } else {
      const isMemeber = members.find((member) => member.uid === userId);
      if (isMemeber) {
        setRole("member");
      } else {
        setRole("user");
      }
    }
  }, [userId, coach?.uid, members]);

  // if team doesn't exist redirect to team page
  useEffect(() => {
    if (error === "Team Doesn't Exist!") {
      // react router redirect to team page
      navigate(`/team`);
    }
  }, [error, navigate]);

  // get team by team name
  useEffect(() => {
    console.log("calling getTeamByTeamName()");
    dispatch(getTeamByTeamName(paramteamname as string));
  }, [paramteamname, dispatch]);


  // set coach
  useEffect(() => {
    setCoach(members.find((member) => member.role === "coach"));
  }, [members]);

  return (
    <div className="flex flex-col gap-8 mt-5">
      <TeamHeader {...team} role={role} />
      <div className="flex w-full gap-8 flex-col lg:flex-row  ">
        <Card className="min-h-[500px] flex flex-col py-4 px-2 gap-4 h-fit">
          <div className="flex flex-col gap-2">
            <h2>Coach</h2>
            <div className="ml-4">
              {coach ? (
                <MemberCard member={coach} key={coach.uid} role={role} />
              ) : (
                <p className="text-muted-foreground">Coach Not Found!</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Members</h2>
            <div className=" ml-4">
              {members.map((member) => {
                if (member.role !== "coach") {
                  return (
                    <MemberCard key={member.uid} member={member} role={role} />
                  );
                }
              })}
              {/* if the members len = 1 write no members yet message */}
              {members.length === 1 && (
                <p className="text-muted-foreground">No members yet</p>
              )}
            </div>
          </div>
        </Card>
        <div className="gap-4 w-full flex justify-end">
          {/*//! Matches History */}
          <TeamHistory<Match>
            teamId={team.id as string}
            title="Match"
            dataHistory={matchesHistory}
            isLoading={matcheIsLoading}
            trackQuery={matcheTrackQuery}
            fetchHistory={(payload) => dispatch(getTeamMatchesHistory(payload))}
          >
            {(match) => <MatchRefreeCard key={match.id} {...match} />}
          </TeamHistory>
        </div>
      </div>
        {/*//! Tournaments History */}
        <TeamHistory<SearchedTournament>
          teamId={team.id as string}
          title="Tournament"
          dataHistory={tournamentsHistory}
          isLoading={tournamentIsLoading}
          trackQuery={tournamentTrackQuery}
          fetchHistory={(payload) => dispatch(getTeamTournamentsHistory(payload))}
        >
          {(tournament) => <TournamentCardIteam key={tournament.id} {...tournament.tournament_info} />}
        </TeamHistory>
    </div >
  );
};
