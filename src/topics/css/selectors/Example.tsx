import { useMemo, useState } from 'react';
import LogConsole from '../../../components/LogConsole';

type SampleElement = {
  id: string;
  label: string;
  tag: 'li' | 'p';
  classes?: string[];
  idAttr?: string;
  order?: number;
};

type SelectorOption = {
  id: string;
  label: string;
  description: string;
  matches: (element: SampleElement) => boolean;
};

const sampleElements: SampleElement[] = [
  {
    id: 'task-1',
    label: '<li class="highlight">Highlighted task</li>',
    tag: 'li',
    classes: ['highlight'],
    order: 1
  },
  {
    id: 'task-2',
    label: '<li id="special-task">Special task</li>',
    tag: 'li',
    idAttr: 'special-task',
    order: 2
  },
  {
    id: 'task-3',
    label: '<li class="note">Note task</li>',
    tag: 'li',
    classes: ['note'],
    order: 3
  },
  {
    id: 'note-1',
    label: '<p class="note">Helpful paragraph note</p>',
    tag: 'p',
    classes: ['note']
  }
];

const selectorOptions: SelectorOption[] = [
  {
    id: 'class',
    label: '.highlight',
    description: '선택한 클래스 이름을 가진 모든 요소를 찾습니다.',
    matches: (element) => element.classes?.includes('highlight') ?? false
  },
  {
    id: 'id',
    label: '#special-task',
    description: '특정 id 값을 가진 단 하나의 요소를 선택합니다.',
    matches: (element) => element.idAttr === 'special-task'
  },
  {
    id: 'pseudo',
    label: 'li:first-child',
    description: '리스트에서 첫 번째 <li> 요소와 일치합니다.',
    matches: (element) => element.tag === 'li' && element.order === 1
  }
];

const CssSelectorsExample = () => {
  const [activeSelector, setActiveSelector] = useState<string>('class');
  const [logs, setLogs] = useState<string[]>([
    '👋 Select a CSS selector to see which elements it targets.'
  ]);

  const pushLog = (messages: string | string[]) => {
    const nextLogs = Array.isArray(messages) ? messages : [messages];
    setLogs((prev) => [...prev, ...nextLogs]);
  };

  const activeOption = useMemo(
    () => selectorOptions.find((option) => option.id === activeSelector) ?? selectorOptions[0],
    [activeSelector]
  );

  const matchedElements = useMemo(
    () => sampleElements.filter((element) => activeOption.matches(element)),
    [activeOption]
  );

  const handleSelect = (option: SelectorOption) => {
    setActiveSelector(option.id);
    const matches = sampleElements.filter((element) => option.matches(element));
    const matchLabels = matches.map((match) => match.label.replace(/<|>/g, ''));

    pushLog([
      `🎯 Using selector "${option.label}"`,
      matches.length > 0
        ? `✅ Matched ${matches.length} element(s): ${matchLabels.join(', ')}`
        : '⚠️ No elements matched this selector.'
    ]);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">Try CSS selectors</h2>
        <p className="text-sm text-slate-400">
          Choose a selector to highlight which elements in the sample markup would be selected.
        </p>
        <div className="flex flex-wrap gap-2">
          {selectorOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={[
                'rounded-md border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500',
                activeSelector === option.id
                  ? 'border-sky-500 bg-sky-600/20 text-sky-200'
                  : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-500'
              ].join(' ')}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400">{activeOption.description}</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sample markup</p>
        <div className="mt-3 space-y-2">
          {sampleElements.map((element) => {
            const isMatched = matchedElements.some((match) => match.id === element.id);
            return (
              <div
                key={element.id}
                className={`rounded-lg border px-3 py-2 text-sm font-mono transition ${
                  isMatched
                    ? 'border-sky-500/70 bg-sky-500/10 text-sky-100 shadow-sm'
                    : 'border-slate-800 bg-slate-900/80 text-slate-300'
                }`}
              >
                {element.label}
              </div>
            );
          })}
        </div>
      </div>

      <LogConsole logs={logs} />
    </div>
  );
};

export default CssSelectorsExample;
