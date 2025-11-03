# StudyPad

A React + Vite + Tailwind CSS learning workspace for exploring coding concepts with interactive examples and markdown explanations.

## Getting Started

```bash
npm install
npm run dev
```

Open your browser at http://localhost:5173 and use the sidebar to pick a topic.

## Available Topics

- CSS → Selectors (interactive demo)
- JavaScript → Working with Promises (interactive demo)
- Additional topics are scaffolded and ready for future lessons.

## Project Structure

```
src/
├── components/         # Reusable UI building blocks
├── data/               # Sidebar navigation configuration
├── topics/             # Individual lessons grouped by language
├── App.tsx             # App layout and routing
├── main.tsx            # Entry point
└── index.css           # Tailwind setup and global styles
```

Add new lessons by creating a folder under `src/topics/<language>/<topic>/` with an `Example.tsx`, `content.md`, and `Page.tsx` that uses the shared components.

### Prompt Template

Need to brief an AI assistant to add another topic? Copy the reusable instructions in
[`docs/topic-generation-prompt.md`](docs/topic-generation-prompt.md).
