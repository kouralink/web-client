import { searchByTeamName } from '@/state/search/searchTeamSlice';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import teams from '/teams.jpg'; // adjust the path as needed
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';


const TeamSearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchResults = useSelector((state: RootState) => state.teamsearch.searchResults);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByTeamName(event.target.value));
        // Perform search logic here
    };

    return (
        <div className=' flex justify-between w-full h-full'>
            <div className='w-1/2 h-screen'>
            <h1 className='font-bold text-7xl py-10'><span className='text-green-700'>T</span>eams</h1>
            <p className='text-gray-600 text-2xl w-1/2'>search and Join your team to collaborate with passionate individuals and enjoy a fulfilling experience together</p>
            <div className='flex flex-col p-10'>
            <Input type="text" onChange={handleSearch} placeholder="Search teams..." />
            <ul>
                {searchResults.map((result, i) => {
                        return <Link to={`/team/page/${result.team_info.teamName}`}><li key={i}> Team: {result.team_info.teamName }</li></Link>;
                })}
            </ul>
            </div>
            </div>

            <div style={{ backgroundImage: `url(${teams})` }} className='w-1/2 h-screen bg-cover bg-repeat bg'>
            </div>
        </div>
    );
};

export default TeamSearchPage;

