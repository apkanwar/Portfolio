import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MainCard from "./mainCard";

const projects = [
  {
    image: "/projects/resumeai.png",
    title: "Resume Analyzer",
    description: "An AI-powered web application that allows users to securely upload resumes, automatically parse key sections and run AI-driven analysis to score resumes.",
    tags: ["NextJS", "GROQ", "Firestore", "Firebase Storage", "Firebase Auth",],
    liveLink: "https://resumeanalyzer.me",
    repoLink: "https://github.com/apkanwar/ResumeAI",
    page: 1,
  },
  {
    image: "/projects/topjatt.png",
    title: "TopJatt",
    description: "A trading platform to track and visualize stock, crypto, and futures trades while showcasing performance and achievements.",
    tags: ["NextJS", "MongoDB", "NextAuth", "Docker"],
    liveLink: "https://topjatt.com",
    repoLink: "https://github.com/apkanwar/TopJatt",
    page: 1,
  },
  {
    image: "/projects/ensured.png",
    title: "Ensured Employment",
    description: "An employment agency that allows for job seekers to submit resumes and employers to submit job openings. It also has a blog fetching articles to be read by the users.",
    tags: ["NextJS", "Firestore", "Firebase Storage"],
    liveLink: "https://ensuredemployment.com",
    repoLink: "https://github.com/apkanwar/EEServices",
    page: 1,
  },
  {
    image: "/projects/finsimpl.png",
    title: "FinSimpl",
    description: "FinSimpl is a service that allows users to allows contractors to interact with their clients help them find the perfect lender for their next contracting needs.",
    tags: ["GatsbyJS", "AWS Cognito", "DynamoDB"],
    liveLink: "https://finsimpl.com",
    repoLink: "https://github.com/Finsimpl/www",
    page: 1,
  },
  {
    image: "/projects/finsimpl.png",
    title: "BronBeats",
    description: "BronBeats is a creative web platform where users can listen to LeBron James remix songs. I built it quickly using Next.js, TailwindCSS, and AI-assisted coding, reusing prior design templates and refining them for a unique music experience.",
    tags: ["NextJS", "Firestore", "Firebase Auth"],
    liveLink: "https://bronbeats.com",
    repoLink: "https://github.com/apkanwar/BronBeats",
    page: 1,
  },
  {
    image: "/projects/finsimpl.png",
    title: "BMO Banking Frontend Clone",
    description: "Leveraged Swift's AI-assisted coding features to accelerate component development, while applying my own design refinements and structural decisions.",
    tags: ["NextJS", "Firestore", "Firebase Auth"],
    liveLink: "",
    repoLink: "https://github.com/apkanwar/BMODemo_iOS",
    page: 2,
  },
  {
    image: "/projects/biocomputing.png",
    title: "BioComputing Circuit Designer",
    description: "The BioComputing Circuit Designer allows for users to model currently existing biocomputing networks online using a drag and drop toolkit from the P5JS library.",
    tags: ["Django"],
    liveLink: "",
    repoLink: "https://github.com/uOttawa-Biotalent-Biocomputing-Software/Biocomputing-Circuit-Designer",
    page: 2,
  },
  {
    image: "/projects/xlab.png",
    title: "X-Labs",
    description: "A cross-platform Web and Android application that enables users to discover, connect to, and interact with Bluetooth Low Energy (BLE) devices.",
    tags: ["AngularJS", "Ionic"],
    liveLink: "",
    repoLink: "",
    page: 2,
  },
  {
    image: "/projects/investeazy.png",
    title: "InvestEazy",
    description: "A mock real estate investment platform showcasing clean UI/UX design, where users can explore and fractionally invest in residential and commercial properties.",
    tags: ["NextJS", "TailwindCSS"],
    liveLink: "https://www.figma.com/proto/JQZ41k3QsOTC0WoGWTLx07/InvestEazy-Mockup?node-id=2-3&p=f&t=J8xFQ910SS2J3hO7-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3&show-proto-sidebar=1",
    repoLink: "https://github.com/apkanwar/InvestEazy",
    page: 2,
  }
];

export default function ProjectCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = projects.reduce((max, project) => {
    const pageNumber = typeof project.page === "number" ? project.page : 1;
    return pageNumber > max ? pageNumber : max;
  }, 1);

  const paginatedProjects = projects.filter((project) => {
    const pageNumber = typeof project.page === "number" ? project.page : 1;
    return pageNumber === currentPage;
  });

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section id="projectsCard" className="mx-4 xl:mx-auto bg-artic-blue py-24">
      <div className="mx-auto max-w-5xl flex flex-col">
        <div className="py-8 w-full flex px-8 justify-between items-center bg-dm-black rounded-xl">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`ml-4 rounded-full bg-gray-700 p-2 text-white transition-opacity ${currentPage === 1 ? "opacity-50" : "hover:opacity-80"}`}
            aria-label="Previous project page"
          >
            <ArrowBack />
          </button>
          <div className="flex flex-col items-center">
            <p className="font-dText font-semibold text-white text-2xl">
              PROJECTS OVERVIEW
            </p>
            <span className="font-dText text-sm text-gray-300 mt-1">Page {currentPage} of {totalPages}</span>
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`ml-4 rounded-full bg-gray-700 p-2 text-white transition-opacity ${currentPage === totalPages ? "opacity-50" : "hover:opacity-80"}`}
            aria-label="Next project page"
          >
            <ArrowForward />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 mt-12 gap-y-12">
          {paginatedProjects.map((project, index) => (
            <MainCard
              key={`${project.title}-${index}`}
              image={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveLink={project.liveLink}
              repoLink={project.repoLink}
            />
          ))}
          {paginatedProjects.length === 0 && (
            <p className="text-center text-white col-span-full">
              No projects available for this page yet.
            </p>
          )}
        </div>

      </div>
    </section>
  )
}
