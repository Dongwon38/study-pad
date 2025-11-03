import { lazy, Suspense, type ComponentType } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const topicPages = {
  html: {
    tags: lazy(() => import('./topics/html/tags/Page'))
  },
  js: {
    promise: lazy(() => import('./topics/js/promise/Page'))
  }
} as const;

type TopicPages = typeof topicPages;

const TopicRenderer = () => {
  const { language, topic } = useParams();

  if (!language || !topic) {
    return <EmptyState message="Select a topic from the sidebar to get started." />;
  }

  const languageGroup = (topicPages as TopicPages)[language as keyof TopicPages];
  const Component = languageGroup ? (languageGroup as Record<string, ComponentType>)[topic] : undefined;

  if (!Component) {
    return <EmptyState message="This topic is not available yet. Pick another from the sidebar." />;
  }

  return (
    <Suspense fallback={<EmptyState message="Loading lesson..." />}>
      <Component />
    </Suspense>
  );
};

type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-slate-400">
    <p>{message}</p>
  </div>
);

const App = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<EmptyState message="Select a topic from the sidebar to begin." />} />
            <Route path="/:language/:topic" element={<TopicRenderer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
