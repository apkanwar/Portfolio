import { useRouter } from 'next/router';
import wikiContent from '@/data/wikiContent';
import DocsLayout from '@/components/wiki/docsLayout';
import ContentRenderer from '@/components/wiki/contentRenderer';
import Head from 'next/head';

export default function DocsPage() {


    const router = useRouter();
    const { slug = [] } = router.query;
    const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

    // Find Path in WikiContent JSON
    const page = Object.values(wikiContent)
        .flatMap((section) => section.pages)
        .find((p) => p.slug === slugPath);

    if (!page) {
        return (
            <DocsLayout>
                <p className="text-red-500">Page not found.</p>
            </DocsLayout>
        );
    }

    const sectionEntry = Object.entries(wikiContent).find(([_, section]) =>
        section.pages.some(p => p.slug === slugPath)
    );
    const sectionTitle = sectionEntry?.[1]?.title || '';

    return (
        <>
            <Head>
                <title>Atinderpaul Kanwar - Docs</title>
            </Head>
            <DocsLayout>
                <p className="text-sm text-gray-400 mb-4 font-headings cursor-default">
                    {sectionTitle} &nbsp;&gt;&nbsp; <span className='font-semibold underline underline-offset-2'>{page.title}</span>
                </p>
                <h1 className="text-3xl font-bold mb-6 font-headings">{page.title}</h1>
                <ContentRenderer content={page.content} />
            </DocsLayout>
        </>
    );
}