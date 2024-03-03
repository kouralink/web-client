import AnnouncementCard from "./cards/AnnouncementCard";

const SiteAnnouncements = () => {
  const cardsContent = [
    [
      {
        backgroundImageSrc: "/src/assets/announcements/announc1.jpg",
        title: "System Maintenance",
        date:'Scheduled for March 5, 2024',
        description:
          "We'll be performing system maintenance on March 5th. Expect brief downtime during the process. We apologize for any inconvenience. the top scorer of the season, known for precision and goal-scoring prowess.",
      },
      {
        backgroundImageSrc: "/src/assets/announcements/announc2.jpg",
        title: "System Maintenance",
        date:'Scheduled for March 5, 2024',

        description:
          "We'll be performing system maintenance on March 5th. Expect brief downtime during the process. We apologize for any inconvenience. the top scorer of the season, known for precision and goal-scoring prowess.",
      },
      {
        backgroundImageSrc: "/src/assets/announcements/announc1.jpg",
        date:'Scheduled for March 5, 2024',
        title: "System Maintenance",
        description:
          "We'll be performing system maintenance on March 5th. Expect brief downtime during the process. We apologize for any inconvenience. the top scorer of the season, known for precision and goal-scoring prowess.",
      },
    ],
  ];

  return (
    <div className="flex w-full flex-col items-center gap-5 bg-card p-8 shadow-lg">
      {cardsContent.map((cardGroup, groupIndex) => (
        <div
          key={groupIndex}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {cardGroup.map((card, cardIndex) => (
            <AnnouncementCard
              key={cardIndex}
              backgroundImageSrc={card.backgroundImageSrc}
              title={card.title}
              date={card.date}
              description={card.description}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default SiteAnnouncements;
