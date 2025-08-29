import wikiContent from '@/data/wikiContent';
import DocsLayout from '@/components/wiki/docsLayout';
import ContentRenderer from '@/components/wiki/contentRenderer';
import Head from 'next/head';
import Link from 'next/link';

export default function DocsPage({ section, page }) {
    const sectionTitle = section?.title || '';
    const sectionPages = Object.values(wikiContent).flatMap(s => s.pages);
    const currentIndex = sectionPages.findIndex(p => p.slug === page.slug);
    const prevPage = sectionPages[currentIndex - 1];
    const nextPage = sectionPages[currentIndex + 1];

    return (
        <>
            <Head>
                <title>Atinderpaul Kanwar - Docs</title>
            </Head>
            <DocsLayout>
                <p className="text-sm text-gray-400 mb-4 font-headings cursor-default">
                    {sectionTitle} &nbsp;&gt;&nbsp; <span className='font-semibold underline underline-offset-2'>{page.title}</span>
                </p>
                <h3 className="text-3xl font-bold mb-6 font-headings">{page.title}</h3>
                <ContentRenderer content={page.content} />

                <div className="mt-10 flex justify-between font-headings text-blue-400 cursor-default">
                    <>
                        {prevPage ? (
                            <Link href={`/docs/${prevPage.slug}`}
                                className="rounded-xl p-4 ring-1 ring-white/10 bg-white/5 hover:underline">
                                ← {prevPage.title}
                            </Link>
                        ) : <span />}

                        {nextPage ? (
                            <Link href={`/docs/${nextPage.slug}`}
                                className="rounded-xl p-4 ring-1 ring-white/10 bg-white/5 hover:underline">
                                {nextPage.title} →
                            </Link>
                        ) : <span />}
                    </>
                </div>
            </DocsLayout>
        </>
    );
}

export async function getStaticPaths() {
    const paths = [];

    Object.values(wikiContent).forEach(section => {
        section.pages.forEach(page => {
            const slugParts = page.slug.split('/');
            paths.push({ params: { slug: slugParts } });
        });
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const fullSlug = params.slug.join('/');
    let matchedPage = null;
    let matchedSection = null;

    for (const [sectionKey, section] of Object.entries(wikiContent)) {
        const page = section.pages.find((p) => p.slug === fullSlug);
        if (page) {
            matchedPage = page;
            matchedSection = { title: section.title };
            break;
        }
    }

    if (!matchedPage) {
        return { notFound: true };
    }

    return {
        props: {
            page: matchedPage,
            section: matchedSection,
        },
    };
}