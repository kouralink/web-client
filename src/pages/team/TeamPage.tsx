import { AppDispatch, RootState } from "@/state/store";
import { getTeam } from "@/state/team/teamSlice";
import { MatchState, MemberState } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MatchRecordCardIteam from "@/components/global/cards/MatchRecordCardIteam";
import MemberCard from "@/components/global/cards/MemberCard";
import TeamHeader from "@/components/global/TeamHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TeamPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);

  useEffect(() => {
    console.log(team);
    if (!teamId) return;
    if (teamId === team.id) return;
    dispatch(getTeam(teamId as string));
  }, [dispatch, team, team.id, teamId]);
  return (
    <div className="flex flex-col gap-8 mt-5 ">
      <TeamHeader
        logo={"logo"}
        stars={1000}
        teamId="13"
        teamname="Pixels Bytes"
      />
      <div className="flex gap-8 ">
        <Card className=" flex flex-col py-4 px-2 gap-4 h-fit">
        <div className="flex flex-col gap-2">

            <h2>Coach</h2>
            <MemberCard
              username="Coach"
              logo="https://via.placeholder.com/150"
              uid="564654sdfdsfsdfd4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2>Members</h2>
            {testMember.map((member: MemberState, index: number) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </Card>
        <div className="p-2 gap-4 w-full flex justify-center items-center">
        <div className="flex flex-col gap-2 ">

          <h2>Match History</h2>
          <ScrollArea className="h-96">
            <div className="flex flex-col gap-4 pr-6">

          {testTeamMatchHistory.map((match: MatchState, index: number) => (
            <MatchRecordCardIteam key={index} {...match} />
          ))}
          </div>
          </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

const testMember: MemberState[] = [
  {
    username: "User 1",
    logo: "https://via.placeholder.com/150",
    uid: "1",
  },
  {
    username: "User 2",
    logo: "https://via.placeholder.com/150",
    uid: "2",
  },
  {
    username: "User 3",
    logo: "https://via.placeholder.com/150",
    uid: "3",
  },
  {
    username: "User 4",
    logo: "https://via.placeholder.com/150",
    uid: "4",
  },
];

const testTeamMatchHistory: MatchState[] = [
  {
    team1: {
      teamId: "1",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 1",
      teamScore: 2,
    },
    team2: {
      teamId: "2",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 2",
      teamScore: 1,
    },
    referee: "Referee 1",
    matchDate: "2021-10-10",
    matchTime: "10:00",
    matchLocation: "Stadium 1",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "3",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 3",
      teamScore: 3,
    },
    team2: {
      teamId: "4",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 4",
      teamScore: 0,
    },
    referee: "Referee 2",
    matchDate: "2021-10-11",
    matchTime: "11:00",
    matchLocation: "Stadium 2",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "5",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 5",
      teamScore: 6,
    },
    team2: {
      teamId: "6",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 6",
      teamScore: 2,
    },
    referee: "Referee 3",
    matchDate: "2021-10-12",
    matchTime: "12:00",
    matchLocation: "Stadium 3",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "7",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 7",
      teamScore: 4,
    },
    team2: {
      teamId: "8",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 8",
      teamScore: 4,
    },
    referee: "Referee 4",
    matchDate: "2021-10-13",
    matchTime: "13:00",
    matchLocation: "Stadium 4",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "9",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 9",
      teamScore: 3,
    },
    team2: {
      teamId: "10",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 10",
      teamScore: 2,
    },
    referee: "Referee 5",
    matchDate: "2021-10-14",
    matchTime: "14:00",
    matchLocation: "Stadium 5",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "11",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 11",
      teamScore: 3,
    },
    team2: {
      teamId: "12",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 12",
      teamScore: 2,
    },
    referee: "Referee 6",
    matchDate: "2021-10-15",
    matchTime: "15:00",
    matchLocation: "Stadium 6",
    matchStatus: "Finished",
  },
  {
    team1: {
      teamId: "13",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 13",
      teamScore: 0,
    },
    team2: {
      teamId: "14",
      teamLogo: "https://via.placeholder.com/150",
      teamName: "Team 14",
      teamScore: 4,
    },
    referee: "Referee 7",
    matchDate: "2021-10-16",
    matchTime: "16:00",
    matchLocation: "Stadium 7",
    matchStatus: "Finished",
  },
    
];


