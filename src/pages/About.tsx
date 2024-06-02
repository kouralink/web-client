

const About = () => {
  const teamInfo = [
    {
      name: "Hamza Wahmane",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/Team%2Fwahmane.jpg?alt=media&token=87246585-c60f-460b-86d8-611d8ab7f648",
      role: "Frontend Developer",
      links: {
        github: "",
        linkedin: "",
        facebook: "",
        twitter: "",
      },
    },
    {
      name: "Meriem Maatouqui",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/Team%2Fmeriem.jpg?alt=media&token=4bc3418d-7691-4a23-8509-49d135630895",
      role: "Backend Developer",
      links: {
        github: "",
        linkedin: "",
        facebook: "",
        twitter: "",
      },
    },
    {
      name: "Zoubair Najdaoui",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/Team%2Filorez.jpg?alt=media&token=38ca6b90-9b76-43d6-8b17-116c4dd9f8d4",
      role: "UI/UX Designer",
      links: {
        github: "",
        linkedin: "",
        facebook: "",
        twitter: "",
      },
    },
    {
      name: "Nsila Abdellah",
      image:
        "https://firebasestorage.googleapis.com/v0/b/koura-link.appspot.com/o/Team%2Fnsila.jpg?alt=media&token=5975a457-9984-4956-90d0-ea270d17cd95",
      role: "Full Stack Developer",
      links: {
        github: "",
        linkedin: "",
        facebook: "",
        twitter: "",
      },
    },
  
  ]
  console.log(teamInfo[0].links.facebook)
  return (
    <>
      This is About Page
    </>
  );
};


export default About;
