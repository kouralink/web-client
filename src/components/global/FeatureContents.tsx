import FeatureContentCard from "./cards/FeatureContentCard";

 const FeatureContents = () => {
    const cardsContent = [
        [
        {
            backgroundImageSrc: "/feautreContent/im5.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        },
        {
            backgroundImageSrc: "/feautreContent/im6.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        },
        {
            backgroundImageSrc: "/feautreContent/im7.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        }],
        [{
            backgroundImageSrc: "/feautreContent/im8.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        },
        {
            backgroundImageSrc: "/feautreContent/im9.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        },
        {
            backgroundImageSrc: "/feautreContent/im10.png",
            title: "Goal Machine",
            description:
                "Meet the top scorer of the season, known for precision and goal-scoring prowess.",
        }]
    ];

    return (
        <div className="flex w-full flex-col items-center gap-5 bg-card p-8 shadow-lg">
                {cardsContent.map((cardGroup, groupIndex) => (
                        <div key={groupIndex} className="w-full flex flex-col sm:flex-row items-center justify-center gap-5">
                                {cardGroup.map((card, cardIndex) => (
                                        <FeatureContentCard
                                                key={cardIndex}
                                                backgroundImageSrc={card.backgroundImageSrc}
                                                title={card.title}
                                                description={card.description}
                                        />
                                ))}
                        </div>
                ))}
        </div>
    );
};
export default FeatureContents;