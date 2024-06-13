import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { searchByTeamName, setLastDoc, setSearchResults } from "@/state/search/searchTeamSlice";
import TeamSearchCardForInvite from "./TeamSearchCardForInvite";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchTeamsForInvite() {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchResults = useSelector(
    (state: RootState) => state.teamsearch.searchResults
  );
  const isLoading = useSelector(
    (state: RootState) => state.teamsearch.isLoading
  );
  const lastDoc = useSelector(
    (state: RootState) => state.teamsearch.lastDoc
  );
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    console.log(firstRender.current, isLoading)
    if (firstRender.current || isLoading) {
      firstRender.current = false;
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && lastDoc) {
        dispatch(searchByTeamName(searchValue));
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading, searchResults.length, dispatch, lastDoc]);


  useEffect(() => {
    dispatch(setSearchResults([]));
    dispatch(setLastDoc(null));
    dispatch(searchByTeamName(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Invite Team</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[800px] h-[500px] p-0">
        <ScrollArea className="h-full w-full rounded-md border p-5">
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
            {(lastDoc && !isLoading) &&
              <Button ref={observerRef} style={{ height: "40px", visibility: "visible" }} onClick={() => dispatch(searchByTeamName(searchValue))}>
                Show More
              </Button>
            }
            {isLoading && (
              <div className='h-full w-full flex justify-center items-center'>
                <img src="/logo.svg" className="h-8 me-3 my-5 animate-spin" alt="Koulaink Logo" />
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
