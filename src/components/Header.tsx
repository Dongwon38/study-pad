import { useEffect, useState } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">
      <h1 className="text-xl font-semibold text-slate-100">StudyPad</h1>
      <button
        type="button"
        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-4 py-1 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;
