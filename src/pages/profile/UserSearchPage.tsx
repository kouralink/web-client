import { searchByUserName } from '@/state/search/searchUsersSlice';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';

const UserSearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.usersearch.searchResults);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByUserName(event.target.value));
        // Perform search logic here
    };

    return (
        <div>
            <h1>User Search Page</h1>
            <input type="text" onChange={handleSearch} placeholder="Search users..." />
            <ul>
                {searchResults.map((result, i) => {
                        return <li key={i}> username: {result.user_info.username }</li>;
                })}
            </ul>
        </div>
    );
};

export default UserSearchPage;