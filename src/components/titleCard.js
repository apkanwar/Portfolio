import Link from "next/link"

export default function TitleCard() {
    return (
        <div className="bg-dm-black py-24">
            <section className="mx-auto max-w-5xl flex flex-col justify-center items-center rounded" style={{ background: `url("ai_mountain.jpg")` }}>
                <div className="py-44 w-full flex flex-col justify-center items-center bg-gray-400/50">
                    <p className="font-dText font-semibold text-white text-2xl">
                        WELCOME TO MY PORTFOLIO
                    </p>
                    <p className="font-dText font-semibold text-white text-2xl">
                        ___
                    </p>
                    <p className="font-dText text-white text-lg pt-4 max-w-2xl text-center">
                        My name is Atinderpaul. Learn more about myself and the projects I've worked on over the years
                    </p>
                </div>
                <div className="py-8 w-full flex justify-center items-center bg-gray-10">
                    <a href="#projectsCard">
                        <button className="py-3 px-6 border-solid border-2 border-white rounded font-dText font-semibold
                                 hover:bg-gray-900/20 text-white transition ease-in duration-200">
                            LEARN MORE
                        </button>
                    </a>
                </div>
            </section>
        </div>
    )
}