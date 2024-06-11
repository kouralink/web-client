import TournamentHeader from "@/components/global/tournament/TournamentHeader";
import { useParams } from "react-router-dom";
import TournamentRefereesList from "@/components/global/tournament/TournamentRefereesList";
import TournamentTeamsList from "@/components/global/tournament/TournamentTeamsList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getTournamentById } from "@/state/tournament/tournamentSlice";
import { getCoachTeamId } from "@/state/notification/notificationSlice";
import TournementInfoCard from "@/components/global/tournament/cards/TournementInfoCard";

export const TournamentPage = () => {
  const { paramtourid } = useParams<{ paramtourid: string }>();
  const userId = useSelector((state: RootState) => state.auth?.uid);
  const userInfo = useSelector((state: RootState) => state.auth?.user);
  const [role, setRole] = useState<
    "user" | "coach_inside" | "coach_outside" | "refree" | "tournament_manager"
  >("user");
  const tournament = useSelector(
    (state: RootState) => state.tournament.tournament
  );
  const managerInfo = useSelector(
    (state: RootState) => state.tournament.managerInfo
  );
  const participantsTeams = useSelector(
    (state: RootState) => state.tournament.teamsInfo
  );
  const referees = useSelector(
    (state: RootState) => state.tournament.refereesInfo
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTournamentById(paramtourid as string));
  }, [dispatch, paramtourid]);

  useEffect(() => {
    if (userInfo) {
      const accountType = userInfo.accountType;
      let role:
        | "user"
        | "coach_inside"
        | "coach_outside"
        | "refree"
        | "tournament_manager" = "user";
      if (accountType === "user" || accountType === "player") {
        role = "user";
        setRole(role);
      } else if (accountType === "coach") {
        getCoachTeamId()
          .then((teamid) => {
            if (
              typeof teamid === "string" &&
              tournament.participants.includes(teamid)
            ) {
              role = "coach_inside";
              setRole(role);
            } else {
              setRole("coach_outside");
            }
          })
          .catch(() => {
            role = "user";
            setRole(role);
          });
      } else if (accountType === "refree") {
        role = tournament.refree_ids.includes(userId) ? "refree" : "user";
        setRole(role);
      } else if (accountType === "tournament_manager") {
        // tournament_manager => tournament_manager
        role = tournament.manager_id === userId ? "tournament_manager" : "user";
        setRole(role);
      }
    }
  }, [userInfo, tournament, userId]);

  return (
    <div className="flex flex-col gap-8 mt-5 w-full container">
      <TournamentHeader role={role} {...tournament} />
      {/* <p>
        TODO LAK YA LHMIZ HIHIHI "|:D" : Add tournament info card contain
        tournament details (tournament manager)&&(min members in team
        required)&&(current participant / max particiapnat ) (start date) &&
        (location) && (description) && (status) && (created at)
      </p> */}
      <TournementInfoCard teams={participantsTeams.length}
        refree={referees.length}
        maxparticipant={tournament.max_participants}
        create_at={tournament.created_at}
        bio={tournament.description}
        start={tournament.start_date}
        location={tournament.location}
        manager={managerInfo} />

      <TournamentRefereesList referees={referees} />
      <TournamentTeamsList
        teams={participantsTeams}
        isManager={userId === tournament.manager_id}
      />
    </div>
  );
};

// Examples of data that can be used to test the page
// const exampleTournament: Tournament = {
//   id: "1",
//   name: "Tournament Name",
//   logo: "https://via.placeholder.com/150",
//   location: "#",
//   created_at: Timestamp.now(),
//   description: "Tournament Description",
//   start_date: Timestamp.now(),
//   end_date: Timestamp.now(),
//   updated_at: Timestamp.now(),
//   created_by: "1",
//   refree_ids: ["1"],
//   participants: ["1"],
//   manager_id: "1",
//   status: "pending",
//   min_members_in_team: 1,
//   max_participants: 1,
// };

// const expampleReferees: User[] = [
//   {
//     username: "referee1",
//     accountType: "refree",
//     bio: "bio",
//     birthday: Timestamp.now(),
//     joinDate: Timestamp.now(),
//     firstName: "first",
//     lastName: "last",
//     gender: "male",
//     phoneNumbers: ["123456789"],
//     address: "address",
//     avatar: "https://via.placeholder.com/150",
//   },
//   {
//     username: "referee2",
//     accountType: "refree",
//     bio: "bio",
//     birthday: Timestamp.now(),
//     joinDate: Timestamp.now(),
//     firstName: "first",
//     lastName: "last",
//     gender: "female",
//     phoneNumbers: ["123456789"],
//     address: "address",
//     avatar: "https://via.placeholder.com/150",
//   },
// ];

// const exampleTeams: Team[] = [
//   {
//     id: "1",
//     teamName: "Team1",
//     blackList: ["1"],
//     createdAt: Timestamp.now(),
//     updatedAt: Timestamp.now(),
//     teamLogo: "https://via.placeholder.com/150",
//     description: "description",
//     createdBy: "1",
//   },
//   {
//     id: "2",
//     teamName: "Team2",
//     blackList: ["1"],
//     createdAt: Timestamp.now(),
//     updatedAt: Timestamp.now(),
//     teamLogo: "https://via.placeholder.com/150",
//     description: "description",
//     createdBy: "1",
//   },
//   {
//     id: "3",
//     teamName: "Team3",
//     blackList: ["1"],
//     createdAt: Timestamp.now(),
//     updatedAt: Timestamp.now(),
//     teamLogo: "https://via.placeholder.com/150",
//     description: "description",
//     createdBy: "1",
//   },
// ];
