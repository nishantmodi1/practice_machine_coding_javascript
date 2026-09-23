# No Code Pro | JavaScript Machine Coding Practice

A hands-on React project for practicing JavaScript and frontend machine-coding problems while exploring how no-code dashboards and page builders work. Each exercise lives in its own component so I can build and iterate on one idea at a time.

## What I’m practicing

### Machine coding exercises

- **Search and typeahead** — build a user search with a reusable custom hook, asynchronous requests, loading and error states, and request cancellation.
- **Counters and state management** — implement basic and advanced counters with `useReducer`, then compare the approach with Redux Toolkit.
- **Todo apps** — manage task interactions with component state and reducers.
- **Nested comments** — model and render hierarchical comment data.
- **Infinite scrolling** — load additional content as the user scrolls.
- **JSON table rendering** — turn static JSON records into a table UI.
- **File explorer pattern** — represent and display a nested file structure.
- **Forms and browser APIs** — practice validation, local storage, custom hooks, and effect cleanup.

### No-code dashboard experiments

- **Dashboard canvas** (`src/DashboardBuilder.jsx`) — a component palette and canvas for arranging sample tables and stat cards.
- **Loan application dashboard** (`src/NoCodeDashboard.jsx`) — a dashboard concept with application search and filtering, a borrower form, image upload preview, draggable widgets, and a credit-score-based recommendation panel.
- **Visual page builder** (`src/EditorPage.jsx`) — an experiment integrating GrapesJS for editing page layouts.

These are learning prototypes with sample data; the project does not currently connect to a backend or deploy generated dashboards.

## Tech stack

- JavaScript, React 19, and Vite
- React hooks and custom hooks
- `useReducer` and Redux Toolkit
- Tailwind CSS utilities and plain CSS
- GrapesJS for the visual editor experiment
- Lucide icons

## Run locally

```bash
cd No_Code_Pro
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production build or run linting:

```bash
npm run build
npm run lint
```

## Choose an exercise to run

The examples are currently commented out in `src/App.jsx`, so the app starts with an empty screen. To try one, import its component if needed and render it in `App` (for example, `<DashboardBuilder />` or `<TypeheadContainer />`). Keep one exercise active at a time while practicing.

## Project layout

```text
src/
├── components/       # Reusable UI patterns and forms
├── custom_hooks/     # Reusable React hooks
├── pages/            # Individual machine-coding exercises
├── todos/            # Todo practice implementations
├── App.jsx           # Select which exercise to render
├── DashboardBuilder.jsx
├── EditorPage.jsx
└── NoCodeDashboard.jsx
```

## Learning goal

Practice breaking a prompt into data, state, events, and UI; implement the behavior in React; and explore how a visual dashboard builder can let users compose a useful interface from reusable pieces.
