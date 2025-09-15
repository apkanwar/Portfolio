import MainCard from "./mainCard";

const projects = [
  {
    image: "/projects/resumeai.png",
    title: "Resume Analyzer",
    description: "An AI-powered web application that allows users to securely upload resumes, automatically parse key sections and run AI-driven analysis to score resumes.",
    tags: ["NextJS", "GROQ", "Firestore", "Firebase Storage", "Firebase Auth", ],
    liveLink: "https://resumeanalyzer.me",
    repoLink: "https://github.com/apkanwar/ResumeAI"
  },
  {
    image: "/projects/topjatt.png",
    title: "TopJatt",
    description: "A trading platform to track and visualize stock, crypto, and futures trades while showcasing performance and achievements.",
    tags: ["NextJS", "MongoDB", "NextAuth", "Docker"],
    liveLink: "https://topjatt.com",
    repoLink: "https://github.com/apkanwar/TopJatt"
  },
  {
    image: "/projects/ensured.png",
    title: "Ensured Employment",
    description: "An employment agency that allows for job seekers to submit resumes and employers to submit job openings. It also has a blog fetching articles to be read by the users.",
    tags: ["NextJS", "Google Firestore", "Google Storage"],
    liveLink: "https://ensuredemployment.com",
    repoLink: "https://github.com/apkanwar/EEServices"
  },
  {
    image: "/projects/finsimpl.png",
    title: "FinSimpl",
    description: "FinSimpl is a service that allows users to allows contractors to interact with their clients help them find the perfect lender for their next contracting needs.",
    tags: ["GatsbyJS", "AWS Cognito", "DynamoDB"],
    liveLink: "https://finsimpl.com",
    repoLink: "https://github.com/Finsimpl/www"
  },
  {
    image: "/projects/biocomputing.png",
    title: "BioComputing Circuit Designer",
    description: "The BioComputing Circuit Designer allows for users to model currently existing biocomputing networks online using a drag and drop toolkit from the P5JS library.",
    tags: ["Django"],
    liveLink: "",
    repoLink: "https://github.com/uOttawa-Biotalent-Biocomputing-Software/Biocomputing-Circuit-Designer"
  },
  {
    image: "/projects/xlab.png",
    title: "X-Labs",
    description: "A cross-platform Web and Android application that enables users to discover, connect to, and interact with Bluetooth Low Energy (BLE) devices.",
    tags: ["AngularJS", "Ionic"],
    liveLink: "",
    repoLink: ""
  },
  {
    image: "/projects/investeazy.png",
    title: "InvestEazy",
    description: "A mock real estate investment platform showcasing clean UI/UX design, where users can explore and fractionally invest in residential and commercial properties.",
    tags: ["NextJS", "TailwindCSS"],
    liveLink: "https://www.figma.com/proto/JQZ41k3QsOTC0WoGWTLx07/InvestEazy-Mockup?node-id=2-3&p=f&t=J8xFQ910SS2J3hO7-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3&show-proto-sidebar=1",
    repoLink: "https://github.com/apkanwar/InvestEazy"
  }
];

export default function ProjectCards() {
  return (
    <section id="projectsCard" className="mx-4 xl:mx-auto bg-artic-blue py-24">
      <div className="mx-auto max-w-5xl flex flex-col">
        <div className="py-8 w-full flex justify-center items-center bg-dm-black rounded-xl">
          <p className="font-dText font-semibold text-white text-2xl">
            PROJECTS OVERVIEW
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 mt-12 gap-y-12">
          {projects.map((project, index) => (
            <MainCard
              key={index}
              image={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveLink={project.liveLink}
              repoLink={project.repoLink}
            />
          ))}
        </div>

      </div>
    </section>
  )
}