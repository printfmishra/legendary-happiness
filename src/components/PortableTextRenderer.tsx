import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

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
      <ul className="list-disc list-inside mb-10 space-y-3 theme-text-secondary ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-10 space-y-3 theme-text-secondary ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 theme-text-secondary">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 theme-text-secondary">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold theme-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-primary-copper/10 text-primary-copper px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
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
            src={urlFor(value).width(800).height(500).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={500}
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
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6">
        <code className="text-sm font-mono">{value.code}</code>
      </pre>
    ),
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
