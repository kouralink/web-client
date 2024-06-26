import { MatchFirestore, User } from "@/types/types";
import { Navigation } from "lucide-react";
import ListItem from "../../ListIteam";
import MatchMemberCard from "./MatchMemberCard";
import { Timestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MatchDetails(
  props: MatchFirestore & { refree_user_info: User | null }
) {
  console.log("start isn time");
  return (
    <Card className="w-full xl:w-[550px] flex flex-col h-full gap-2">
      <CardHeader>
        <CardTitle>Match Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Required info of match
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          {props.refree_user_info && props.refree.id && (
            <div className="flex w-full gap-2 items-center">
              <ListItem
                iocn_name="user-check"
                title={"Refree : "}
                arrow={false}
              />{" "}
              <MatchMemberCard
                member={{
                  joinedAt: props.refree_user_info.joinDate || Timestamp.now(),
                  role: "member",
                  team_id: "",
                  userInfo: props.refree_user_info,
                  uid: props.refree.id,
                }}
              />
            </div>
          )}
          <Separator className="my-2" />
        </div>
        <div className="flex flex-col gap-4">
          {props.startIn && (
            <div>
              <ListItem
                iocn_name="calendar-days"
                title={`Start : ${
                  props.startIn.toDate().toLocaleString()}.`}
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
        </div>
      </CardContent>
      <CardFooter>
        <p>{/* TODO:Location map here */}</p>
      </CardFooter>
    </Card>
  );
}
