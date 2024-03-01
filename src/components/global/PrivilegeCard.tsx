import React from 'react';

interface PrivilegeCardProps {
    icon: string;
    title: string;
    description: string;
}

const PrivilegeCard: React.FC<PrivilegeCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex py-2 m-2 flex-1  flex-col gap-4 items-center text-center  text-card w-48 h-48">
            <div className='flex items-center flex-col gap-2'>
            <img src={icon} alt="Icon" className="w-8 h-8" />
            <h2 className="font-bold text-lg ">{title}</h2>
            </div>
            <p>{description}</p>
        </div>
    );
};

export default PrivilegeCard;