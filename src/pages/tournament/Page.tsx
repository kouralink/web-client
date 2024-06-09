import TournamentHeader from "@/components/global/tournament/TournamentHeader";
import { useParams } from "react-router-dom";
import { Team, Tournament, User } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import TournamentRefereesList from "@/components/global/tournament/TournamentRefereesList";
import TournamentTeamsList from "@/components/global/tournament/TournamentTeamsList";

export const TournamentPage = () => {
  const { paramtourid } = useParams<{ paramtourid: string }>();
  return (
    <div className="flex flex-col gap-8 mt-5 w-full container">
      {paramtourid}
      <TournamentHeader role="tournament_manager" {...exampleTournament} />
      <TournamentRefereesList referees={expampleReferees} />
      <TournamentTeamsList teams={exampleTeams} isManager={true} />
    </div>
  );
};

const exampleTournament: Tournament = {
  id: "1",
  name: "Tournament Name",
  logo: "https://via.placeholder.com/150",
  location: "#",
  created_at: Timestamp.now(),
  description: "Tournament Description",
  start_date: Timestamp.now(),
  end_date: Timestamp.now(),
  updated_at: Timestamp.now(),
  created_by: "1",
  refree_ids: ["1"],
  participants: ["1"],
  status: "pending",
  min_members_in_team: 1,
  max_participants: 1,
};

const expampleReferees: User[] = [
  {
    username: "referee1",
    accountType: "refree",
    bio: "bio",
    birthday: Timestamp.now(),
    joinDate: Timestamp.now(),
    firstName: "first",
    lastName: "last",
    gender: "male",
    phoneNumbers: ["123456789"],
    address: "address",
    avatar: "https://via.placeholder.com/150",
  },
  {
    username: "referee2",
    accountType: "refree",
    bio: "bio",
    birthday: Timestamp.now(),
    joinDate: Timestamp.now(),
    firstName: "first",
    lastName: "last",
    gender: "female",
    phoneNumbers: ["123456789"],
    address: "address",
    avatar: "https://via.placeholder.com/150",
  },
];

const exampleTeams: Team[] = [
  {
    id: "1",
    teamName: "Team1",
    blackList: ["1"],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "https://via.placeholder.com/150",
    description: "description",
    createdBy: "1",
  },
  {
    id: "2",
    teamName: "Team2",
    blackList: ["1"],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "https://via.placeholder.com/150",
    description: "description",
    createdBy: "1",
  },
  {
    id: "3",
    teamName: "Team3",
    blackList: ["1"],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "https://via.placeholder.com/150",
    description: "description",
    createdBy: "1",
  },
];
