
import TitleCard from "@/components/titleCard"
import PresentationMode from "@/components/presentationMode";
import AboutMe from "@/components/aboutCard";
import TheLine from "@/components/theLine";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Footer from "@/components/footer";
import ProjectsView from "@/components/projectsView";

export default function Home() {
    return (
        <>
            <Head>
                <title>Atinderpaul Kanwar - Portfolio</title>
            </Head>

            <Navbar />
            <TitleCard />
            <TheLine />
            <AboutMe />
            <ProjectsView />
            <Contact />
            <Footer />
        </>
    )
}