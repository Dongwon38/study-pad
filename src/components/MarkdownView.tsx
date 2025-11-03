import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

type MarkdownViewProps = {
  content: string;
};

const MarkdownView = ({ content }: MarkdownViewProps) => {
  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  {...props}
                  style={theme as unknown as Record<string, never>}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return (
              <code {...props} className="rounded bg-slate-800 px-1 py-0.5 text-sm">
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownView;
