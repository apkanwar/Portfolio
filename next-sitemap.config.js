/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://atinderpaulk.com',
    generateRobotsTxt: true,
    exclude: [],
    splitSitemap: false,
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
            alternateRefs: [],
        };
    },
};