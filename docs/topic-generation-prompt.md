# StudyPad 콘텐츠 생성 프롬프트 템플릿

아래 프롬프트를 사용하면 StudyPad의 기존 구조와 스타일에 맞는 새로운 학습 주제를 생성할 수 있습니다. 괄호로 표시된 부분을 원하는 언어/주제로 바꾼 뒤 에이전트에게 전달하세요.

---

## Prompt (copy & customize)
```
🎯 GOAL:
Create a new StudyPad lesson for the **[language]** topic **[topic-id]** with the title **"[topic-title]"**.

🧱 REQUIREMENTS:
- Follow the existing StudyPad project structure.
- Generate files under `src/topics/[language]/[topic-id]/`:
  - `Example.tsx`: interactive React example using Tailwind CSS and the provided `LogConsole` component.
  - `content.md`: markdown document with the sections **Overview**, **Example Explained**, **Try It Yourself**.
  - `Page.tsx`: uses `SplitView`, renders the example on the left and markdown on the right.
- Import markdown files with the `?raw` suffix (e.g. `import doc from './content.md?raw';`) so Vite serves them correctly.
- Update `src/data/sidebarConfig.json` to mark the topic as available and include a helpful description.
- Export a lazy-loadable page so routing works via `/:language/:topic`.
- Keep code TypeScript-friendly and rely only on React hooks for state.
- Reuse shared components from `src/components/` (SplitView, MarkdownView, LogConsole).
- Ensure class names use Tailwind utilities and match the dark theme aesthetic.

🧪 VALIDATION:
- Provide a concise summary of what the new lesson demonstrates.
- List any new dependencies (if required) and explain why they are necessary.
- Include instructions for manually testing the interaction in the running Vite dev server.
```

---

## 추가 팁
- 예제 컴포넌트는 `setLogs`를 사용해 학습 단계를 안내하는 메시지를 출력하도록 해주세요.
- Tailwind 유틸리티 클래스는 기존 컴포넌트 스타일과 어울리도록 `bg-slate-*`, `text-slate-*`, `ring-*` 계열을 활용합니다.
- 필요 시 기존 레슨(`src/topics/js/promise/`)을 참고하면 전체 흐름을 빠르게 이해할 수 있습니다.
