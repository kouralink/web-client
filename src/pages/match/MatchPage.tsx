import {
  getMatchById,
  getRefreeInfo,
  getTeamsInfo,
  getTeamsMembers,
} from "@/state/match/matchSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MatchPage: React.FC = () => {
  const matchId = useParams<{ matchId: string }>().matchId;
  const dispatch = useDispatch<AppDispatch>();
  const match = useSelector((state: RootState) => state.match);
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
    if (match.match.referee_id) {
      dispatch(getRefreeInfo(match.match.referee_id));
    }
  }, [dispatch, match.match.referee_id]);
  return (
    <div>
      <h1>Match Page</h1>
      <div>
        <h2>Match Info</h2>
        <p>Team1: {match.match.team1.id}</p>
        <p>Team2: {match.match.team2.id}</p>
        <p>Referee: {match.refree?.username}</p>
      </div>
    </div>
  );
};

export default MatchPage;
