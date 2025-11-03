import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
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
              const language = match[1] as Language;
              const code = String(children).replace(/\n$/, '');
              return (
                <Highlight
                  {...defaultProps}
                  {...props}
                  theme={theme}
                  code={code}
                  language={language}
                >
                  {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${highlightClassName} rounded-lg`} style={style}>
                      {tokens.map((line, lineIndex) => {
                        const lineProps = getLineProps({ line, key: lineIndex });
                        const { key: lineKey, ...restLineProps } = lineProps as typeof lineProps & {
                          key?: string | number;
                        };
                        return (
                          <div key={lineKey ?? lineIndex} {...restLineProps}>
                            {line.map((token, tokenIndex) => {
                              const tokenProps = getTokenProps({ token, key: tokenIndex });
                              const { key: tokenKey, ...restTokenProps } = tokenProps as typeof tokenProps & {
                                key?: string | number;
                              };
                              return <span key={tokenKey ?? tokenIndex} {...restTokenProps} />;
                            })}
                          </div>
                        );
                      })}
                    </pre>
                  )}
                </Highlight>
              );
            }
            const inlineClassName = [className, 'rounded bg-slate-800 px-1 py-0.5 text-sm']
              .filter(Boolean)
              .join(' ');
            return (
              <code {...props} className={inlineClassName}>
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
