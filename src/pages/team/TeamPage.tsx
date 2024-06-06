import { AppDispatch, RootState } from "@/state/store";
import {
  getTeamByTeamName,
  getTeamMatchesHistory,
  updateBlackListInfos,
} from "@/state/team/teamSlice";
import { Match } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MatchRecordCardIteam from "@/components/global/cards/MatchRecordCardIteam";
import MemberCard from "@/components/global/cards/MemberCard";
import TeamHeader from "@/components/global/TeamHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TeamPage = () => {
  const { paramteamname } = useParams<{ paramteamname: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);
  const members = useSelector((state: RootState) => state.team.members);
  const error = useSelector((state: RootState) => state.team.error);
  const loading = useSelector((state: RootState) => state.team.status === "loading");
  const navigate = useNavigate();
  const accountType = useSelector(
    (state: RootState) => state.auth.user?.accountType
  );
  const userId = useSelector((state: RootState) => state.auth?.uid);
  const matchesHistory = useSelector(
    (state: RootState) => state.team.MatchesHistory
  );

  const [role, setRole] = useState<"coach" | "member" | "user">("user");
  const [coach, setCoach] = useState(
    members.find((member) => member.role === "coach")
  );

  // updating team matches history
  useEffect(() => {
    console.log("updating team matches history");
    dispatch(getTeamMatchesHistory({ teamId: team.id }));
  }, [dispatch, team.id]);

  // update black list
  useEffect(() => {
    console.log("updateing black list");
    if (accountType === "coach") {
      dispatch(updateBlackListInfos());
    }
  }, [dispatch, team.blackList, accountType]);
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
    dispatch(getTeamByTeamName(paramteamname as string));
  }, [paramteamname, dispatch]);

  // set coach
  useEffect(() => {
    setCoach(members.find((member) => member.role === "coach"));
  }, [members]);

  return (
    <div className="flex flex-col gap-8 mt-5 ">
      <TeamHeader {...team} role={role} />
      <div className="flex w-full gap-8 flex-col lg:flex-row  ">
        <Card className=" flex flex-col py-4 px-2 gap-4 h-fit">
          {loading ? <>Loading ...</> : !coach ? <>This Team has been Deleted!</>:
          <>
          <div className="flex flex-col gap-2">
            <h2>Coach</h2>
            <div className=" ml-4">
              {loading ? <p className="text-muted-foreground">Loading ...</p> : coach  ? (
                <MemberCard member={coach} key={coach.uid} role={role} />
              ) : (
                <p className="text-muted-foreground">No coach found!</p>
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
          </>}
        </Card>
        <div className="gap-4 w-full flex justify-end ">
          <Card className="flex flex-col gap-2  p-4 w-full lg:w-fit">
            <h2>Match History</h2>
            {matchesHistory.length === 0 ? (
              <div className="text-muted-foreground ps-6">No Matches History Found</div>
            ) : (
              <ScrollArea className="h-96 w-full">
                <div className="flex flex-col gap-4 pr-6 w-full">
                  {matchesHistory.map((match: Match) => (
                    <MatchRecordCardIteam key={match.id} {...match} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// const testTeamMatchHistory: MatchState[] = [
//   {
//     team1: {
//       teamId: "1",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 1",
//       teamScore: 2,
//     },
//     team2: {
//       teamId: "2",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 2",
//       teamScore: 1,
//     },
//     referee: "Referee 1",
//     matchDate: "2021-10-10",
//     matchTime: "10:00",
//     matchLocation: "Stadium 1",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "3",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 3",
//       teamScore: 3,
//     },
//     team2: {
//       teamId: "4",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 4",
//       teamScore: 0,
//     },
//     referee: "Referee 2",
//     matchDate: "2021-10-11",
//     matchTime: "11:00",
//     matchLocation: "Stadium 2",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "5",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 5",
//       teamScore: 6,
//     },
//     team2: {
//       teamId: "6",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 6",
//       teamScore: 2,
//     },
//     referee: "Referee 3",
//     matchDate: "2021-10-12",
//     matchTime: "12:00",
//     matchLocation: "Stadium 3",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "7",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 7",
//       teamScore: 4,
//     },
//     team2: {
//       teamId: "8",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 8",
//       teamScore: 4,
//     },
//     referee: "Referee 4",
//     matchDate: "2021-10-13",
//     matchTime: "13:00",
//     matchLocation: "Stadium 4",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "9",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 9",
//       teamScore: 3,
//     },
//     team2: {
//       teamId: "10",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 10",
//       teamScore: 2,
//     },
//     referee: "Referee 5",
//     matchDate: "2021-10-14",
//     matchTime: "14:00",
//     matchLocation: "Stadium 5",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "11",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 11",
//       teamScore: 3,
//     },
//     team2: {
//       teamId: "12",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 12",
//       teamScore: 2,
//     },
//     referee: "Referee 6",
//     matchDate: "2021-10-15",
//     matchTime: "15:00",
//     matchLocation: "Stadium 6",
//     matchStatus: "Finished",
//   },
//   {
//     team1: {
//       teamId: "13",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 13",
//       teamScore: 0,
//     },
//     team2: {
//       teamId: "14",
//       teamLogo: "https://via.placeholder.com/150",
//       teamName: "Team 14",
//       teamScore: 4,
//     },
//     referee: "Referee 7",
//     matchDate: "2021-10-16",
//     matchTime: "16:00",
//     matchLocation: "Stadium 7",
//     matchStatus: "Finished",
//   },
// ];
