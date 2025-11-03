import { ReactNode } from 'react';

type SplitViewProps = {
  left: ReactNode;
  right: ReactNode;
};

const SplitView = ({ left, right }: SplitViewProps) => {
  return (
    <div className="grid h-full grid-cols-1 gap-6 overflow-hidden p-6 lg:grid-cols-2">
      <section className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
        {left}
      </section>
      <section className="h-full overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        {right}
      </section>
    </div>
  );
};

export default SplitView;
