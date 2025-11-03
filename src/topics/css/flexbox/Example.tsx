import { useMemo, useState, type CSSProperties } from 'react';
import LogConsole from '../../../components/LogConsole';

type ControlOption<T> = {
  id: string;
  label: string;
  value: T;
  log: string;
  hint: string;
};

type ItemStrategy = {
  id: string;
  label: string;
  log: string;
  hint: string;
  apply: (index: number) => CSSProperties;
};

const directionOptions: ControlOption<CSSProperties['flexDirection']>[] = [
  {
    id: 'row',
    label: '가로(row)',
    value: 'row',
    log: '메인축(main axis)을 가로(row)로 바꿨습니다. 아이템(item)은 왼쪽에서 오른쪽으로 배치됩니다.',
    hint: '가로 레이아웃(layout)일 때 메인축(main axis)은 왼쪽→오른쪽입니다.'
  },
  {
    id: 'column',
    label: '세로(column)',
    value: 'column',
    log: '메인축(main axis)을 세로(column)로 바꿨습니다. 아이템(item)은 위에서 아래로 흐릅니다.',
    hint: '세로 레이아웃(layout)에서는 교차축(cross axis)이 가로 방향이 됩니다.'
  }
];

const justifyOptions: ControlOption<CSSProperties['justifyContent']>[] = [
  {
    id: 'start',
    label: '앞쪽(flex-start)',
    value: 'flex-start',
    log: '콘텐츠(content)를 메인축(main axis)의 시작점에 정렬했습니다.',
    hint: '기본 흐름을 유지하고 싶을 때 사용합니다.'
  },
  {
    id: 'center',
    label: '가운데(center)',
    value: 'center',
    log: '콘텐츠(content)를 메인축(main axis)의 가운데로 모았습니다.',
    hint: '주요 콜투액션(call to action)을 강조할 때 유용합니다.'
  },
  {
    id: 'space-between',
    label: '균등(space-between)',
    value: 'space-between',
    log: '아이템(item) 사이의 여백을 균등하게 분배했습니다.',
    hint: '네비게이션(nav)이나 카드 리스트에서 공간을 고르게 나눌 때 사용합니다.'
  }
];

const alignOptions: ControlOption<CSSProperties['alignItems']>[] = [
  {
    id: 'stretch',
    label: '늘이기(stretch)',
    value: 'stretch',
    log: '교차축(cross axis) 방향으로 아이템(item)을 자동으로 채우도록 했습니다.',
    hint: '카드 높이를 맞추거나 균일한 그리드(grid)를 만들 때 적합합니다.'
  },
  {
    id: 'center',
    label: '중앙(center)',
    value: 'center',
    log: '교차축(cross axis)의 중앙에 아이템(item)을 배치했습니다.',
    hint: '버튼 그룹이나 태그 모음처럼 높이가 다른 요소를 정렬할 때 사용합니다.'
  },
  {
    id: 'flex-start',
    label: '시작(flex-start)',
    value: 'flex-start',
    log: '교차축(cross axis)의 시작점에 아이템(item)을 정렬했습니다.',
    hint: '텍스트 라벨(label)이 위쪽에 붙어야 할 때 유용합니다.'
  }
];

const wrapOptions: ControlOption<CSSProperties['flexWrap']>[] = [
  {
    id: 'nowrap',
    label: '단일 줄(nowrap)',
    value: 'nowrap',
    log: '줄바꿈(wrap)을 비활성화해서 모든 아이템(item)을 한 줄에 유지합니다.',
    hint: '항상 한 줄에 보여야 하는 탭(tab) 등에 사용합니다.'
  },
  {
    id: 'wrap',
    label: '줄바꿈 허용(wrap)',
    value: 'wrap',
    log: '필요할 경우 다음 줄로 감싸도록 설정했습니다.',
    hint: '배지가 많은 태그 클라우드(tag cloud)에서 줄바꿈이 자연스럽습니다.'
  }
];

const gapOptions: ControlOption<string>[] = [
  {
    id: 'tight',
    label: '조밀(0.5rem)',
    value: '0.5rem',
    log: '아이템(item) 간격을 0.5rem으로 조정했습니다.',
    hint: '컴팩트(compact)한 카드 리스트에 적당합니다.'
  },
  {
    id: 'comfortable',
    label: '여유(1rem)',
    value: '1rem',
    log: '아이템(item) 간격을 1rem으로 맞춰 가독성을 높였습니다.',
    hint: '일반적인 콘텐츠 카드에 자주 쓰입니다.'
  },
  {
    id: 'spacious',
    label: '넓게(1.5rem)',
    value: '1.5rem',
    log: '아이템(item) 간격을 1.5rem으로 넓혀 강조했습니다.',
    hint: '강조가 필요한 섹션(section)에 사용합니다.'
  }
];

