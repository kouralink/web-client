import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Info } from "lucide-react";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Timestamp } from 'firebase/firestore';
import { Separator } from "@/components/ui/separator";

export function InfoTeamProfileCard({
    description,
    createdBy,
    createdAt,
  }: {
    description: string | undefined;
    createdBy: string | undefined;
    createdAt: Timestamp | undefined;
  }){
    const timestamp = new Timestamp(createdAt?.seconds || 0, createdAt?.nanoseconds || 0);

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
            {description != undefined &&<p className="break-words flex flex-col"> <span className="font-bold">Description</span> {description}</p>}
            <Separator />
            {createdBy != undefined &&<p className="flex flex-col"><span className="font-bold">Create By</span> {createdBy}</p>}
            <Separator />
            {createdAt != undefined &&<p className="flex flex-col"><span className="font-bold">Create At</span> {timestamp.toDate().toDateString()? timestamp.toDate().toDateString() : "add birthday in settings"}</p>}
            
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
