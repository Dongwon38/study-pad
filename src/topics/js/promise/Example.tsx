import { useState } from 'react';
import LogConsole from '../../../components/LogConsole';

const PromiseExample = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const pushLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setLogs([]);

    pushLog('▶️ Starting promise...');

    const promise = new Promise<string>((resolve) => {
      pushLog('⏳ Promise started. Waiting 1 second...');
      setTimeout(() => {
        pushLog('✅ Resolving promise.');
        resolve('Promise resolved value');
      }, 1000);
    });

    try {
      const result = await promise.then((value) => {
        pushLog(`📦 Received: ${value}`);
        return value.toUpperCase();
      });

      pushLog(`🎉 Final result: ${result}`);
    } catch (error) {
      pushLog(`❌ Error: ${(error as Error).message}`);
    } finally {
      pushLog('🏁 Done!');
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-100">Interactive Example</h2>
        <p className="text-sm text-slate-400">
          Click the button to run a promise that resolves after one second. Watch the logs to follow each step.
        </p>
        <button
          type="button"
          onClick={handleRun}
          disabled={isRunning}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-800"
        >
          {isRunning ? 'Running...' : 'Run Promise Example'}
        </button>
      </div>
      <LogConsole logs={logs} />
    </div>
  );
};

export default PromiseExample;