const itemStrategies: ItemStrategy[] = [
  {
    id: 'balanced',
    label: '균형 유지(default)',
    log: '각 아이템(item)의 기본 flex 값(0 1 auto)을 유지했습니다.',
    hint: '모든 카드가 자연스럽게 수축(shrink)하고 늘어납니다.',
    apply: () => ({})
  },
  {
    id: 'grow-second',
    label: '2번 성장(flex-grow:1)',
    log: '두 번째 카드에 flex-grow: 1과 flex-basis: 0을 적용했습니다.',
    hint: '주요 카드에 시각적 비중을 더 줄 때 사용합니다.',
    apply: (index) => (index === 1 ? { flexGrow: 1, flexBasis: '0%' } : {})
  },
  {
    id: 'pin-last',
    label: '3번 고정(flex-shrink:0)',
    log: '세 번째 카드의 flex-shrink를 0으로 설정하고 최소 폭을 보장했습니다.',
    hint: '버튼 영역처럼 축소되면 안 되는 요소를 보호합니다.',
    apply: (index) => (index === 2 ? { flexShrink: 0, flexBasis: '160px' } : {})
  }
];

const baseItems = [
  {
    id: 'alpha',
    title: 'Hero',
    description: '영웅 섹션(hero section)',
    accent: 'from-sky-500/30 to-sky-400/10 border-sky-500/40 text-sky-100'
  },
  {
    id: 'beta',
    title: 'Highlights',
    description: '핵심 기능(highlights)',
    accent: 'from-indigo-500/30 to-indigo-400/10 border-indigo-500/40 text-indigo-100'
  },
  {
    id: 'gamma',
    title: 'Actions',
    description: '주요 버튼(action)',
    accent: 'from-emerald-500/30 to-emerald-400/10 border-emerald-500/40 text-emerald-100'
  }
];

