
import TitleCard from "@/components/titleCard"
import AboutMe from "@/components/aboutCard";
import TheLine from "@/components/theLine";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Footer from "@/components/footer";
import ProjectCards from "@/components/cards/projectCards";

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
            <ProjectCards />
            <Contact />
            <Footer />
        </>
    )
}