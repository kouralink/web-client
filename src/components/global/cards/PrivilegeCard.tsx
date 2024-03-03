import React from 'react';

interface PrivilegeCardProps {
    icon: string;
    title: string;
    description: string;
}

const PrivilegeCard: React.FC<PrivilegeCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex py-2 m-2 max-w-[250px]   h-fit flex-1 flex-col gap-4 items-center text-center  text-card min-w-48 ">
            <div className='flex items-center flex-col gap-2'>
            <img src={icon} alt="Icon" className="w-10 h-10 md:w-6 md:h-6 lg:w-8 lg:h-8" />
            <h2 className="font-bold text-xl md:text-sm lg:text-lg">{title}</h2>
            </div>
            <p className="text-md md:text-sm lg:text-md">{description}</p>
        </div>
    );
};

export default PrivilegeCard;