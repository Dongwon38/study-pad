import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App, { EmptyState, TopicRenderer } from './App';
import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />, 
      children: [
        {
          index: true,
          element: <EmptyState message="Select a topic from the sidebar to begin." />
        },
        {
          path: ':language/:topic',
          element: <TopicRenderer />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  </React.StrictMode>
);
