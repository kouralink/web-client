import { useParams } from "react-router-dom";

export const TournamentPage = () => {
  const { paramtourname } = useParams<{ paramtourname: string }>();
  return <div className="flex flex-col gap-8 mt-5 ">{paramtourname}</div>;
};
