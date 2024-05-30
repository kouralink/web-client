import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Info } from "lucide-react";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Timestamp } from 'firebase/firestore';
import { Separator } from "@/components/ui/separator";

export function InfoMemberProfileCard(
  {
    firstName,
    lastName,
    bio,
    joinDate,
    gender,
  }: {
    firstName: string;
    lastName: string;
    bio: string;
    joinDate: {seconds: number, nanoseconds: number};
    gender: string;
  }
) {
    const timestamp = new Timestamp(joinDate?.seconds || 0, joinDate?.nanoseconds || 0);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex justify-between items-center w-full">
            <Info className="mr-2 h-4 w-4" />
            <span >Info</span>
            <DropdownMenuShortcut>details</DropdownMenuShortcut>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div>
            <h1 className="text-xl font-bold mb-2">Information</h1>
            <Separator className="border-r-2"/>
            <h1 className="break-words flex flex-col"><span className="font-bold">Name</span> {firstName} {lastName}</h1>
            <Separator className="border-r-2"/>
            <p className="break-words flex flex-col"> <span className="font-bold">Bio</span> {bio}</p>
            <Separator />
            <p className="flex flex-col"><span className="font-bold">Gender</span> {gender}</p>
            <Separator />
            <p className="flex flex-col"><span className="font-bold">Create At</span> {timestamp.toDate().toDateString()? timestamp.toDate().toDateString() : "add birthday in settings"}</p>
            
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
