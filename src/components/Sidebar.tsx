import { NavLink } from 'react-router-dom';
import sidebarConfig from '../data/sidebarConfig.json';

type Topic = {
  id: string;
  label: string;
  description?: string;
  available?: boolean;
};

type Category = {
  id: string;
  label: string;
  topics: Topic[];
};

const Sidebar = () => {
  return (
    <aside className="h-full w-72 overflow-y-auto border-r border-slate-800 bg-slate-950/60 px-4 py-6">
      <nav className="space-y-6">
        {sidebarConfig.categories.map((category: Category) => (
          <div key={category.id}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{category.label}</h2>
            <ul className="mt-3 space-y-2">
              {category.topics.map((topic) => {
                const isDisabled = topic.available === false;
                const baseClasses =
                  'block rounded-md px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-sky-500';

                if (isDisabled) {
                  return (
                    <li key={topic.id}>
                      <span className={`${baseClasses} cursor-not-allowed border border-slate-800/70 bg-slate-900/50 text-slate-600`}>
                        <div className="font-medium">{topic.label}</div>
                        {topic.description && <p className="text-xs text-slate-500">Coming soon</p>}
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={topic.id}>
                    <NavLink
                      to={`/${category.id}/${topic.id}`}
                      className={({ isActive }) =>
                        [
                          baseClasses,
                          'border border-transparent bg-slate-900/40 text-slate-200 hover:border-slate-700 hover:bg-slate-900',
                          isActive ? 'border-sky-500/80 bg-slate-900 text-white shadow-sm' : ''
                        ]
                          .filter(Boolean)
                          .join(' ')
                      }
                    >
                      <div className="font-medium">{topic.label}</div>
                      {topic.description && <p className="text-xs text-slate-400">{topic.description}</p>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
