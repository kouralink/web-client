import { searchByTeamName, setLastDoc, setSearchResults } from "@/state/search/searchTeamSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import TeamImg from "/teams.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import SearchCard from "@/components/global/cards/SearchCard";

const TeamSearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.teamsearch.searchResults
  );
  const isLoading = useSelector(
    (state: RootState) => state.teamsearch.isLoading
  );
  const lastDoc = useSelector(
    (state: RootState) => state.teamsearch.lastDoc
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const observerRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current || isLoading || searchResults.length === 0) {
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
    <div className="container h-screen w-fit relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
      <ScrollArea className="h-full w-fit rounded-md border">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  space-y-6 ">
            <h1 className="font-bold text-7xl lg:py-10 px-16">
              <span className="text-green-700">T</span>eams
            </h1>
            <p className="text-gray-600 dark:text-gray-300 lg:text-2xl lg-w-fit px-16">
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
                {searchResults.map((result, index) => {
                  return (
                    <div key={index}>
                      <SearchCard path={`/team/page/${result.team_info.teamName}`} title="Open Team Page" name={result.team_info.teamName} avatar={result.team_info.teamLogo} />
                    </div>
                  );
                })}
              </ul>
              {
                isLoading &&
                <div className='h-full w-full flex justify-center items-center'>
                  <img src="/logo.svg" className="h-8 me-3 mt-20 animate-spin" alt="Koulaink Logo" />
                </div>
              }
              {lastDoc && <div ref={observerRef} style={{ height: '20px', visibility: 'visible' }} />}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TeamSearchPage;
