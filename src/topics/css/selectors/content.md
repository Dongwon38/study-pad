# CSS Selectors: Targeting the Right Elements

## Overview
CSS selectors describe the pattern used to pick which elements should receive styling rules. By combining element types, classes, IDs, and pseudo-classes, you can precisely target elements across a page without touching the HTML structure.

## Example Explained
In the interactive example you can switch between three selectors:

- **`.highlight`** selects every element that has the `highlight` class.
- **`#special-task`** selects the one element that owns the `id="special-task"` attribute.
- **`li:first-child`** selects the very first `<li>` within its parent list.

Whenever you click a selector button, the matching snippet lines glow and a log entry describes which elements were caught. This mirrors the browser's matching process before any styles are applied.

## Try It Yourself
1. Click each selector button and watch which sample elements light up.
2. Add a new selector to the example by duplicating one of the options in `Example.tsx` and adjusting the `matches` logic.
3. Experiment locally by adding Tailwind utility classes that would only affect the highlighted elements. This reinforces how selectors control where your styles land.
