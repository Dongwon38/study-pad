import { useEffect, useRef } from 'react';

type LogConsoleProps = {
  logs: string[];
};

const LogConsole = ({ logs }: LogConsoleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex-1 overflow-hidden rounded-lg border border-slate-800 bg-black/90">
      <div ref={containerRef} className="max-h-72 overflow-y-auto p-4 text-sm font-mono text-emerald-400">
        {logs.length === 0 ? (
          <p className="text-emerald-600">Console ready. Run the example to see output.</p>
        ) : (
          logs.map((log, index) => (
            <div key={`${log}-${index}`} className="whitespace-pre-wrap">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogConsole;
