import Link from 'next/link';
import { usePathname } from 'next/navigation';
import wikiContent from '@/data/wikiContent';
import { useState } from 'react';
import { Search, OpenInFull, CloseFullscreen, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

export default function Sidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const initialCollapseState = Object.keys(wikiContent).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});
  const [collapsedSections, setCollapsedSections] = useState(initialCollapseState);
  const [allCollapsed, setAllCollapsed] = useState(false);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const toggleSection = (key) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAllSections = () => {
    const newState = {};
    Object.keys(wikiContent).forEach((key) => {
      newState[key] = !allCollapsed;
    });
    setCollapsedSections(newState);
    setAllCollapsed(!allCollapsed);
  };

  return (
    <aside className="w-80 bg-midnight-black p-6 border-r-2 border-gray-800 lg:block font-headings">
      <h2 className="text-xl font-bold mb-6 text-white">Atinderpaul Docs</h2>
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search className="h-6 w-6" />
        </span>
        <input type="text" placeholder="Search" onChange={handleSearch}
          className="w-full rounded-full border pl-11 pr-5 py-2 text-black" />
      </div>
      {/* Expand/Collapse All */}
      <div className='flex flex-row justify-end w-full mt-4 mb-6'>
        <button onClick={toggleAllSections}
          className="text-sm bg-gray-700 text-white px-1.5 py-1.5 hover:bg-gray-600 rounded-lg border-white border">
          {allCollapsed ? <OpenInFull fontSize='small' /> : <CloseFullscreen fontSize='small' />}
        </button>
      </div>

      <nav className="space-y-6">
        {Object.entries(wikiContent).map(([key, section]) => {
          const filteredPages = section.pages.filter((page) =>
            `${section.title} ${page.title}`.toLowerCase().includes(searchQuery)
          );
          if (filteredPages.length === 0) return null;

          return (
            <div key={key}>
              <button onClick={() => toggleSection(key)}
                className="flex flex-row items-center text-sm justify-between font-semibold uppercase tracking-wide mb-2 text-white w-full text-left">
                <span>
                  {(() => {
                    const sectionMatchIndex = section.title.toLowerCase().indexOf(searchQuery);
                    if (searchQuery && sectionMatchIndex !== -1) {
                      const before = section.title.slice(0, sectionMatchIndex);
                      const match = section.title.slice(sectionMatchIndex, sectionMatchIndex + searchQuery.length);
                      const after = section.title.slice(sectionMatchIndex + searchQuery.length);
                      return (
                        <>
                          {before}
                          <mark className="bg-yellow-300 text-black">{match}</mark>
                          {after}
                        </>
                      );
                    }
                    return section.title;
                  })()}
                </span>
                <span>
                  {collapsedSections[key] ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                </span>
              </button>
              {!collapsedSections[key] && (
                <ul className="space-y-1">
                  {filteredPages.map((page) => {
                    const matchIndex = page.title.toLowerCase().indexOf(searchQuery);
                    let displayTitle = page.title;
                    if (searchQuery && matchIndex !== -1) {
                      const before = page.title.slice(0, matchIndex);
                      const match = page.title.slice(matchIndex, matchIndex + searchQuery.length);
                      const after = page.title.slice(matchIndex + searchQuery.length);
                      displayTitle = (
                        <>
                          {before}
                          <mark className="bg-yellow-300 text-black">{match}</mark>
                          {after}
                        </>
                      );
                    }
                    return (
                      <li key={page.slug}>
                        <Link
                          href={`/docs/${page.slug}`}
                          className={`block px-3 py-2 rounded-lg ${pathname?.endsWith(page.slug)
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                          {displayTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}