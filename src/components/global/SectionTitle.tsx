import React from 'react';

interface SectionTitleProps {
    title: string;
    color?: string;
    classesStyle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, color = 'text-primary-700',classesStyle = "text-3xl  sm:text-4xl md:text-5xl lg:text-6xl" }) => {
    const uppercasedTitle = title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ;

    return (
        <h1 className={classesStyle}>
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