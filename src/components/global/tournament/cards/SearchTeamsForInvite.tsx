import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { searchByTeamName } from "@/state/search/searchTeamSlice";
import TeamSearchCardForInvite from "./TeamSearchCardForInvite";

export default function SearchTeamsForInvite() {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchResults = useSelector(
    (state: RootState) => state.teamsearch.searchResults
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(searchByTeamName(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Invite Team</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <DialogTitle>Search Teams</DialogTitle>
        <div className="grid gap-4 py-4 h-80">
          <Input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search users..."
            className="my-10"
          />

          {searchResults.map((result, index) => {
            return (
              <div key={index}>
                <TeamSearchCardForInvite
                  result={result.team_info}
                  id={result.id}
                />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
