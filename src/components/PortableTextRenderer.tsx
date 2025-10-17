import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('json', json);

// Custom components for Portable Text rendering
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 theme-text-primary first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-5 mt-10 first:mt-0 theme-text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-6 mt-12 first:mt-0 theme-text-primary">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-4 mt-6 first:mt-0 theme-text-primary">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-10 leading-[1.8] theme-text-secondary text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-copper pl-6 py-2 my-10 italic theme-text-secondary bg-primary-copper/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside mb-10 space-y-3 theme-text-secondary ml-8 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside mb-10 space-y-3 theme-text-secondary ml-8 pl-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 theme-text-secondary leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 theme-text-secondary leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold theme-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-900 text-primary-copper px-2 py-1 rounded text-sm font-mono font-semibold shadow-md">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <u className="underline decoration-primary-copper decoration-2">{children}</u>
    ),
    'strike-through': ({ children }) => (
      <s className="line-through opacity-75">{children}</s>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-copper hover:underline font-medium"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(1200).fit('max').url()}
            alt={value.alt || 'Blog post image'}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm theme-text-secondary mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    codeBlock: ({ value }: any) => {
      console.log('CodeBlock value:', JSON.stringify(value, null, 2)); // Debug log
      
      // Handle different possible data structures
      let code = '';
      let language = 'text';
      let filename = '';
      
      if (value.code) {
        if (typeof value.code === 'string') {
          code = value.code;
        } else if (value.code.code) {
          code = value.code.code;
          language = value.code.language || value.language || 'text';
        }
      }
      
      filename = value.filename || '';
      
      if (value.language) {
        language = value.language;
      }
      
      if (!code) {
        console.warn('No code found in codeBlock');
        return null;
      }
      
      console.log('Rendering code with language:', language);
      
      return (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
          {filename && (
            <div className="bg-[#3a404d] text-[#abb2bf] px-4 py-2 text-sm font-mono border-b border-gray-700">
              {filename}
            </div>
          )}
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: filename ? '0 0 0.75rem 0.75rem' : '0.75rem',
              fontSize: '0.875rem',
              padding: '1rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    code: ({ value }: any) => (
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6">
        <code className="text-sm font-mono">{value.code}</code>
      </pre>
    ),
  },
};

interface PortableTextRendererProps {
  value: any[];
  variant?: 'default' | 'compact'; // 'default' for blog/about pages, 'compact' for homepage
}

export default function PortableTextRenderer({ value, variant = 'default' }: PortableTextRendererProps) {
  // Create spacing classes based on variant
  const spacing = {
    paragraph: variant === 'compact' ? 'mb-4' : 'mb-10',
    heading: {
      h1: variant === 'compact' ? 'mb-4' : 'mb-6',
      h2: variant === 'compact' ? 'mb-3 mt-6' : 'mb-5 mt-10',
      h3: variant === 'compact' ? 'mb-3 mt-6' : 'mb-6 mt-12',
      h4: variant === 'compact' ? 'mb-2 mt-4' : 'mb-4 mt-6',
    },
    list: variant === 'compact' ? 'mb-4 space-y-2' : 'mb-10 space-y-3',
    blockquote: variant === 'compact' ? 'my-4' : 'my-10',
  };

  // Dynamic components based on variant
  const dynamicComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className={`text-4xl font-bold ${spacing.heading.h1} theme-text-primary first:mt-0`}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className={`text-3xl font-bold ${spacing.heading.h2} first:mt-0 theme-text-primary`}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={`text-2xl font-bold ${spacing.heading.h3} first:mt-0 theme-text-primary`}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className={`text-xl font-bold ${spacing.heading.h4} first:mt-0 theme-text-primary`}>{children}</h4>
      ),
      normal: ({ children }) => (
        <p className={`${spacing.paragraph} leading-[1.8] theme-text-secondary text-lg`}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`border-l-4 border-primary-copper pl-6 py-2 ${spacing.blockquote} italic theme-text-secondary bg-primary-copper/5 rounded-r-lg`}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`list-disc list-outside ${spacing.list} theme-text-secondary ml-8 pl-2`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`list-decimal list-outside ${spacing.list} theme-text-secondary ml-8 pl-2`}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="mb-2 theme-text-secondary leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="mb-2 theme-text-secondary leading-relaxed">{children}</li>
      ),
    },
    marks: components.marks,
    types: components.types,
  };

  return <PortableText value={value} components={dynamicComponents} />;
}
