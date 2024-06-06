import { Member } from "@/types/types";
import MatchMemberCard from "./MatchMemberCard";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface PropsState {
  members: Member[];
  coach: Member | null;
}

export default function MatchTeamMembers(props: PropsState) {
  const isLoading = useSelector((state: RootState) => state.match.isLoading);
  return (
    <Card className=" flex flex-col py-4 px-2 gap-4 w-full h-full lg:min-w-[280px]">
      {!props.coach && !isLoading ? (
        <>This Team has been deleted</>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h2>Coach</h2>
            <div className=" ml-4">
              {props.coach ? (
                <MatchMemberCard member={props.coach} key={props.coach.uid} />
              ) : (
                <p className="text-muted-foreground">Coach Not Found!</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Members</h2>
            <div className=" ml-4">
              <ScrollArea className="min-h-52 h-full">
                {props.members.map((member) => {
                  if (member.role !== "coach") {
                    return <MatchMemberCard key={member.uid} member={member} />;
                  }
                })}
                {props.members.length === 1 && (
                  <p className="text-muted-foreground">No members yet</p>
                )}
              </ScrollArea>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