const FlexboxCoreExample = () => {
  const [logs, setLogs] = useState<string[]>([
    '🚀 플렉스 박스(flexbox)의 핵심 속성을 조절해 메인축(main axis)과 공간 배분을 체감해 보세요.'
  ]);
  const [direction, setDirection] = useState<CSSProperties['flexDirection']>('row');
  const [justify, setJustify] = useState<CSSProperties['justifyContent']>('space-between');
  const [align, setAlign] = useState<CSSProperties['alignItems']>('stretch');
  const [wrap, setWrap] = useState<CSSProperties['flexWrap']>('nowrap');
  const [gap, setGap] = useState<string>('1rem');
  const [strategy, setStrategy] = useState<ItemStrategy>(itemStrategies[0]);

  const pushLog = (entry: string | string[]) => {
    const nextEntries = Array.isArray(entry) ? entry : [entry];
    setLogs((prev) => [...prev, ...nextEntries]);
  };

  const containerStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap,
      gap,
      transition: 'all 0.2s ease'
    }),
    [direction, justify, align, wrap, gap]
  );

  const axisLabel = useMemo(
    () => ({
      main: direction === 'row' ? '가로(horizontal)' : '세로(vertical)',
      cross: direction === 'row' ? '세로(vertical)' : '가로(horizontal)'
    }),
    [direction]
  );

  const handleDirectionChange = (option: ControlOption<CSSProperties['flexDirection']>) => {
    setDirection(option.value);
    pushLog([`📐 ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  const handleJustifyChange = (option: ControlOption<CSSProperties['justifyContent']>) => {
    setJustify(option.value);
    pushLog([`🧭 ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  const handleAlignChange = (option: ControlOption<CSSProperties['alignItems']>) => {
    setAlign(option.value);
    pushLog([`🎯 ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  const handleWrapChange = (option: ControlOption<CSSProperties['flexWrap']>) => {
    setWrap(option.value);
    pushLog([`🔁 ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  const handleGapChange = (option: ControlOption<string>) => {
    setGap(option.value);
    pushLog([`📏 ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  const handleStrategyChange = (option: ItemStrategy) => {
    setStrategy(option);
    pushLog([`⚙️ ${option.log}`, `💡 힌트: ${option.hint}`]);
  };

  return (
    <div className="flex h-full flex-col space-y-5">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">Flexbox 핵심 속성 조절</h2>
        <p className="text-sm text-slate-400">
          메인축(main axis), 공간 분배(distribution), 성장(growth) 전략을 바꿔보며 반응형(responsive) 레이아웃(layout)의 핵심을 익혀보세요.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <ControlGroup
            title="메인축(main axis) 방향"
            options={directionOptions}
            activeId={direction}
            onSelect={handleDirectionChange}
          />
          <ControlGroup
            title="메인축(main axis) 정렬"
            options={justifyOptions}
            activeId={justify}
            onSelect={handleJustifyChange}
          />
          <ControlGroup
            title="교차축(cross axis) 정렬"
            options={alignOptions}
            activeId={align}
            onSelect={handleAlignChange}
          />
          <ControlGroup
            title="줄바꿈(wrap) & 간격(gap)"
            options={wrapOptions}
            secondaryOptions={gapOptions}
            activeId={wrap}
            secondaryActiveId={gap}
            onSelect={handleWrapChange}
            onSecondarySelect={handleGapChange}
          />
          <StrategyGroup
            title="아이템(item) 전략"
            strategies={itemStrategies}
            activeId={strategy.id}
            onSelect={handleStrategyChange}
          />
        </div>
      </section>

      <section className="space-y-3">
        <header className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
          <span>레이아웃 미리보기(preview)</span>
          <span>
            메인축(main axis): {axisLabel.main} · 교차축(cross axis): {axisLabel.cross}
          </span>
        </header>
        <div
          className="relative min-h-[16rem] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          style={containerStyle}
        >
          {baseItems.map((item, index) => {
            const overrides = strategy.apply(index);
            const computedStyle: CSSProperties = {
              flexGrow: 0,
              flexShrink: 1,
              flexBasis: 'auto',
              ...overrides
            };
            const flexValue = [
              computedStyle.flexGrow,
              computedStyle.flexShrink,
              computedStyle.flexBasis
            ].join(' ');

            return (
              <article
                key={item.id}
                className={`flex min-w-[140px] flex-col justify-between rounded-lg border bg-gradient-to-br p-4 text-sm shadow-inner transition ${item.accent}`}
                style={computedStyle}
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.description}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <div className="mt-4 rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300">
                  flex: {flexValue}
                </div>
              </article>
            );
          })}
        </div>
        <p className="text-xs text-slate-500">
          화면을 줄이거나 늘려보면 flex-wrap과 flex-grow 설정이 어떻게 균형(balancing)에 기여하는지 확인할 수 있습니다.
        </p>
      </section>

      <LogConsole logs={logs} />
    </div>
  );
};

type ControlGroupProps<T> = {
  title: string;
  options: ControlOption<T>[];
  activeId: T;
  secondaryOptions?: ControlOption<string>[];
  secondaryActiveId?: string;
  onSelect: (option: ControlOption<T>) => void;
  onSecondarySelect?: (option: ControlOption<string>) => void;
};

const ControlGroup = <T,>({
  title,
  options,
  activeId,
  secondaryOptions,
  secondaryActiveId,
  onSelect,
  onSecondarySelect
}: ControlGroupProps<T>) => {
  return (
    <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/40 p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option)}
            className={[
              'rounded-md border px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500',
              option.value === activeId
                ? 'border-sky-500 bg-sky-500/20 text-sky-100'
                : 'border-slate-700 bg-slate-950/60 text-slate-200 hover:border-slate-500'
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>
      {secondaryOptions && onSecondarySelect && (
        <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-2">
          {secondaryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSecondarySelect(option)}
              className={[
                'rounded-md border px-3 py-1 text-[11px] font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-500',
                option.value === secondaryActiveId
                  ? 'border-amber-500 bg-amber-500/20 text-amber-100'
                  : 'border-slate-700 bg-slate-950/60 text-slate-200 hover:border-slate-500'
              ].join(' ')}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

type StrategyGroupProps = {
  title: string;
  strategies: ItemStrategy[];
  activeId: string;
  onSelect: (strategy: ItemStrategy) => void;
};

const StrategyGroup = ({ title, strategies, activeId, onSelect }: StrategyGroupProps) => (
  <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/40 p-3 md:col-span-2">
    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">{title}</h3>
    <div className="flex flex-col gap-2">
      {strategies.map((strategy) => (
        <button
          key={strategy.id}
          type="button"
          onClick={() => onSelect(strategy)}
          className={[
            'flex w-full items-start justify-between gap-3 rounded-md border px-3 py-2 text-left text-xs transition focus:outline-none focus:ring-2 focus:ring-emerald-500',
            strategy.id === activeId
              ? 'border-emerald-500 bg-emerald-500/15 text-emerald-100'
              : 'border-slate-700 bg-slate-950/60 text-slate-200 hover:border-slate-500'
          ].join(' ')}
        >
          <span className="font-medium">{strategy.label}</span>
          <span className="text-[11px] text-slate-400">{strategy.hint}</span>
        </button>
      ))}
    </div>
  </div>
);

export default FlexboxCoreExample;
