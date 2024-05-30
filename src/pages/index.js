
import TitleCard from "@/components/titleCard"
import PresentationMode from "@/components/presentationMode";
import AboutMe from "@/components/aboutCard";
import TheLine from "@/components/theLine";
import Contact from "@/components/contact";
import Navbar from "@/components/navbar";
import Head from "next/head";

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
            <PresentationMode />
            <Contact />
        </>
    )
}