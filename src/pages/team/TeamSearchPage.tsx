import { searchByTeamName } from '@/state/search/searchTeamSlice';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';

const TeamSearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.teamsearch.searchResults);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByTeamName(event.target.value));
        // Perform search logic here
    };

    return (
        <div>
            <h1>Team Search Page</h1>
            <input type="text" onChange={handleSearch} placeholder="Search teams..." />
            <ul>
                {searchResults.map((result, i) => {
                        return <li key={i}> Team: {result.teamName }</li>;
                })}
            </ul>
        </div>
    );
};

export default TeamSearchPage;