import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
// import { Input } from "@/components/ui/input";
import BlackListSearchMemberCard from "./cards/BlackListSearchMemberCard";
import { Ban } from "lucide-react";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
export function SearchBlackListTeam() {
  const blackListInfos = useSelector(
    (state: RootState) => state.team.blackListInfos
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-between w-full">
          <Ban className="mr-2 h-4 w-4" />
          <div>Blacklist</div>
          <DropdownMenuShortcut>Baned users</DropdownMenuShortcut>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <DialogTitle>Search In Black List</DialogTitle>
        <div className="grid gap-4 py-4 h-80">
          {/* <Input
                type="text"
                onChange={(e)=>setSearchValue(e.target.value)}
                placeholder="Search users..."
                className="my-10"
              /> */}
          {blackListInfos.length === 0 && (
            <div className="text-center">No users in the blacklist</div>
          )}
          {blackListInfos.map((result) => {
            return (
              <div>
                <BlackListSearchMemberCard
                  result={result.user_info}
                  id={result.uid}
                />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
