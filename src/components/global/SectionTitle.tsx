import React from 'react';

interface SectionTitleProps {
    title: string;
    color: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, color }) => {
    const uppercasedTitle = title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ;

    return (
        <h1 className="text-3xl">
            {uppercasedTitle.map((word, index) => (
                <span key={index} className='' >
                <span className={color}>{word.charAt(0)}</span>
                <span >{word.slice(1) + " "}</span>
                </span>
            ))}
        </h1>
    );
};

export default SectionTitle;