import styles from '@/styles/markdown.module.css';
import 'prismjs/themes/prism-tomorrow.css';

export default function ContentRenderer({ content }) {
  return (
    <div className={styles.prose}>
      {(!content || content.length === 0) ? (
        <p className="text-gray-400">No content available for this page yet.</p>
      ) : (
        content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <h1 key={index}>{block.text}</h1>;
            case 'paragraph':
              return <p key={index}>{block.text}</p>;
            case 'code':
              const lines = block.code.split('\n');
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => navigator.clipboard.writeText(block.code)}
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                  <pre className="pl-10">
                    <code className={`language-${block.language}`}>
                      {lines.map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-gray-500 w-8 text-right pr-2 select-none">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              );
            case 'callout':
              return (
                <div
                  key={index}
                  className={`border-l-4 pl-4 py-2 my-4 rounded-md ${
                    block.variant === 'info'
                      ? 'border-blue-500 bg-blue-100 text-blue-900'
                      : block.variant === 'warning'
                      ? 'border-yellow-500 bg-yellow-100 text-yellow-900'
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