import React from 'react';
import { Link } from 'react-router-dom';

const TeamErrorPage: React.FC = () => {
    return (
        <div>
            <h1>Team Not Found</h1>
            <p>The requested team does not exist.</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
};

export default TeamErrorPage;