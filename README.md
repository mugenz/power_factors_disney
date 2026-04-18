# power_factors_disney

A **Disney characters dashboard** on top of the public Disney API: search and filter by TV show, paginate a results table, open a character detail modal, see a films distribution chart, and export rows to Excel. Built as an **assignment for Power Factors**.

Developed with **[Cursor](https://cursor.com)** in roughly **8 hours** of focused work.

## Stack

- **Runtime / UI:** React 19, TypeScript
- **Build / dev:** Vite 8, `@vitejs/plugin-react`
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`)
- **Data & charts:** TanStack React Query, Highcharts (`highcharts-react-official`)
- **Exports:** `xlsx`
- **Quality:** ESLint 9, Vitest + Testing Library + jsdom
- **Node:** Version 22 latest used for dev and build enviroments

## Scripts

| Command              | What it does                               |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start dev server (Vite)                    |
| `npm run build`      | Typecheck (`tsc -b`) then production build |
| `npm run preview`    | Serve the production build locally         |
| `npm run lint`       | Run ESLint                                 |
| `npm test`           | Run tests once                             |
| `npm run test:watch` | Run tests in watch mode                    |

**Prerequisites:** Node.js **22** and npm. Install dependencies with `npm install`.
