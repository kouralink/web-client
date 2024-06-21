import { searchByUserName, setLastDoc, setSearchResults } from "@/state/search/searchUsersSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import UsersImg from "/feautreContent/im5.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import SearchCard from "@/components/global/cards/SearchCard";

const UserSearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.usersearch.searchResults
  );
  const isLoading = useSelector(
    (state: RootState) => state.usersearch.isLoading
  );
  const lastDoc = useSelector(
    (state: RootState) => state.usersearch.lastDoc
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
    <div className="container h-screen w-fit lg:w-screen relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r ">
        {/* bg iamge url */}
        <div
          className="absolute inset-0 bg-primary-950 bg-cover bg-no-repeat bg-center  "
          style={{
            backgroundImage: `url(${UsersImg})`,
          }}
        />
        <div className="absolute inset-0 backdrop-brightness-50 " />
      </div>
      <ScrollArea className="h-full rounded-md border">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  space-y-6 ">
            <h1 className="font-bold text-7xl lg:py-10 px-16">
              <span className="text-green-700">U</span>sers
            </h1>
            <p className="text-gray-600 dark:text-gray-300 lg:text-2xl lg-w-fit px-16">
              search and players and enjoy a fulfilling experience together
            </p>
            <div className="flex flex-col p-10 w-fit lg:w-full">
              <Input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search users..."
              />
              <ul>
                {
                  searchResults.map((result, index) => {
                    return (
                      <div key={index}>
                        <SearchCard path={`/users/profile/${result.user_info.username}`} title="View Profile" name={result.user_info.username} avatar={result.user_info.avatar as string} />
                      </div>
                    );
                  })
                }
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

export default UserSearchPage;
