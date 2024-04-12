import { searchByTeamName } from '@/state/search/searchSlice';
import { AppDispatch, RootState } from '@/state/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TeamSearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.search.searchResults);
    
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
                    if ('teamName' in result) {
                        return <li key={i}> teamname: {result.teamName}</li>;
                    } else {
                        return <li key={i}> username: {result.displayName }</li>;
                    }
                })}
            </ul>
        </div>
    );
};

export default TeamSearchPage;