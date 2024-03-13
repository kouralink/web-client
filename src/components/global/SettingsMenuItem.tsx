import React from 'react';
import Icon from './LucidIcon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface SettingsMenuItemProps {
    iocn_name: keyof typeof dynamicIconImports;
    title: string;
    arrow?: boolean;
    arrow_icon?: keyof typeof dynamicIconImports;

}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({ iocn_name, title,arrow = true, arrow_icon= 'chevron-right' }) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='flex gap-2'>
            <Icon name={iocn_name} />
            <span >{title}</span>
            </div>
            {arrow && <Icon name={arrow_icon} />}
        </div>
    );
};

export default SettingsMenuItem;