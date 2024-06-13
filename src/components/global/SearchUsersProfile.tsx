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
  searchByUserName,
  setLastDoc,
  setSearchResults,
} from "@/state/search/searchUsersSlice";
import UserSearchCardForInvite from "./cards/UserSearchCardForInvite";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export default function SearchUsersProfile() {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchResults = useSelector(
    (state: RootState) => state.usersearch.searchResults
  );
  const isLoading = useSelector(
    (state: RootState) => state.usersearch.isLoading
  );
  const lastDoc = useSelector((state: RootState) => state.usersearch.lastDoc);
  const dispatch = useDispatch<AppDispatch>();

  const observerRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current || isLoading || searchResults.length === 0) {
      firstRender.current = false;
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && lastDoc) {
        dispatch(searchByUserName(searchValue));
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
    dispatch(searchByUserName(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Invite Player</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] md:max-w-[800px] h-[500px] p-0">
        <ScrollArea className="h-full w-full rounded-md border p-5">
          <DialogTitle>Search Player</DialogTitle>
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
                  <UserSearchCardForInvite
                    result={result.user_info}
                    id={result.uid}
                  />
                  {/* {index === searchResults.length - 1 && (
                    <div ref={observerRef} style={{ height: "20px", visibility: "visible" }} />
                  )} */}
                </div>
              );
            })}
            {(lastDoc && !isLoading) &&
              <Button ref={observerRef} style={{ height: "40px", visibility: "visible" }} onClick={() => dispatch(searchByUserName(searchValue))}>
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