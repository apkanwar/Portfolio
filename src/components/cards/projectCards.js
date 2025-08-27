import MainCard from "./mainCard";

const projects = [
  {
    image: "/ai_mountain.jpg",
    title: "TopJatt",
    description: "A trading platform to track and visualize stock, crypto, and futures trades while showcasing performance and achievements.",
    tags: ["NextJS", "MongoDB", "NextAuth", "Docker"],
    liveLink: "https://topjatt.com",
    repoLink: "https://github.com/apkanwar/TopJatt"
  },
  {
    image: "/ai_mountain.jpg",
    title: "Ensured Employment",
    description: "An employment agency that allows for job seekers to submit resumes and employers to submit job openings. It also has a blog fetching articles to be read by the users.",
    tags: ["NextJS", "Google Firestore", "Google Storage"],
    liveLink: "https://ensuredemployment.com",
    repoLink: "https://github.com/apkanwar/EEServices"
  },
  {
    image: "/ai_mountain.jpg",
    title: "FinSimpl",
    description: "FinSimpl is a service that allows users to allows contractors to interact with their clients help them find the perfect lender for their next contracting needs.",
    tags: ["GatsbyJS", "AWS Cognito", "DynamoDB"],
    liveLink: "https://finsimpl.com",
    repoLink: "https://github.com/Finsimpl/www"
  },
  {
    image: "/ai_mountain.jpg",
    title: "BioComputing Circuit Designer",
    description: "The BioComputing Circuit Designer allows for users to model currently existing biocomputing networks online using a drag and drop toolkit from the P5JS library.",
    tags: ["Django"],
    liveLink: "",
    repoLink: "https://github.com/uOttawa-Biotalent-Biocomputing-Software/Biocomputing-Circuit-Designer"
  },
  {
    image: "/ai_mountain.jpg",
    title: "X-Labs",
    description: "A cross-platform Web and Android application that enables users to discover, connect to, and interact with Bluetooth Low Energy (BLE) devices.",
    tags: ["AngularJS", "Ionic"],
    liveLink: "",
    repoLink: ""
  },
  {
    image: "/ai_mountain.jpg",
    title: "InvestEazy",
    description: "A mock real estate investment platform showcasing clean UI/UX design, where users can explore and fractionally invest in residential and commercial properties.",
    tags: ["NextJS", "TailwindCSS"],
    liveLink: "",
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