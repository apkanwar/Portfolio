import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function TOC() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const observer = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('main h1'));
    const extractedHeadings = headingElements.map((el) => ({
      id: el.id || el.textContent.toLowerCase().replace(/\s+/g, '-'),
      text: el.textContent,
      level: el.tagName,
    }));

    // Assign IDs if not already present
    headingElements.forEach((el, i) => {
      if (!el.id) el.id = extractedHeadings[i].id;
    });

    setHeadings(extractedHeadings);

    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 1.0 }
    );

    headingElements.forEach((el) => observer.current.observe(el));
  }, [router.asPath]);

  return (
    <aside
      className="font-headings w-52 pr-8 hidden xl:block sticky top-24 self-start text-sm text-white max-h-full overflow-y-auto"
    >
      <div className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
        On this page
      </div>
      <nav className="flex flex-col space-y-1">
        {headings.map((heading, i) => (
          <a
            key={i}
            href={`#${heading.id}`}
            className={`transition-colors ${heading.id === activeId
              ? 'text-white font-semibold border-l-2 border-blue-400 pl-2'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}