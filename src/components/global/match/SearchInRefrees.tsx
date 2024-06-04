import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootState } from "@/state/store";
  import { Input } from "@/components/ui/input";
  import {  searchByUserNameAndTypeAccount } from "@/state/search/searchUsersSlice";
  import { useEffect, useState } from "react";
import RefreeSearchCardForSelect from "./cards/RefreeSearchForSelect";
import { Button } from "@/components/ui/button";
  
  interface SearchInRefreesProps {
    select(s:string):void
  }
  
  export default function SearchInRefrees(props:SearchInRefreesProps) {
    const [searchValue,setSearchValue] = useState<string>("")
    
    const searchResults = useSelector(
      (state: RootState) => state.usersearch.searchResults
    );
    const dispatch = useDispatch<AppDispatch>();
  
   useEffect(() => {
      dispatch(searchByUserNameAndTypeAccount({username:searchValue,typeAccount:"refree"}));
    }, [dispatch, searchValue]);
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Select Or Change</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] md:max-w-[600px] overflow-y-scroll">
              <DialogTitle>Select Refree And invite it to match.</DialogTitle>
              <div className="grid gap-4 py-4 h-80">
                <Input
                  type="text"
                  onChange={(e)=>setSearchValue(e.target.value)}
                  placeholder="Search refree..."
                  className="my-10"
                />
  
                {searchResults.map((result) => {
                  return (
                    <div>
                      <RefreeSearchCardForSelect
                        result={result.user_info}
                        id={result.uid}
                        select={props.select}
                      />
                    </div>
                  );
                })}
              </div>
        </DialogContent>
      </Dialog>
    );
  }
  