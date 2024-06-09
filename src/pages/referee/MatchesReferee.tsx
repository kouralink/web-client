import React from 'react';
import { useParams } from 'react-router-dom';

interface MatchesRefereeProps {
    // Add any props you need for the component here
}

const MatchesReferee: React.FC<MatchesRefereeProps> = () => {
    const {refreeid} = useParams() as {refreeid: string};

    return (
        <div>
            {refreeid}
            {/* Add your JSX content here */}
        </div>
    );
};

export default MatchesReferee;