// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
    const data = [
        {
            name: 'GitHub',
            link: 'https://github.com/apkanwar',
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/atinderpaul-kanwar/',
        },
        {
            name: 'Resume',
            link: '/resume',
        }
    ]
    res.status(200).json({ data })
}