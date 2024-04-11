import { AppDispatch, RootState } from "@/state/store";
import { getTeam } from "@/state/team/teamSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const TeamPage = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const team = useSelector((state: RootState) => state.team.team);
    
    useEffect(() => {
        console.log(team)
        if (!teamId) return;
        if (teamId === team.id) return;
        dispatch(getTeam(teamId as string));
    }, [dispatch, team.id, teamId]);
    //TODO: how to slove error that happen when open the team page
    return (
        <div>
            <h1>Team Layout</h1>
            <p>Team Name: {team.teamName}</p>
            <p>Coatch: {team.coach}</p>
            <p>Description: {team.description}</p>
        </div>
    );
}