import Sidebar from './sidebar';

export default function DocsLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-dm-black text-white">
      <Sidebar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}