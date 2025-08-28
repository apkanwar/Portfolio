import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

export default function ContentRenderer({ content }) {
  return (
    <div className='w-full'>
      {(!content || content.length === 0) ? (
        <p className="text-gray-400">No content available for this page yet.</p>
      ) : (
        content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <h1 key={index} className='font-headings text-2xl mt-8 mb-2'>{block.text}</h1>;
            case 'paragraph':
              return <p key={index} className='font-dText mb-4'>{block.text}</p>;
            case 'code':
              const highlighted = Prism.highlight(block.code, Prism.languages[block.language] || Prism.languages.javascript, block.language);
              const lines = block.code.split('\n');
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => navigator.clipboard.writeText(block.code)}
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                  <pre className="p-4 rounded-lg overflow-x-auto bg-gray-800 flex text-sm">
                    <div className="text-gray-500 pr-4 text-right select-none">
                      {lines.map((_, i) => (
                        <div key={i} className="leading-[21px]">{i + 1}</div>
                      ))}
                    </div>
                    <code
                      className={`language-${block.language}`}
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                  </pre>
                </div>
              );
            case 'callout':
              return (
                <div
                  key={index}
                  className={`border-l-4 pl-4 py-2 my-4 rounded-md font-dText ${block.variant === 'info'
                    ? 'border-blue-500 bg-blue-100 text-blue-900'
                    : block.variant === 'warning'
                      ? 'border-yellow-800 bg-yellow-100 text-yellow-900'
                      : 'border-gray-500 bg-gray-100 text-gray-900'
                    }`}
                >
                  {block.text}
                </div>
              );
            case 'link':
              return (
                <p key={index}>
                  <a href={block.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {block.text}
                  </a>
                </p>
              );
            default:
              return null;
          }
        })
      )}
    </div>
  );
}