import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { ContentCopy, CropFree } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContentRenderer({ content }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  useEffect(() => {
    if (copiedIndex !== null) {
      const timeout = setTimeout(() => setCopiedIndex(null), 1500);
      return () => clearTimeout(timeout);
    }
  }, [copiedIndex]);

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
                <div key={index} className="relative group my-6">
                  <button onClick={() => {
                    navigator.clipboard.writeText(block.code);
                    setCopiedIndex(index);
                  }}
                    className="absolute top-2 right-2 z-10 text-xs bg-gray-700 hover:bg-gray-600 border border-white text-white px-1.5 py-1.5 rounded-lg">
                    <ContentCopy fontSize='small' />
                  </button>
                  {copiedIndex === index && (
                    <div className="absolute top-2 right-14 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                      ✓ Copied!
                    </div>
                  )}
                  <pre className="p-4 rounded-lg overflow-x-auto bg-gray-800 flex text-sm">
                    <div className="text-gray-500 pr-4 text-right select-none">
                      {lines.map((_, i) => (
                        <div key={i} className="leading-[21px]">{i + 1}</div>
                      ))}
                    </div>
                    <code className={`language-${block.language}`}
                      dangerouslySetInnerHTML={{ __html: highlighted }} />
                  </pre>
                </div>
              );
            case 'callout':
              return (
                <>
                  {block.variant === 'success' && <hr className='mt-12' />}
                  <div
                    key={index}
                    className={`border-l-4 pl-4 py-2 my-4 rounded-md font-dText ${block.variant === 'info'
                      ? 'border-blue-500 bg-blue-100 text-blue-900'
                      : block.variant === 'warning'
                        ? 'border-yellow-800 bg-yellow-100 text-yellow-900'
                        : block.variant === 'success'
                          ? 'border-green-500 bg-green-100 text-green-900 font-semibold'
                          : 'border-gray-500 bg-gray-100 text-gray-900'
                      }`}
                  >
                    {block.text}
                  </div>
                </>
              );
            case 'link':
              return (
                <p key={index} className='mb-1.5'>
                  <Link href={block.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    {block.text || block.href}
                  </Link>
                  {block.otherText && <span className="ml-1 text-white">– {block.otherText}</span>}
                </p>
              );
            case 'list':
              const ListTag = block.variant === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={index}
                  className={`${block.variant === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside pl-5 mb-3 mt-4 font-dText text-white`}>
                  {block.list.map((item, i) => (
                    <li key={i} className='mb-1'>{item}</li>
                  ))}
                </ListTag>
              );
            case 'image':
              return (
                <div key={index} className="my-6 relative group w-fit mx-auto">
                  <button onClick={() => setZoomedImage(index)} className="block relative focus:outline-none">
                    <Image
                      src={block.src}
                      alt={block.alt || 'Document Image'}
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CropFree className="text-white bg-black bg-opacity-50 rounded-lg p-1" fontSize="large" />
                    </div>
                  </button>
                  <p className='italic text-sm text-gray-400 mt-1'>{block.caption}</p>
                </div>
              );
            case 'table':
              if (block.variant === 'column') {
                const rowLabels = Object.keys(block.list[0]);
                return (
                  <div key={index} className="overflow-x-auto my-6">
                    <table className="w-full table-auto border-collapse border border-gray-700 text-sm text-white">
                      <tbody>
                        {rowLabels.map((label, rowIdx) => (
                          <tr key={rowIdx} className="even:bg-gray-900">
                            <td className="border border-gray-700 px-4 py-2 bg-gray-800 font-semibold whitespace-nowrap">{label}</td>
                            <td className="border border-gray-700 px-4 py-2 font-mono text-gray-100">{block.list[0][label]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              } else {
                const headers = Object.keys(block.list[0]);
                return (
                  <div key={index} className="overflow-x-auto my-6">
                    <table className="w-full table-auto border-collapse border border-gray-700 text-sm text-white">
                      <thead>
                        <tr className="bg-gray-800">
                          {headers.map((header, i) => (
                            <th key={i} className="border border-gray-700 px-4 py-2 text-left">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.list.map((row, i) => (
                          <tr key={i} className="even:bg-gray-900">
                            {headers.map((header, j) => (
                              <td key={j} className="border border-gray-700 px-4 py-2">{row[header]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            default:
              return null;
          }
        })
      )}
      {zoomedImage !== null && content[zoomedImage]?.type === 'image' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setZoomedImage(null)}
        >
          <Image
            src={content[zoomedImage].src}
            alt={content[zoomedImage].alt || 'zoomed image'}
            width={1200}
            height={800}
            className="rounded-lg max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}