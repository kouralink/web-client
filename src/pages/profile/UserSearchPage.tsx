import { searchByUserName } from '@/state/search/searchUsersSlice';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input"
import UsersImg from '/feautreContent/im5.png';
import UserSearchCard from "@/components/global/cards/UserSearchCard";
import { ScrollArea } from "@/components/ui/scroll-area"

const UserSearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.usersearch.searchResults);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByUserName(event.target.value));
        // Perform search logic here
    };

    return (
    
        <div className="container h-screen relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r ">
          {/* bg iamge url */}
          <div className="absolute inset-0 bg-primary-950 bg-cover bg-no-repeat bg-center "  style={{
            backgroundImage: `url(${UsersImg})`
          }}/>
          <div className="absolute inset-0 backdrop-brightness-50 "/>

        </div>
        <ScrollArea className="h-full w-full rounded-md border">
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col space-y-6 ">


        <h1 className='font-bold text-7xl'><span className='text-green-700'>U</span>sers</h1>
        <p className='text-gray-600 lg:text-2xl lg-w-1/2'>search and players and enjoy a fulfilling experience together</p>
        <Input type="text" onChange={handleSearch} placeholder="Search users..." className='my-10' />
        
            <div className='flex flex-col'>

                {searchResults.map((result) => {
                            return <div>
                                    <UserSearchCard result={result.user_info}/>
                                </div>;
                    })}
            </div>

        </div>
        </div>
        </ScrollArea>
        </div>
        
    );
};

export default UserSearchPage;