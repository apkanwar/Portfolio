import DocsLayout from '@/components/wiki/docsLayout';
import Head from 'next/head';

export default function DocsHome() {
    return (
        <DocsLayout>
            <Head>
                <title>Atinderpaul Docs - Home</title>
            </Head>
            <main className="min-h-screen font-headings flex flex-col items-center justify-center text-white px-4 w-full">
                <h3 className="text-3xl font-bold mb-4">Welcome to the Docs</h3>
                <p className="text-lg text-gray-400">Select a topic from the sidebar to get started.</p>
            </main>
        </DocsLayout>
    );
}