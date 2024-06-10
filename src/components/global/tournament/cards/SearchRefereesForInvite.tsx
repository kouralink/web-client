import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Input } from "@/components/ui/input";
import {
  searchByUserNameAndTypeAccount,
} from "@/state/search/searchUsersSlice";
import { useEffect, useState } from "react";
import RefereeSearchCardForInvite from "./RefereeSearchCardForInvite";

export default function SearchRefereesForInvite() {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchResults = useSelector(
    (state: RootState) => state.usersearch.searchResults
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      searchByUserNameAndTypeAccount({
        username: searchValue,
        typeAccount: "refree",
      })
    );
  }, [dispatch, searchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Invite Referee</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
        <DialogTitle>Search Referees</DialogTitle>
        <div className="grid gap-4 py-4 h-80">
          <Input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search users..."
            className="my-10"
          />

          {searchResults.map((result) => {
            return (
              <div>
                <RefereeSearchCardForInvite
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
