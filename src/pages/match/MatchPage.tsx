import MatchInfoContainer from "@/components/global/match/MatchInfoContainer";
import MatchTeamContainer from "@/components/global/match/MatchTeamContainer";
import { auth } from "@/services/firebase";
import {
  getMatchById,
  getRefreeInfo,
  getTeamsInfo,
  getTeamsMembers,
} from "@/state/match/matchSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Member } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MatchPage: React.FC = () => {
  const matchId = useParams<{ matchId: string }>().matchId;
  const dispatch = useDispatch<AppDispatch>();
  const authUSERTYPE = useSelector(
    (state: RootState) => state.auth.user?.accountType
  );
  const match = useSelector((state: RootState) => state.match);
  const [coachOfTeam1, setCoachOfTeam1] = useState<Member | null>(null);
  const [coachOfTeam2, setCoachOfTeam2] = useState<Member | null>(null);

  const [userRoleInTeam1, setUserRoleInTeam1] = useState<
    "user" | "coach" | "member"
  >("user");
  const [userRoleInTeam2, setUserRoleInTeam2] = useState<
    "user" | "coach" | "member"
  >("user");

  useEffect(() => {
    if (!matchId) {
      return;
    }
    dispatch(getMatchById(matchId));
  }, [dispatch, matchId]);
  // get teamsInfo and memmbers info
  useEffect(() => {
    if (match.match.id) {
      dispatch(
        getTeamsInfo({ id1: match.match.team1.id, id2: match.match.team2.id })
      );
      dispatch(
        getTeamsMembers({
          id1: match.match.team1.id,
          id2: match.match.team2.id,
        })
      );
    }
  }, [dispatch, match.match.id, match.match.team1.id, match.match.team2.id]);
  // get referee info
  useEffect(() => {
    if (match.match.refree.id) {
      dispatch(getRefreeInfo(match.match.refree.id));
    }
  }, [dispatch, match.match.refree.id]);

  // get coach of team 1
  useEffect(() => {
    if (!match.team1Members.length) {
      return;
    }
    const coach = match.team1Members.find((member) => member.role === "coach");
    setCoachOfTeam1(coach || null);
  }, [match.team1Members]);
  // get coach of team 2
  useEffect(() => {
    if (!match.team2Members.length) {
      return;
    }
    const coach = match.team2Members.find((member) => member.role === "coach");
    setCoachOfTeam2(coach || null);
  }, [match.team2Members]);

  // update user role in team 1
  useEffect(() => {
    if (authUSERTYPE && authUSERTYPE === "coach") {
      if (auth.currentUser?.uid === coachOfTeam1?.uid) {
        setUserRoleInTeam1("coach");
      } else {
        setUserRoleInTeam1("user");
      }
    }
  }, [authUSERTYPE, coachOfTeam1?.uid]);

  // update user role in team 2

  useEffect(() => {
    if (authUSERTYPE && authUSERTYPE === "coach") {
      if (auth.currentUser?.uid === coachOfTeam2?.uid) {
        setUserRoleInTeam2("coach");
      } else {
        setUserRoleInTeam2("user");
      }
    }
  }, [authUSERTYPE, coachOfTeam2?.uid]);

  return (
    <div className="w-full h-fit container">
      <div className="flex w-full  items-center gap-6 flex-col md:flex-wrap md:flex-row xl:items-start xl:justify-between">
        <div className="order-2 xl:order-1 w-full md:w-auto md:flex-grow xl:flex-grow-0 xl:w-fit">
          <MatchTeamContainer
            {...match.team1Info}
            role={userRoleInTeam1}
            teamMembers={match.team1Members}
            coach={coachOfTeam1}
          />
        </div>
        <div className="order-1 xl:order-2 w-full xl:w-fit  ">
          <MatchInfoContainer
            role={
              userRoleInTeam1 === "coach" || userRoleInTeam2 === "coach"
                ? "coach"
                : "user"
            }
            {...match.match}
            isItRefree={
              auth.currentUser?.uid === match.match.refree.id &&
              match.match.refree.isAgreed
            }
            refree_user_info={match.refree}
          />
        </div>
        <div className="order-3 xl:order-3 w-full md:w-auto md:flex-grow xl:flex-grow-0 xl:w-fit">
          <MatchTeamContainer
            {...match.team2Info}
            role={userRoleInTeam2}
            teamMembers={match.team2Members}
            coach={coachOfTeam2}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
