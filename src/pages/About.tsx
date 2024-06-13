import AboutCard from "@/components/global/cards/AboutCard"
import SectionTitle from "@/components/global/SectionTitle"

const About = () => {
  const teamInfo = [
    {
      name: "Hamza Wahmane",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/PROJECT_TEAM%2Fwahmane.jpg?alt=media&token=1b47fd1b-8b2b-48ce-b8f9-1ecffbee4db2",
      // role: "Backend Developer",
      role: "Kay bi3 l7chich",
      links: {
        github: "https://github.com/Wahmane-Hamza",
        linkedin: "d",
        facebook: "https://www.facebook.com/profile.php?id=100008421278534",
        x: "https://x.com/WahmaneHamza",
      },
    },
    {
      name: "Meriem Maatouqui",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/PROJECT_TEAM%2Fmeriem.jpg?alt=media&token=b36983e4-a6bb-442f-8da0-d54bd15b09ac",
      // role: "Frontend Developer",
      role: "Bnt bab allah",
      links: {
        github: "https://github.com/meriemmaat4",
        linkedin: "d",
        facebook: "d",
        x: "d",
      },
    },
    {
      name: "Zoubair Najdaoui",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/PROJECT_TEAM%2Filorez.jpg?alt=media&token=cef663c7-be03-4817-8af1-14591d43cce1",
      role: "UI/UX Designer",
      links: {
        github: "https://github.com/ilorez",
        linkedin: "dd",
        facebook: "d",
        x: "d",
      },
    },
    {
      name: "Abdellah Nsila",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/PROJECT_TEAM%2Fnsila.jpg?alt=media&token=b0c9dc90-7287-47c0-831d-3308be3ed7c6",
      role: "Full Stack Developer",
      links: {
        github: "https://github.com/Abdo-Nsila",
        linkedin: "d",
        facebook: "d",
        x: "d",
      },
    },

  ]
  console.log(teamInfo[0].links.facebook)
  return (
    <div className="max-w-full flex flex-col  justify-between ">

      <div className="h-full flex flex-col justify-center items-center">
        <div className="lg:w-3/5 p-5">
          <SectionTitle
            title="About KouraLink"
            classesStyle="text-5xl lg:text-7xl  font-bold py-5"
          />{" "}

          <h2 className="text-2xl py-5 font-bold">Our App</h2>
          <p className="font-bold">Welcome to KouraLink, your ultimate platform for football enthusiasts. Whether you're looking to form a team, organize matches, or participate in tournaments, KouraLink connects you with like-minded players and teams from all over the world. Our app is free to use and provides a simple, secure, and reliable way to enhance your football experience, anytime and anywhere.</p>

          <h2 className="text-2xl py-5 font-bold">Our Mission</h2>
          <p className="font-bold">KouraLink was created to bridge the gap between football lovers everywhere. What started as a simple way to connect players has evolved into a comprehensive platform where you can create teams, send requests to join other teams, organize matches, and participate in tournaments. We believe in the power of sport to bring people together, and every feature we develop is aimed at making it easier for you to enjoy the beautiful game. Our mission is to break down barriers and create a global football community.</p>
          <div className="py-5">
            <h2 className="text-2xl py-5 font-bold">Our Team</h2>
            <p className="font-bold">KouraLink was founded by Hamza Wahmane, Zobair Najdaoui, Meryem Maatouqi, and Abdellah Nsila, a group of passionate football fans and tech enthusiasts. Together, we are dedicated to building a platform that works seamlessly and provides an unparalleled football networking experience. We operate with a singular focus on connecting football players and teams around the globe, ensuring that KouraLink is fast, reliable, and easy to use.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full justify-around items-center  ">
        {
          teamInfo.map((member, index) => (
            <AboutCard key={index} teamInfo={member} />
          ))
        }

      </div>

    </div>
  );
};


export default About;
