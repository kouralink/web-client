import { AppDispatch, RootState } from "@/state/store";
import {
  getTeamByTeamName,
  getTeamMatchesHistory,
} from "@/state/team/teamSlice";
import { FilterMatchStatus, Match } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MatchRecordCardIteam from "@/components/global/cards/MatchRecordCardIteam";
import MemberCard from "@/components/global/cards/MemberCard";
import TeamHeader from "@/components/global/TeamHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


export const TeamPage = () => {
  const { paramteamname } = useParams<{ paramteamname: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);
  const members = useSelector((state: RootState) => state.team.members);
  const error = useSelector((state: RootState) => state.team.error);
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.auth?.uid);
  const matchesHistory = useSelector(
    (state: RootState) => state.team.MatchesHistory
  );
  const trackQuery = useSelector(
    (state: RootState) => state.team.trackQuery
  );
  const isLoading = useSelector(
    (state: RootState) => state.team.status === "loading"
  );
  const [status, setStatus] = useState<FilterMatchStatus>(null);
  const [role, setRole] = useState<"coach" | "member" | "user">("user");
  const [coach, setCoach] = useState(
    members.find((member) => member.role === "coach")
  );
  const observerRef = useRef(null);
  const firstRender = useRef(true);


  // Handle scroll event to fetch more matches
  useEffect(() => {
    if (firstRender.current || isLoading || matchesHistory.length === 0) {
      firstRender.current = false;
      return;
    } const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("Scrollllllllll")
        fetchTeamMatchesHistory();
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading, matchesHistory.length]);

  // updating team matches history
  useEffect(() => {
    if (status !== null) {
      console.log("calling fetchTeamMatchesHistory()");
      fetchTeamMatchesHistory()
    }
  }, [dispatch, team.id, status]);

  const fetchTeamMatchesHistory = () => {
    console.log({ teamId: team.id, status: status })
    dispatch(getTeamMatchesHistory({ teamId: team.id, status: (status ? status : "all") }));
  }

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
    <div className="flex flex-col gap-8 mt-5 ">
      <TeamHeader {...team} role={role} />
      <div className="flex w-full gap-8 flex-col lg:flex-row  ">
        <Card className=" flex flex-col py-4 px-2 gap-4 h-fit">
          <div className="flex flex-col gap-2">
            <h2>Coach</h2>
            <div className=" ml-4">
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
        <div className="gap-4 w-full flex justify-end ">
          <Card className="flex flex-col gap-2  p-4 w-full lg:w-fit">
            <h2>Match History</h2>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                {["all", "pending", "in_progress", "finish", "cancled"].map(
                  (status) => (
                    <TabsTrigger
                      key={status}
                      onClick={() => setStatus(status as FilterMatchStatus)}
                      value={status}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
            </Tabs>

            <>
              {
                matchesHistory.length === 0 &&
                <div className="text-muted-foreground ps-6">
                  No Matches History Found
                </div>
              }
              <ScrollArea className="h-96 w-full">
                <div className="flex flex-col gap-4 pr-6 w-full">
                  {matchesHistory.map((match: Match) => (
                    <MatchRecordCardIteam key={match.id} {...match} />
                  ))}
                  {isLoading && (
                    <div className='h-full w-full flex justify-center items-center'>
                      <img src="/logo.svg" className="h-8 me-3 my-5 animate-spin" alt="Koulaink Logo" />
                    </div>
                  )}
                  {trackQuery.lastDoc && <div ref={observerRef} style={{ height: '20px', visibility: 'visible' }} />}
                </div>
              </ScrollArea>
            </>
          </Card>
        </div>
      </div>
    </div >
  );
};
