import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ListItem from "../../ListIteam";
import { Timestamp } from "firebase/firestore";
import { Loader2, Navigation } from "lucide-react";
import TournementManagerCard from "./TournementManagerCard";
import { User } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
// import TournementManagerCard from "./TournementManagerCard";

interface TournementInfoProps {
  teams: number | null;
  refree: number | null;
  maxparticipant: number | null;
  create_at: Timestamp | null;
  bio: string | null;
  location: string | null;
  start: Timestamp | null;
  manager: User | null;
}

const TournementInfo: React.FC<TournementInfoProps> = ({
  manager,
  bio,
  refree,
  teams,
  maxparticipant,
  create_at,
  start,
  location,
}) => {
  const create = new Timestamp(
    create_at?.seconds || 0,
    create_at?.nanoseconds || 0
  );
  const isLoading = useSelector(
    (state: RootState) => state.tournament.isLoading
  );
  const start_at = new Timestamp(start?.seconds || 0, start?.nanoseconds || 0);
  return (
    <Card className="w-full flex flex-col h-full gap-2">
      <div className="flex justify-between items-center h-fit w-full">
        <CardHeader>
          <CardTitle>Tournement Details</CardTitle>
          <CardDescription className="text-muted-foreground">
            {bio}
          </CardDescription>
        </CardHeader>
        <div className="px-6">

        {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
        </div>
      </div>
      <CardContent className="flex flex-col gap-4">
        <div className="flex w-full gap-2 items-center">
          <ListItem
            iocn_name="user-check"
            title={"Tournement Manager : "}
            arrow={false}
          />
          {manager && (
            <TournementManagerCard
              avatar={manager.avatar}
              username={manager.username}
            />
          )}
        </div>
        <Separator className="my-2" />
        <ListItem
          iocn_name="shield-half"
          title={`Number of Teams : ${teams}`}
          arrow={false}
        />
        <ListItem
          iocn_name="users"
          title={`Number of Refree : ${refree}`}
          arrow={false}
        />
        <ListItem
          iocn_name="calendar-check-2"
          title={`Create at : ${create.toDate().toDateString()}`}
          arrow={false}
        />
        <ListItem
          iocn_name="calendar-check"
          title={`Start in : ${start_at.toDate().toDateString()}`}
          arrow={false}
        />
        <ListItem
          iocn_name="maximize"
          title={`Max participant : ${maxparticipant}`}
          arrow={false}
        />
        {location && (
          <div className="flex gap-2 w-fit">
            <ListItem iocn_name="map-pin" title={"Location : "} arrow={false} />
            <a
              href={location}
              target="_blank"
              className="text-sky-500 flex text-sm"
            >
              <Navigation /> Open
            </a>
          </div>
        )}
        {/* </div> */}
        {/* <div className="flex flex-col gap-4">
                    {props.startIn && (
                        <div>
                            <ListItem
                                iocn_name="calendar-days"
                                title={`Start : ${props.startIn.toDate().toLocaleString()}.`}
                                arrow={false}
                            />
                        </div>
                    )}
                    {props.endedAt && (
                        <div>
                            <ListItem
                                iocn_name="calendar-days"
                                title={`Ended At : ${props.endedAt.toDate().toLocaleString()}.`}
                                arrow={false}
                            />
                        </div>
                    )}
                    {props.location && (
                        <div className="flex gap-2 w-fit">
                            <ListItem
                                iocn_name="map-pin"
                                title={"Location : "}
                                arrow={false}
                            />
                            <a
                                href={props.location}
                                target="_blank"
                                className="text-sky-500 flex text-sm"
                            >
                                <Navigation /> Open
                            </a>
                        </div>
                    )}
                    {props.type && (
                        <div>
                            <ListItem
                                iocn_name="swords"
                                title={"Type : " + props.type.replace("_", " ")}
                                arrow={false}
                            />
                        </div>
                    )}
                </div> */}
      </CardContent>
      <CardFooter>
        <p>{/* TODO:Location map here */}</p>
      </CardFooter>
    </Card>
  );
};

export default TournementInfo;
