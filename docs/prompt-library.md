You are helping me build an interactive coding learning web app using **React + Vite + Tailwind CSS**.

🧭 Project Summary:
- This is a web-based learning platform for studying coding topics such as HTML, CSS, JavaScript, and React.
- The screen is divided into **two panels**:
  - Left: interactive example and a **log console** showing runtime logs.
  - Right: **Markdown-based explanation** rendered with `react-markdown`.
- A **sidebar** provides navigation between categories and topics (via `react-router-dom`).

📁 Project Structure:
Each topic folder follows this format:
/src/topics/{language}/{topic}/
├── Example.tsx ← interactive example with logs
├── content.md ← markdown explanation
└── Page.tsx ← renders both via <SplitView />


🧩 Shared Components:
- `SplitView` → handles 2-column layout
- `LogConsole` → displays real-time logs from examples
- `MarkdownView` → renders markdown files
- `Sidebar` → navigation list of topics
- `Header` → app title and theme toggle

⚙️ Stack:
- React (Vite)
- TypeScript
- Tailwind CSS
- react-router-dom
- react-markdown + remark-gfm
- prism-react-renderer (for syntax highlighting)

🧠 Writing Rules for Content:
When creating learning content (`content.md` files):
- Use **Korean** as the main language.
- When technical terms appear (e.g. argument, parameter, callback, closure, etc.),  
  include their **English equivalent in parentheses** next to the Korean term.  
  Example: “인자(argument)”, “매개변수(parameter)”, “비동기(asynchronous)”.
- Keep the tone educational, beginner-friendly, and practical.
- Use Markdown headers (`#`, `##`) to organize sections clearly.
- Avoid overly long paragraphs; favor short, example-driven explanations.

🎯 Your Role:
- Fully understand this project structure and context.
- When I give a new instruction (e.g. “Add a topic about CSS Grid” or “Improve LogConsole to support clear button”),  
  generate production-ready **React + TypeScript code** that fits seamlessly into this structure.
- All code should follow the existing conventions (Vite + Tailwind + React Hooks).
- All explanations in markdown should follow the Korean + (English) format described above.

✅ Acknowledge once you understand, then wait for my next instruction.
