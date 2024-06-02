// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const data = [
        {
            key: 1,
            label: "BioComputing Circuit Designer",
            desc: "The BioComputing Circuit Designer allows for users to model currently existing biocomputing networks online. This is a drag and drop tool desined in Django/Python using the P5JS design library.",
            git: "https://github.com/uOttawa-Biotalent-Biocomputing-Software/Biocomputing-Circuit-Designer",
            website: "none",
            logo: "/icon.PNG"
        },
        {
            key: 2,
            label: "My Next Modules",
            desc: "This is a library of NextJS components that I've created over the years in JS which I and others can use to create modern websites.",
            git: "https://github.com/apkanwar/MyNextModules",
            website: "none",
            logo: "/icon.PNG"
        },
        {
            key: 3,
            label: "X-Labs",
            desc: "X-Labs is a cross platform Web and Android application that allows the users to search and connect to Bluetooth Low Engery Devices and interact with them.",
            git: "none",
            website: "none",
            logo: "/icon.PNG"
        },
        {
            key: 4,
            label: "FinSimpl",
            desc: "FinSimpl is a service that allows users to allows contractors to interact with their clients help them find the perfect lender for their next contracting needs.",
            git: "https://github.com/Finsimpl/www",
            website: "https://www.finsimpl.com/",
            logo: "/icon.PNG"
        },
        {
            key: 6,
            label: "InvestEazy",
            desc: "InvestEazy is a mock website that allows users to find and franctionally invest in residential and commercial real estate.",
            git: "https://github.com/apkanwar/invest-eazy",
            website: "https://www.investeazy.ca/",
            logo: "/icon.PNG"
        }
    ]


    res.status(200).json({ data })
}