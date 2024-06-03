import { searchByTeamName } from "@/state/search/searchTeamSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import TeamSearchCard from "@/components/global/cards/TeamSearchCard";
import TeamImg from "/teams.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

const TeamSearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.teamsearch.searchResults
  );
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    dispatch(searchByTeamName(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className="container h-screen relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r ">
        {/* bg iamge url */}
        <div
          className="absolute inset-0 bg-primary-950 bg-cover bg-no-repeat bg-center "
          style={{
            backgroundImage: `url(${TeamImg})`,
          }}
        />
        <div className="absolute inset-0 backdrop-brightness-50 " />
      </div>
      <ScrollArea className="h-full w-full rounded-md border">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col space-y-6 ">
            <h1 className="font-bold text-7xl py-10">
              <span className="text-green-700">T</span>eams
            </h1>
            <p className="text-gray-600 dark:text-gray-300 lg:text-2xl lg-w-1/2">
              search and Join your team to collaborate with passionate
              individuals and enjoy a fulfilling experience together
            </p>
            <div className="flex flex-col p-10">
              <Input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search teams..."
              />
              <ul>
                {searchResults.map((result) => {
                  return (
                    <div>
                      <TeamSearchCard result={result.team_info} />
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TeamSearchPage;
