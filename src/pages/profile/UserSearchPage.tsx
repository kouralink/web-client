import { searchByUserName } from "@/state/search/searchUsersSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import UsersImg from "/feautreContent/im5.png";
import UserSearchCard from "@/components/global/cards/UserSearchCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

const UserSearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResults = useSelector(
    (state: RootState) => state.usersearch.searchResults
  );
  const isLoading = useSelector(
    (state: RootState) => state.usersearch.isLoading
  );
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
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
              {
                isLoading ?
                  <div className='h-full w-full flex justify-center items-center'>
                    <img src="/logo.svg" className="h-8 me-3 mt-36 animate-spin" alt="Koulaink Logo" />
                  </div> :
                  <ul>
                    {
                      searchResults.map((result, index) => {
                        return (
                          <div key={index}>
                            <UserSearchCard result={result.user_info} />
                          </div>
                        );
                      })
                    }
                  </ul>
              }
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserSearchPage;
